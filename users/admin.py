from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as _UserAdmin, GroupAdmin as _GroupAdmin
from django.contrib.auth.models import Group

User = get_user_model()
#admin.site.unregister( User)
admin.site.unregister( Group)


@admin.register(User)
class UserAdmin( _UserAdmin):
    fieldsets = [
        [None, {'fields': ['email', 'password'] }],
        ['Personal info', {'fields': ['name'] }],
        ['Permissions', {
            'fields': ['is_active', 'is_staff', 'is_superuser'],
        }],
        ['Important dates', {'fields': ['last_login', 'date_joined'] }],
    ]
    add_fieldsets = [
        [None, {
            'classes': ['wide'],
            'fields': ['email', 'password1', 'password2'],
        }],
    ]
    list_display = ['email', 'name', 'is_staff', 'is_superuser']
    list_filter = ['is_staff', 'is_active', 'is_superuser']
    search_fields = ['email', 'name']
    ordering = ['email']



if 0:
    class GroupProxy( Group):
        class Meta:
            verbose_name = Group._meta.verbose_name
            verbose_name_plural = Group._meta.verbose_name_plural
            proxy = True


    @admin.register(GroupProxy)
    class GroupAdmin( _GroupAdmin):
        pass

# vim:ts=4:sw=4:expandtab
