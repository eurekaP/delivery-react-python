from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin

from core.models import Fleet
import users.admin  # noqa
#import django.contrib.auth.admin  # noqa
import core.admin
import teams.admin
import vmrs.admin
import waffle.admin

admin.site.unregister( Fleet)

@admin.register( Fleet)
class FleetAdmin( teams.admin.FleetAdminMixin, core.admin.FleetAdmin):
    pass


urlpatterns = [
    #url(r'^login/', lib.passwordless.admin.InitAdminLoginView.as_view(), name='init_admin_login'),
    #url(r'^login_confirm/', lib.passwordless.admin.CompleteAdminLoginView.as_view(), name='complete_admin_login'),
    url(r'', admin.site.urls),
]

#from fp2.models import User
#User._meta.verbose_name = 'zzzzz'
#User._meta.verbose_name_plural = 'zzzzzes'

if 'django_rq' in settings.INSTALLED_APPS:
    urlpatterns.append(
        url(r'^rq/', include('django_rq.urls')),
    )

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Text to put at the end of each page's <title>.
admin.site.site_title = _('Connect admin')
# Text to put in each page's <h1>.
admin.site.site_header = _('Connect administration')
# Text to put at the top of the admin index page.
admin.site.index_title = _('Connect administration')

# vim:ts=4:sw=4:expandtab
