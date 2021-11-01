from django.db import transaction

from rest_framework import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ViewSet

from common_helpers.attr import get_attrib
from common_helpers.drf.views import NoDeleteViewSet, NoUpdateViewSet, NestedViewSetMixin
from common_helpers.drf.fields import RelatedResourceUrlField

from lib.filters import make_filter_class
from lib.mixins import CreateDeleteImageMixin
from .documents import TruckDocument
from . import models


class FleetContextSerializerMixin:
    def create(self, validated_data):
        data = dict(validated_data)
        data['fleet_id'] = self.get_fleet_id()
        return super().create(data)

    def get_fleet_id(self):
        parent_context = self.context['view'].get_parents_query_dict()
        return int(parent_context['fleet'])


class FleetViewSet( NoDeleteViewSet):
    queryset = models.Fleet.objects.all()
    permission_classes = [ IsAuthenticated ]

    class serializer_class( serializers.ModelSerializer):
        trucks = RelatedResourceUrlField('fleet-trucks-list', parent_lookup_fleet='pk')
        logo = None

        class Meta:
            model = models.Fleet
            exclude = []
            extra_kwargs = dict( state=dict(allow_null=True))

        def validate_state(self, value):
            return value or ''

        # not needed since name,state uniquness is no longer required
        def zzvalidate( self, attrs):
            name = attrs.get('name')
            state = attrs.get('state')
            if name and state:
                qry = models.Fleet.objects.filter( name__iexact=name, state=state)
                if self.instance:
                    qry = qry.exclude( pk=self.instance.pk)
                if qry.exists():
                    raise serializers.ValidationError('A fleet company with this name and state has already been registered')
            return attrs

    #   EXAMPLE
    #class filter_class( FilterSet):
    #    class Meta:
    #        model = TruckCompany
    #        exclude = 'logo phone'.split()
    #        fields = {
    #           'name': ['exact', 'contains'],
    #           }
    #
    #    order = filters.OrderingFilter( fields = 'name email phone'.split())
    #
    #filter_class = make_filter_class( TruckCompany, exclude = 'logo phone'.split(), custom_fields = dict(
    #    name = ['exact', 'contains'],
    #    ))

class FleetLogoView(CreateDeleteImageMixin, ViewSet):
    class serializer_class( serializers.ModelSerializer):
        class Meta:
            model = models.Fleet
            fields = ['logo']

    def _get_instance(self, request, *args, **kwargs):
        return models.Fleet.objects.get(id= kwargs['parent_lookup_fleet'])

    def image_getter( self, instance):
        return getattr( instance, 'logo')

    class serializer_class_output( FleetViewSet.serializer_class):
        pass


class TruckViewSet( NestedViewSetMixin, ModelViewSet):
    queryset = models.Truck.objects.all()
    permission_classes = [ IsAuthenticated ]

    class serializer_class( FleetContextSerializerMixin, serializers.ModelSerializer):
        class Meta:
            model = models.Truck
            exclude = ['fleet', '_unit_number_lower']

        def validate( self, attrs):
            if (
                attrs.get('unit_number') is not None
                and models.Truck.objects.filter(
                    _unit_number_lower= attrs['unit_number'],
                    fleet= self.get_fleet_id()
                    ).exists()
                ):
                raise serializers.ValidationError('Truck with this unit number already exists')
            return attrs

        def validate_vin( self, vin):
            return vin or None

    filter_class = make_filter_class( models.Truck, text_document=TruckDocument, exclude=['photo'],
        filter_text_required_fleet=True,
        filter_text_settings= dict(
            field2boost = dict(
                name = 2,
                ),
            #search_type = 'phrase_prefix',
            )
        )


class RepairshopViewSet( NoDeleteViewSet):
    queryset = models.Repairshop.objects.all()
    permission_classes = [ IsAuthenticated ]

    class serializer_class( serializers.ModelSerializer):
        class Meta:
            model = models.Repairshop
            exclude = []

    filter_class = make_filter_class( models.Repairshop, exclude=['logo'])


# vim:ts=4:sw=4:expandtab
