from django.contrib import admin
from common_helpers.django.admin_helpers import ExtraFieldsMixin, inline, ReadOnlyInlineMixin
from . import models


class FleetAdminMixin( ExtraFieldsMixin):
    def list_display_extra(self, request):
        return super().list_display_extra(request) + ['owners_list']

    def inlines_extra(self, request, obj):
        return super().inlines_extra( request, obj) + [
            inline( (ReadOnlyInlineMixin, admin.TabularInline,), models.Invitation),
            inline( (ReadOnlyInlineMixin, admin.TabularInline,), models.Member),
        ]

    @admin.display(description='Owners')
    def owners_list(self, obj):
        return ','.join(
            str(member.user)
            for member in obj.members.all()
            if member.role == models.Member._roles.OWNER
        )

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('members__user')


# vim:ts=4:sw=4:expandtab
