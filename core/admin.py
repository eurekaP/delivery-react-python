from django.contrib import admin

from . import models


@admin.register(models.Fleet)
class FleetAdmin( admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'state',
    ]
    search_fields = [
        'name',
    ]


@admin.register(models.Truck)
class TruckAdmin( admin.ModelAdmin):
    search_fields = ['fleet', 'name', 'unit_number']
    list_filter = ['fleet']
    list_display = [
        'id',
        'unit_number',
        'fleet',
        'status',
        'model',
        'model_year',
        'vin',
        'registration_plate',
        'registration_state',
    ]
    raw_id_fields = [
        'vmrs_equipment_category',
        'vmrs_manufacturer',
        'transmission_vmrs_manufacturer',
        'engine_vmrs_manufacturer',
    ]


# vim:ts=4:sw=4:expandtab
