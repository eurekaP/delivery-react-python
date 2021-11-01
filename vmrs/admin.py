from django.contrib import admin
from . import models


class VmrsAdmin( admin.ModelAdmin):
    list_display = [
        'code',
        'meaning',
        'description',
        'start_date',
        'change_date',
        'obsolete',
    ]
    list_filter = [
        'obsolete',
    ]
    search_fields = [
        'code',
        'meaning',
        'description',
    ]


@admin.register(models.CodeKey2)
class CodeKey_2_Admin( VmrsAdmin):
    pass


@admin.register(models.CodeKey16)
class CodeKey_16_Admin( VmrsAdmin):
    pass


@admin.register(models.CodeKey34)
class CodeKey_34_Admin( VmrsAdmin):
    pass


@admin.register(models.CodeKey33)
class CodeKey_33_Admin( VmrsAdmin):
    raw_id_fields = [
        'supergroup',
        'system',
        'assembly',
    ]



# vim:ts=4:sw=4:expandtab
