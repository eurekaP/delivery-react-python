from django.utils.translation import ugettext_lazy as _
from django.db import models
from django import forms
from django.utils.encoding import force_text
from django.core.validators import RegexValidator

#XXX copy this nonsense from localflavor.us.models.. pretty useless outside admin
#XXX the suggested replacement django-phonenumber-field is huge and still doesnt work properly btw

import re
phone_digits_re = re.compile(r'^(?:1-?)?(\d{3})[-\.]?(\d{3})[-\.]?(\d{4})$')
class USPhoneNumberFormField( forms.CharField ):
    default_error_messages = {
        'invalid': _('Phone numbers must be in XXX-XXX-XXXX format.'),
    }
    def clean(self, value):
        super().clean(value)
        if value in self.empty_values:
            return self.empty_value
        value = re.sub('(\(|\)|\s+)', '', force_text(value))
        m = phone_digits_re.search(value)
        if m:
            return '%s-%s-%s' % (m.group(1), m.group(2), m.group(3))
        raise forms.ValidationError( self.error_messages['invalid'])


class PhoneNumberField( models.CharField):
    """
    checks for a valid U.S.A.-style phone number. (in the format ``XXX-XXX-XXXX``).
    """
    description = _("Phone number")
    default_validators = [
        RegexValidator( phone_digits_re,
        USPhoneNumberFormField.default_error_messages['invalid'],
        'invalid'
        )
    ]
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 20
        super().__init__( *args, **kwargs)

    def formfield(self, **kwargs):
        defaults = dict( form_class= USPhoneNumberFormField )
        defaults.update( kwargs)
        return super().formfield(**defaults)


# vim:ts=4:sw=4:expandtab
