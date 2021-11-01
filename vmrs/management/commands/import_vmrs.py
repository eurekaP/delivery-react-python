import re
from datetime import datetime
from django.db import transaction
from django.core.management.base import BaseCommand
from vmrs import models
from vmrs.importer import Importer


code_models = [ models.CodeKey33 ]


class Command(BaseCommand):
    help = '''
        imports nomenclatures
    '''

    def add_arguments(self, parser):
        parser.add_argument( 'files',   type=str, nargs='*',  help= 'csv-filename/s to import, first number in name is taken to be code#kind')
        parser.add_argument( '--kind',  type=int,             help= 'force kind-number of code imported, use when only 1 file; default: guessed from csv-filename')
        #parser.add_argument('--import_dir', type=str, help= 'required if no files; walks all filenames == known nomenclature names exactly')
        parser.add_argument( '--existing', default = 'overwrite',
            choices = sorted( k for k,v in Importer.cfg4save.items() if v is False) + ['die'] ,
            help= 'importing: what to do if exists - insert only missing, overwrite, die')
        parser.add_argument( '--list',   action='store_true',  help= 'list all known codes, with count of items / obsoletes')
        parser.add_argument( '--delete', type=str, nargs= '+', help= 'delete the code-items of specified kind-numbers/model-names; default: do nothing; to delete all: "all"')

    def handle(self, *args, **options):
        if options.get( 'list'):
            for m in code_models:
                print( m, m.objects.count(), 'obsolete:', m.objects.filter( obsolete=True).count())

        delete_codes= options.get('delete')
        if delete_codes:
            if 'all' in delete_codes:
                delete_codes_models = code_models
            else:
                delete_codes_models = [ m for m in code_models if str( m.KIND) in delete_codes
                                            or m.__name__ in delete_codes
                                            or (m.__module__+'.'+m.__name__) in delete_codes
                                            ]
            with transaction.atomic():
                for m in delete_codes_models:
                    n = m.objects.all().delete()
                    print( 'deleted', m.__name__, ':', n)
            return

        for fname in options.get('files') or ():
            kind = options.get('kind')
            if not kind:
                kind = re.search('\d+', fname)
                assert kind, 'cannot guess kind from filename'
                kind = int(kind.group(0))
            print( f'importing vmrs-codekey {kind:3} from {fname:30}:', end='')
            imp = Importer( kind, existing=options.get( 'existing'))
            #with transaction.atomic(): XXX cannot, create does IntegrityError if exists
            print( imp.load( fname).ljust(10), imp.stats4save)

    def mdate(self, d):
        if not d: return None
        try:
            x = datetime.strptime(d, '%d-%m-%Y')
        except ValueError:
            x = datetime.strptime(d, '%Y-%m-%d %H:%M:%S')
        return x.date().strftime('%Y-%m-%d')

# vim:ts=4:sw=4:expandtab
