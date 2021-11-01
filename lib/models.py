from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

from common_helpers.django.models import enum as _enum

from lib.usphones import PhoneNumberField


states = 'AL AK AS AZ AR CA CO CT DE DC FL GA GU HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND MP OH OK OR PA PR RI SC SD TN TX UT VT VA VI WA WV WI WY'.split()


def enum( items, max_length =20, **ka):
    return _enum( items, max_length= max_length, **ka)


def optional( Field=None, **ka):
    if not Field:
        Field = models.CharField
    ka.setdefault('default', '')
    ka.setdefault('blank', True)
    return Field( **ka)


DEFAULT_TEXT_SIZE = 70
def default_size( Field=None, **ka):
    if not Field:
        Field = models.CharField
    ka.setdefault('max_length', DEFAULT_TEXT_SIZE)
    return Field( **ka)

zip_code_regex = r'^(\d{5}(-\d{4})?|[A-CEGHJ-NPRSTVXY]\d[A-CEGHJ-NPRSTV-Z] ?\d[A-CEGHJ-NPRSTV-Z]\d)$'

class ZipCodeFormField(forms.RegexField):
    default_error_messages = {
        'invalid': _('Enter a zip code in the format "XXXXX" or "XXXXX-XXXX" or "XXX XXX".'),
    }

    def __init__(self, max_length=None, min_length=None, **kwargs):
        super().__init__(
            zip_code_regex,
            max_length=max_length,
            min_length=min_length,
            **kwargs
        )

    def to_python(self, value):
        value = super().to_python(value)
        if value is None:
            return
        return value.strip().upper()


class ZipCodeField(models.CharField):
    default_validators = [
        RegexValidator( zip_code_regex,
        ZipCodeFormField.default_error_messages['invalid'],
        'invalid'
        )
    ]
    description = _("USA/Canada ZIP code")

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 10
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'form_class': ZipCodeFormField}
        defaults.update(kwargs)
        return super().formfield(**defaults)


class AddressPhoneAbstract( models.Model):
    class Meta:
        abstract = True
    address = optional( max_length=150)
    zip_code = optional( ZipCodeField)
    state   = optional( enum, items=states)
    city    = optional( max_length=50)
    phone   = optional( PhoneNumberField)

# vim:ts=4:sw=4:expandtab
