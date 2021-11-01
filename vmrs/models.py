from django.db import models
from common_helpers.django.models import Link, optional_text, nullable


class BaseCode( models.Model):
    class Meta:
        abstract = True
        ordering = ['pk']

    code = models.CharField( unique=True, max_length=11)

    meaning     = optional_text( models.TextField) #=Description
    description = optional_text( models.TextField) #=Definition,Example
    comments    = optional_text( models.TextField)

    start_date  = nullable( models.DateField)
    change_date = nullable( models.DateField)
    #end_date    = models.DateField( null= True)     #the date at which obsolete became True..?
    obsolete    = models.BooleanField( default = False)

    def __str__( self):
        return self.code +': '+ (self.meaning or self.description or '')


class CK33QuerySet( models.QuerySet):
    def supergroups( self):
        return self.filter( supergroup=None)

    def systems( self):
        return self.exclude_supergroups().filter( system=None)

    def assemblies( self):
        return self.exclude_supergroups().exclude_systems().filter( assembly=None)

    def components( self):
        return self.exclude_supergroups().exclude_systems().exclude_assemblies()

    def exclude_supergroups( self):
        return self.exclude( supergroup=None)

    def exclude_systems( self):
        return self.exclude( supergroup__isnull=False, system=None)

    def exclude_assemblies( self):
        return self.exclude( supergroup__isnull=False, system__isnull=False, assembly=None)

    def exclude_components( self):
        return self.exclude( supergroup__isnull=False, system__isnull=False, assembly__isnull=False)


class CodeKey33( BaseCode):
    class Meta( BaseCode.Meta):
        verbose_name = 'CK33 Component Code'

    objects = CK33QuerySet.as_manager()

    KIND = '33'

    supergroup  = nullable( Link, 'CodeKey33', related_name='+')
    system      = nullable( Link, 'CodeKey33', related_name='+')
    assembly    = nullable( Link, 'CodeKey33', related_name='+')

    @property
    def level( self):
        if self.is_supergroup:
            return 'supergroup'
        if self.is_system:
            return 'system'
        if self.is_assembly:
            return 'assembly'
        return 'component'

    @property
    def is_supergroup( self):
        return self.supergroup_id is None

    @property
    def is_system( self):
        return not self.is_supergroup() and self.system_id is None

    @property
    def is_assembly( self):
        return not self.is_supergroup() and not self.is_system() and self.assembly_id is None

    @property
    def is_component( self):
        return not self.is_supergroup() and not self.is_system() and not self.is_assembly()


class CodeKey2( BaseCode):
    class Meta( BaseCode.Meta):
        verbose_name = 'CK2 Equipment Category'
        verbose_name_plural = 'CK2 Equipment Categories'


class CodeKey16( BaseCode):
    class Meta( BaseCode.Meta):
        verbose_name = 'CK16 Repair Priority Class'
        verbose_name_plural = 'CK16 Repair Priority Classes'


class CodeKey34( BaseCode):
    class Meta( BaseCode.Meta):
        verbose_name = 'CK34 Manufacturer'


# vim:ts=4:sw=4:expandtab
