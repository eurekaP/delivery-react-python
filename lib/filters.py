from django.db.models import Case, When
from django_filters.rest_framework import FilterSet, filters
from elasticsearch_dsl import Q
from django_elasticsearch_dsl import NestedField


class FilterSetWithText( FilterSet):
    def filter_queryset( me, queryset, textvalue2value = lambda me, v: v ):
        text_value = me.form.cleaned_data.pop('text', None)
        if text_value:
            queryset = me.filters['text'].filter( queryset, textvalue2value( me, text_value ))
        return super().filter_queryset( queryset)
class FilterSetWithText4Fleet( FilterSetWithText):
    def filter_queryset( me, queryset):
        def textvalue2value( me, text_value):
            fleet_id = me.request.parser_context['kwargs']['parent_lookup_fleet']
            return dict(
                fleet_id = fleet_id,
                text = text_value,
                )
        return super().filter_queryset( queryset, textvalue2value = textvalue2value)


def filter_text_default( text_document, queryset, name, settings, value, fleet_id):
    nested_fields = [ k for k,v in text_document._fields.items() if isinstance( v, NestedField) ]

    filter_fields = [ k for k in text_document._fields]
    field2boost = settings.get( 'field2boost')
    if field2boost:
        filter_fields = [
            k + (( '^'+str( field2boost[k] )) if field2boost.get( k) else '')
            for k in filter_fields
            ]
    search_type = settings.get( 'search_type', 'phrase_prefix') #for exact use 'phrase'

    #print( 1100, name, value, fleet_id)
    text_qrys = [
        Q('multi_match',
            query = value,
            fields = filter_fields,

            type = search_type,
            #lenient = True,
        ),
        *[
            Q('nested', path = f,
                query = Q( 'multi_match',
                    query = value,
                    type = search_type,
                )
            ) for f in nested_fields
        ]
    ]

    s = text_document.search(#).params( routing = '10'
        ).query( Q('bool',
        **( dict(
            #must = [ Q('match', fleet__id = fleet_id)
            must = [
                #TODO make it work without "nested"
                Q('nested', path = 'fleet',
                    #TODO make it work with "match"
                    query = Q('multi_match', query = fleet_id) ,
                ),
                Q('bool',
                    should = text_qrys,
                )
            ] )
            if fleet_id
            else dict( should = text_qrys)
        ),
    ))
    #print( 1111, list( s))
    return apply_text_search( s, queryset)


def apply_text_search( search_obj, queryset, order_by_ranking=True):
    s = search_obj
    # Do not query again if the es result is already cached
    if not hasattr(s, '_response'):
        # We only need the meta fields with the models ids
        s = s.source(excludes=['*'])
        s = s.execute()

    pks = [result.meta.id for result in s]
    qs = queryset.filter(pk__in=pks)
    if order_by_ranking:
        ranking = Case(
            *[When(pk=pk, then=pos) for pos, pk in enumerate(pks)]
        )
        qs = qs.order_by( ranking)
    return qs

def make_filter_class( model, exclude=(),
                    all_fields=None,
                    filter_fields=None,
                    order_fields=None,
                    text_document=None,
                    filter_text_func=filter_text_default,
                    filter_text_required_fleet=False,
                    filter_text_settings=None,
                    **kwargs,
                    ):
    all_fields = all_fields or [ f.name for f in model._meta.concrete_fields ] #take object, and add ".name" later if you want the below ImageField filtering
    filter_fields = filter_fields or all_fields
    if isinstance( filter_fields, dict):
        filter_fields = dict( ( k, ['exact'] ) for k in filter_fields)
        for f in all_fields:
            if f in filter_fields: #and not isinstance( mf, ImageField): #use exclude for now
                filter_fields[ f] = filter_fields[ f]

    Meta = type( 'Meta', (), dict( model=model, exclude=exclude, fields=filter_fields))
    filter_set_class = FilterSet
    if text_document:
        if filter_text_required_fleet:
            filter_set_class = FilterSetWithText4Fleet
            def value2value( value):
                fleet_id = value['fleet_id']
                value = value['text']
                return dict( value = value, fleet_id = fleet_id)
        else:
            filter_set_class = FilterSetWithText
            def value2value( value):
                return dict( value = value, fleet_id = None)

        def filter_text( queryset, name, value):
            return filter_text_func( text_document, queryset, name, filter_text_settings, **value2value( value) )
        kwargs['text'] = filters.CharFilter( method=filter_text, field_name='text', label='Text')

    return type( 'filter_class', ( filter_set_class ,), dict(
        __module__ = __name__,
        Meta = Meta,
        ordering = filters.OrderingFilter( fields = order_fields or all_fields),
        **kwargs,
    ))

# vim:ts=4:sw=4:expandtab
