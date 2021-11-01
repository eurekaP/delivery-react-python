from django.db import models
from common_helpers.django.models import Link, null_and_blank
from vmrs.models import CodeKey33, CodeKey16
from core.models import Truck, Repairshop, enum, optional


def service_line_upload_to(instance, filename):
    return 'service_logs/{}/{}'.format(instance.id, filename)


class ServiceLog( models.Model):
    truck      = Link( Truck, **null_and_blank, related_name= 'service_logs')
    repairshop = Link( Repairshop, **null_and_blank, related_name= 'service_logs')

    mileage = models.IntegerField()
    hourage = models.IntegerField()

    service_start= models.DateTimeField( **null_and_blank)
    service_end  = models.DateTimeField( **null_and_blank)

    invoice_number = optional( max_length=50)
    vmrs_repair_priority_class = Link( CodeKey16, **null_and_blank, related_name = '+')
    description = optional( max_length=100)

    attachment = models.FileField( upload_to=service_line_upload_to, **null_and_blank)

    #totals


class ServiceLine( models.Model):
    line_type = enum('PART LABOR SERVICE FEE')

    vmrs_component = Link( CodeKey33, **null_and_blank, related_name = '+')
    service_log = Link( ServiceLog, related_name= 'items')
    price =  models.DecimalField( max_digits= 10, decimal_places= 2)
    quantity = models.IntegerField( **null_and_blank)

# vim:ts=4:sw=4:expandtab
