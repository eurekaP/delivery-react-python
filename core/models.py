import re

from django import forms
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.db import models

#from lib.usphones import PhoneNumberField
from lib.models import AddressPhoneAbstract, enum, optional, states, default_size
from common_helpers.django.models import Link, nullable
from vmrs.models import CodeKey2, CodeKey34


def optional_text():
    return optional( default_size)


VIN_SZ = 17

def company_logo_upload_to( instance, filename):
    return f'company_images/{filename}'

def truck_photo_upload_to( instance, filename):
    return f'truck_photos/{filename}'


class EasyURLField( models.CharField):
    default_validators = [
        RegexValidator(
            re.compile(r'^((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$'),
            'Please enter a valid URL!',
            'invalid'
        )
    ]
    description = _("URL")

    def __init__(self, verbose_name=None, name=None, **kwargs):
        kwargs.setdefault('max_length', 200)
        super().__init__(verbose_name, name, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        if kwargs.get("max_length") == 200:
            del kwargs['max_length']
        return name, path, args, kwargs

    def formfield(self, **kwargs):
        # As with CharField, this will cause URL validation to be performed
        # twice.
        return super().formfield(**{
            'form_class': forms.URLField,
            **kwargs,
        })


class Business( AddressPhoneAbstract):
    class Meta:
        abstract = True

    name    = optional( models.CharField, max_length=100)

    contact = optional( max_length=200)
    email   = optional( models.EmailField)
    website = optional( EasyURLField)

    logo = nullable( models.ImageField, upload_to= company_logo_upload_to)


class Fleet( Business):
    def __str__(self):
        return f'{self.name} {self.state}'


class Truck( models.Model):
    class Meta:
        unique_together = [
            ('_unit_number_lower', 'fleet'),
            ('_vin_lower',         'fleet'),
        ]

    vmrs_equipment_category = nullable( Link, CodeKey2, related_name='trucks')
    vmrs_manufacturer = nullable( Link, CodeKey34, related_name='trucks')

    fleet = Link( Fleet, related_name='trucks')

    unit_number         = models.CharField( max_length=20)
    _unit_number_lower  = models.CharField( max_length=20)

    name                = optional_text()
    vin                 = nullable( models.CharField, max_length=VIN_SZ)
    _vin_lower          = nullable( models.CharField, max_length=VIN_SZ)
    registration_plate  = optional( max_length=20)
    registration_state  = optional( enum, items= states)

    model      = optional_text()
    model_year = nullable( models.IntegerField)

    engine_vmrs_manufacturer = nullable( Link, CodeKey34, related_name='+')
    engine_model = optional_text()
    engine_hp = nullable( models.IntegerField)

    transmission_vmrs_manufacturer = nullable( Link, CodeKey34, related_name = '+')
    transmission_model = optional_text()
    transmission_gears = optional_text()

    color = optional_text()
    tire_size = optional_text()

    status = enum( 'IN_SERVICE OUT_OF_SERVICE'.split())

    photo = nullable( models.ImageField, upload_to= truck_photo_upload_to)

    def save(self, *a, **ka):
        #https://www.py4u.net/discuss/16836 or django UniqueConstraint( *expressions) when it comes out
        self._unit_number_lower = self.unit_number.lower()
        if getattr( self, 'vin', None):
            self._vin_lower = self.vin.lower()
        return super().save( *a, **ka)


class Repairshop( Business):
    class Meta:
        unique_together = ('name', 'state', 'namespace')
    namespace = Link( Fleet, related_name= 'custom_vendors')
    verified_repairshop = models.ForeignKey('self',
        null=True,
        on_delete=models.SET_NULL,
        related_name='custom_clones'
    )

# vim:ts=4:sw=4:expandtab
