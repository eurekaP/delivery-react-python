from collections import defaultdict #, Counter

from django.db import transaction
from django.db import IntegrityError
from django.db.models import Q

from common_helpers.dicts import dictAttr
from common_helpers.csv_utils import read_csv

from . import models


supported_vmrs = {
    2: dict(
        _title      = 'EQUIPMENT CATEGORY',
        meaning     = 'Equipment Category',
        code        = 'Code',
        _model      = models.CodeKey2, #when needed - remove
        ),
    16: dict(
        _title      = 'REPAIR PRIORITY CLASS',
        meaning     = 'Repair Priority Class',
        code        = 'Code',
        _model      = models.CodeKey16,
        ),
    34: dict(
        _title      = 'Manufacturer/Supplier/Brand Codes',
        description = 'Short Description',  #changed 2020.12.02, description/meaning were swapped
        meaning     = 'Long Description',   #changed 2020.12.02, description/meaning were swapped
        comments    = 'Comments',
        obsolete    = ('Obsolete', lambda txt: txt.lower()=='yes'),
        code        = 'VMRSCode',
        _model      = models.CodeKey34,
        ),
    }

import re
VTAB = chr(11)
def cleantext( item, itemkey):
    if isinstance( itemkey, tuple):
        itemkey, func = itemkey
    else: func = None

    t = item[ itemkey]
    v = t and t.replace( VTAB, '\n').strip() or ''
    v = v.replace( '\\\\\\', '\\\\')
    v = re.sub( r'(?<![\\])[\\](?=[^\\]|$)', r'', v) #replace single \
    if func: v = func( v)
    return v

def read_CK33( csvfile):
    #SYS ASY COMP Description CompCode9Digit Obsolete Comments
    keys = None
    for item in read_csv( csvfile,
            trigger = lambda row: 'CompCode9Digit' in row
        ):
        if not keys:
            keys = item
            continue
        yield dictAttr(
            meaning     = item['Description'],
            obsolete    = item['Obsolete'].lower()=='yes',
            comments    = cleantext( item,'Comments'),
            code        = item['CompCode9Digit'],
            assembly    = int( float( item['ASY'])),
            system      = int( float( item['SYS'])),
            component   = int( float( item['COMP'])),
            )

beautify_vmrs = {}
try:
    f = open('vmrs/beautify.yaml', 'r')
except FileNotFoundError:
    pass
else:
    import yaml
    beautify_vmrs = yaml.load(f, Loader=yaml.Loader)
    f.close()
    del f

def used_obsoletes_33_classifiers():
    return models.CodeKey33.objects.filter( obsolete=False
        ).filter(
            Q( assembly__obsolete=True)
            | Q( supergroup__obsolete=True)
            | Q( system__obsolete=True)
        )
def check_used_obsoletes_33_classifiers():
    used_obsolete_ctx = used_obsoletes_33_classifiers().count()
    assert not used_obsolete_ctx, used_obsolete_ctx
NMAX = None #7000

class Importer:
    MAX_COLUMNS = 10
    bulk = True
    cfg4save = dictAttr(
        #die = False,
        missing = False,
        overwrite = False,
        )

    def __init__( me, kind, existing='overwrite', **kwargs):
        #assert existing in me.cfg4save, existing
        me.kind = kind
        #me.cmap = codes.csv_maps[ kind] #XXX when needed
        me.stats4save = dictAttr(
            n = 0,
            ins = 0,
            upd = 0,
            obs_skip = 0,
            dup_skip = 0,
            )
        cfg4save = dictAttr(**me.cfg4save)
        cfg4save[ existing] = True
        me.cfg4save = cfg4save

    def _meth( me, typ):
        return getattr( me, '{typ}{kind}'.format( typ=typ, kind=me.kind), None)

    @transaction.atomic
    def load( me, csvfile):
        me.bulker_create = defaultdict( list)
        me.bulker_update = defaultdict( list)
        me.indexer = defaultdict( list)
        me.existing = defaultdict( dict)

        imp = me._meth('import') or me._import
        me._missing_obsoletes = []
        r, checker = imp( csvfile)
        if me.bulk:
            for klas, objs in me.bulker_create.items():
                if isinstance( klas, str):
                    klas = me.bulk_group4klas[ klas]
                klas.objects.bulk_create( objs, batch_size=1000)
            for klas, objs in me.bulker_update.items():
                klas.objects.bulk_update( objs, batch_size=1000)

        if checker: checker()
        me.delete_missing_obsoletes()
        return r

    def delete_missing_obsoletes(me):
        deleted_count = 0
        for o in me._missing_obsoletes:
            deleted_count += o.delete()[0]
        me.stats4save.obs_left = len( me._missing_obsoletes) - deleted_count
        #_missing_obsoletes.clear()

    def save( me, **attrs):
        return me._save( me.model, **attrs)

    def _save( me, klas, **attrs):
        klas4bulk_group = klas
        if isinstance( klas, tuple):
            klas4bulk_group, klas = klas

        stats4save = me.stats4save

        if me.bulk:
            if klas not in me.existing:
                me.existing[ klas].update( klas.objects.in_bulk())
            pkname = 'code'#klas._meta.pk.attname
            pk = attrs[ pkname]

            r = klas( **attrs)
            obsolete = attrs.get('obsolete')
            if obsolete:
                #r.delete()
                stats4save.obs_skip += 1
                me._missing_obsoletes.append( r)

            key = (klas, pk)
            l = me.indexer[ key]
            l.append( attrs)
            reusing_first = False
            is_dup = len(l) > 1
            if is_dup:
                known_dups = beautify_vmrs.get( klas.KIND, {}).get('duplicates', {})
                handle = known_dups.get( pk)
                assert handle, f'Unhandled duplicate {klas}:{pk} {l}'

                if handle == 'use_last':
                    me.bulker_create[ klas4bulk_group] = [o for o in me.bulker_create[ klas4bulk_group] if o.code != pk] #o.pk
                    me.bulker_update[ klas4bulk_group] = [o for o in me.bulker_update[ klas4bulk_group] if o.code != pk] #o.pk
                    l = l[-1:]
                elif handle == 'use_first':
                    l = l[:1]
                    reusing_first = True
                else:
                    assert 0, f'Unknown handling "{handle}" of duplicates for {klas}:{pk}'
                stats4save.dup_skip += 1
                me.indexer[ key] = l

            if not reusing_first:
                if pk in me.existing[ klas]:
                    if me.cfg4save.missing:
                        r = me.existing[ klas][ pk]
                    elif me.cfg4save.overwrite:
                        if not obsolete and not is_dup:
                            stats4save.upd += 1
                        me.bulker_update[ klas4bulk_group].append( r)
                    else:
                        raise RuntimeError('found existing objects')
                else:
                    if not obsolete and not is_dup:
                        stats4save.ins += 1
                    me.bulker_create[ klas4bulk_group].append( r)
        else:
            assert 0 #doesn't work for CK33, not sure for others - check
            try:
                r = klas.objects.create( **attrs)
                if attrs.get('obsolete'):
                    stats4save.obs_skip += 1
                    me._missing_obsoletes.append( r)
                else:
                    stats4save.ins += 1
            except IntegrityError:
                pk = klas._meta.pk.attname
                if me.cfg4save.missing:
                    r = klas.objects.get( pk= attrs[pk] ) #if using this TODO
                elif me.cfg4save.overwrite:
                    r = klas.objects.get( pk= attrs[pk] )
                    for k,v in attrs.items(): setattr( r, k, v)
                    r.save( force_update=True)
                    stats4save.upd += 1
                else:
                    raise RuntimeError('found existing objects')
        stats4save.n += 1
        return r

    def _import( me, csvfile):
        #if me.cmap in (codes.OBSOLETE, codes.IGNORE):
        #    return me.cmap, None

        #ignore = me.cmap.get('_ignore')
        #XXX when needed
        #if ignore != codes.COMPOSITE:
        #    if ignore:
        #        return 'ignore: '+ignore, None
        #    model = code_models_by_kind[ me.kind]
        #else:
        #    model = None    #overwrite it below
        model = supported_vmrs[ me.kind]['_model']

        me.model = model

        ctx = me.ctx = dictAttr()
        code_name = supported_vmrs[ me.kind]['code'] #XXX when needed me.cmap['code']
        me.keys = None
        #icode = None

        bmap = beautify_vmrs.get( me.kind, {}).get( 'codes', {})
        for item in read_csv( csvfile,
                trigger = lambda row: code_name in row,
                #when needed
                #stopper = me._get_stopper(),
                #ignorer = me.ignorer,
                #pretrigger = getattr( me, 'pretrigger{kind}'.format( kind=me.kind), None)
            ):
            if not me.keys:
                me.keys = item
                #icode = keys[-1].index( code_name)
                continue
            #r = dictAttr( (k, cleantext( item,v )) for k,v in me.cmap.items() if k[0]!='_') #XXX when needed
            r = dictAttr( (k, cleantext( item,v )) for k,v in supported_vmrs[ me.kind].items() if k[0]!='_')
            r.update( ctx)
            #yield r
            r.meaning = r.meaning or r.description
            r.meaning = bmap.get( r.code, r.meaning)
            me.save( **r)

            if NMAX and me.stats4save.n > NMAX:
                print( NMAX)
                break
        return 'ok', None

    bulk_group4klas = {
        '33_supergroups': models.CodeKey33,
        '33_systems'    : models.CodeKey33,
        '33_assemblies' : models.CodeKey33,
        }
    def import33( me, csvfile, base_has_all =False): #True
        context = dictAttr(
            system      = None,
            assembly    = None,
            supergroup  = None,
            )
        classify_attrs = set( 'supergroup system assembly component'.split())
        def item2attr( item):
            return dict( (k,v) for k,v in item.items() if k not in classify_attrs)

        all_supergroups = {}
        code_re = re.compile('^\d{3}-\d{3}-\d{3}$')
        special_group_key = '990'
        for item in read_CK33( csvfile):
            code = item.code
            assert code_re.match( code), f'weird component code: {code}'

            override = dictAttr()
            csplit = code.split('-')
            system, assembly, component = ( int(x) for x in csplit)
            assert system   == item.system, code
            assert assembly == item.assembly, code
            assert component== item.component, code

            is_special = code.startswith('99')
            group_key = special_group_key if is_special else code[1]
            context.supergroup = all_supergroups.get( group_key)
            is_supergroup = code[0] == code[2] == '0' #system===0y0 -> supergroup

            def check_assembly( what):
                assert context.assembly and context.assembly.code == '-'.join( csplit[:2] +['000'] ), (code, context, what)
            def check_system( what):
                assert context.system and context.system.code == csplit[0]+'-000-000', (code, context, what)
            def check_supergroup( what):
                # the 2nd digit of the system code, identifies the supergroup
                assert context.supergroup and (
                    context.supergroup.code == f'0{group_key}0-000-000'
                    or (is_special and context.supergroup.code == f'{special_group_key}-000-000')
                    ), (code, context, what)

            if is_special and not context.supergroup:
                attrs = dict(
                    code = f'{special_group_key}-000-000',
                    meaning = 'Total Vehicle Group',
                )
                context.supergroup = all_supergroups[ group_key] = me._save( ('33_supergroups', models.CodeKey33), #_supergroups,
                    **attrs
                    )
                if 0: #probably not needed
                 me._save( models.CodeKey33,
                    assembly    = None,
                    system      = None,
                    supergroup  = None,
                    **attrs
                    )

            if is_supergroup:
                assert assembly == 0, code
                assert context.supergroup is None, 'who loaded the supergroup??'
                context.supergroup = all_supergroups[ group_key] = me._save( ('33_supergroups', models.CodeKey33), #_supergroups,
                    **item2attr( item)
                    )
                context.update( system= None, assembly= None)
                override.supergroup = None
                if not base_has_all: continue #why was this missing ?
            elif assembly == 0:
                assert component == 0, code
                context.system = me._save( ('33_systems', models.CodeKey33), #_system_31,
                    supergroup  = context.supergroup,
                    **item2attr( item)
                    )
                context.update( assembly= None, )
                override.system = None
                if not base_has_all: continue
            elif component == 0:
                if is_special and int(context.system.code.split('-')[0]) != system:   #invent the context.system
                    attrs = dict( item2attr( item),
                        code        = f'{system}-000-000',
                        meaning     = item.meaning.replace( 'Assembly', '').replace( 'assembly', '').strip()
                        )
                    context.system = me._save( ('33_systems', models.CodeKey33), #_system_31,
                        supergroup  = context.supergroup,
                        **attrs
                        )
                    if 0: #added before hand? #assembly == 999: # there is no 999-000-000 in CK33 so lets add it here
                        me._save( models.CodeKey33,
                            assembly    = None,
                            system      = None,
                            supergroup  = context.supergroup,
                            **attrs
                            )
                    context.update( assembly= None, )

                check_supergroup( 'assembly')
                check_system( 'assembly')
                context.assembly = me._save( ('33_assemblies', models.CodeKey33), #_assembly_32,
                        system  = context.system,
                        supergroup = context.supergroup,
                        **item2attr( item)
                        )
                override.assembly = None

                if not base_has_all: continue

            else:
                check_supergroup( 'item')
                check_system( 'item')
                check_assembly( 'item')

            c = dictAttr( context, **override)
            me._save( models.CodeKey33,
                assembly    = c.assembly,
                system      = c.system,
                supergroup  = c.supergroup,
                **item2attr( item)
                )

            if NMAX and me.stats4save.n > NMAX:
                print( NMAX)
                break

        #any_obsoletes = models.CodeKey33.objects.filter( Q( obsolete=True) | Q( assembly__obsolete=True) | Q(supergroup__obsolete=True) | Q( system__obsolete=True)).count()
        return 'ok', check_used_obsoletes_33_classifiers


