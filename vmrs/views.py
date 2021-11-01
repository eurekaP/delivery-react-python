from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny

from django_filters.rest_framework import FilterSet, filters
from elasticsearch_dsl import Q

from lib.filters import make_filter_class
from . import models
from . import documents


def make_vmrs_viewset( name, model_class):
    class serializer_class( ModelSerializer):
        class Meta:
            model = model_class
            exclude = []

    class filter_class( FilterSet):
        class Meta:
            model = model_class
            exclude = []

    return type( name, (ReadOnlyModelViewSet,), dict(
        queryset = model_class.objects.all(),
        permission_classes = [ AllowAny],
        serializer_class = serializer_class,
        filter_class = filter_class,
    ))


CodeKey_2_ViewSet = make_vmrs_viewset('CodeKey_2_ViewSet', models.CodeKey2)
CodeKey_16_ViewSet = make_vmrs_viewset('CodeKey_16_ViewSet', models.CodeKey16)
CodeKey_34_ViewSet = make_vmrs_viewset('CodeKey_34_ViewSet', models.CodeKey34)


def filter_text_ck33( text_document, queryset, name, value):
    return documents.CodeKey33.search().query(
          Q( 'match', meaning = value)
        | Q( 'match', description = value)
        | Q( 'prefix', code = dict( value = value, boost = 20) ) #try different boosts
        ).to_queryset()

def no_supergroups_flt( queryset, name, value):
    return queryset.exclude_supergroups()

def no_systems_flt( queryset, name, value):
    return queryset.exclude_systems()

def no_assemblies_flt( queryset, name, value):
    return queryset.exclude_assemblies()

def no_components_flt( queryset, name, value):
    return queryset.exclude_components()


class CodeKey_33_ViewSet( ReadOnlyModelViewSet):
    queryset = models.CodeKey33.objects.all()
    permission_classes = [ AllowAny]

    class serializer_class( ModelSerializer):
        class Meta:
            model = models.CodeKey33
            exclude = []

    filter_class = make_filter_class(
        models.CodeKey33,
        all_fields = 'code meaning description'.split(),
        text_document = documents.CodeKey33,
        filter_text_func = filter_text_ck33,

        no_supergroups = filters.BooleanFilter( method=no_supergroups_flt, field_name='no_supergroups', label='No supergroups'),
        no_systems     = filters.BooleanFilter( method=no_systems_flt,     field_name='no_systems',     label='No systems'    ),
        no_assemblies  = filters.BooleanFilter( method=no_assemblies_flt,  field_name='no_assemblies',  label='No assemblies' ),
        no_codes       = filters.BooleanFilter( method=no_components_flt,  field_name='no_codes',       label='No codes'      ),
    )

# vim:ts=4:sw=4:expandtab
