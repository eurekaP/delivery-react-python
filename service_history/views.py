from django.db import transaction
from rest_framework import serializers

from common_helpers.drf.views import NoDeleteViewSet
#from common_helpers.drf.hyperlink import HyperlinkedModelSerializer

from .models import ServiceLog, ServiceLine

class ServiceLineSerializer( serializers.ModelSerializer):
    class Meta:
        model = ServiceLine
        exclude = [ 'service_log',]

class ServiceLineViewSet( NoDeleteViewSet):
    queryset = ServiceLine.objects.all()
    serializer_class = ServiceLineSerializer
    permission_classes = []

class ServiceLogSerializer( serializers.ModelSerializer):
    class Meta:
        model = ServiceLog
        exclude = []

    items = ServiceLineSerializer( many=True)

    @transaction.atomic
    def update(self, instance, validated_data):
        items = validated_data.pop( 'items', [])
        ServiceLine.objects.filter( service_log= instance).delete()
        for i in items:
            ServiceLine.objects.create( **i, service_log= instance)
        return super( ServiceLogSerializer, self).update( instance, validated_data)

    @transaction.atomic
    def create(self, validated_data):
        items = validated_data.pop( 'items', [])
        instance = super( ServiceLogSerializer, self).create( validated_data)
        for i in items:
            ServiceLine.objects.create( **i, service_log= instance)
        return instance

class ServiceLogViewSet( NoDeleteViewSet):
    queryset = ServiceLog.objects.all()
    serializer_class = ServiceLogSerializer
    permission_classes = []

# vim:ts=4:sw=4:expandtab
