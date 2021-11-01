import itertools

from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.views.generic.base import TemplateView
from rest_framework_extensions.routers import ExtendedDefaultRouter
from common_helpers.drf.routers import HybridRouterMixin

from users.models import User
from users import views as users_views
#from users.adapter import SOCIAL_VIEW_NAMES
from vmrs import views as vmrs_views
from core import views as core_views
from teams import views as teams_views
from service_history import views as service_log_views

from . import views


class Router(HybridRouterMixin, ExtendedDefaultRouter):
    pass


router = Router()


users_api_urls = [
    path('register/confirm/', users_views.RegistrationConfirmView.as_view(), name='auth_registration_confirm'),
    path('register/', views.RegistrationView.as_view(), name='auth_registration'),
    path('login/google/', views.GoogleLoginView.as_view(), name='auth_google_login'),
    path('login/', users_views.LoginView.as_view(), name='auth_login'),
    path('logout/', users_views.LogoutView.as_view(), name='auth_logout'),
    path('user/avatar/', views.UserAvatarView.as_view(), name='auth_user_avatar'),
    path('user/', views.UserDetailsView.as_view(), name='auth_user_details'),
    #path('user/social/', users_views.GoogleConnect.as_view(), name=SOCIAL_VIEW_NAMES.connect),

    path('password/reset/confirm/', users_views.PasswordResetConfirmView.as_view(), name='auth_password_reset_confirm'),
    path('password/reset/', users_views.PasswordResetView.as_view(), name='auth_password_reset'),
    path('password/change/', users_views.PasswordChangeView.as_view(), name='auth_password_change'),
]


teams_api_urls = [
    path('invitations/accept/', teams_views.InvitationAcceptView.as_view(), name='invitations_accept')
]


for u in itertools.chain(
        users_api_urls,
        teams_api_urls,
        ):
    router.add_api_view( u)


my_fleets_router = router.register(r'my_fleets', views.FleetViewSet)
my_fleets_router.register(r'trucks', views.TruckViewSet, basename='fleet-trucks', parents_query_lookups=['fleet'])
my_fleets_router.register(r'logo', core_views.FleetLogoView, basename='fleet-logo', parents_query_lookups=['fleet'],)
my_fleets_router.register(r'members', teams_views.MemberViewSet, basename='fleet-members', parents_query_lookups=['company'])

#my_repairshops_router = router.register(r'my_repairshops', core_views.RepairshopViewSet)
#my_repairshops_router.register(r'members', teams_views.MemberViewSet, basename='repairshop-members', parents_query_lookups=['repairshop'])

#router.register(r'service_log', service_log_views.ServiceLogViewSet)
#router.register(r'service_lines', service_log_views.ServiceLineViewSet)

#router.register(r'roles', core_views.RoleViewSet)
#router.register(r'invitations', core_views.InvitationViewSet)

router.register(r'vmrs/ck2', vmrs_views.CodeKey_2_ViewSet)
router.register(r'vmrs/ck16', vmrs_views.CodeKey_16_ViewSet)
router.register(r'vmrs/ck33', vmrs_views.CodeKey_33_ViewSet)
router.register(r'vmrs/ck34', vmrs_views.CodeKey_34_ViewSet)

'''
class EmailTemplateView(TemplateView):
    template_name = 'invitations/email_body.html'

    def get_context_data(self, **kwargs):
        # context = super().get_context_data(**kwargs)

        context = dict(
            site_name=settings.PROJECT_NAME,
            site_url = settings.PROJECT_SITE_URL,
            action_url= "http://localhost:3000/reset-password?eherh=reherqhzhfdfs&fjdfjdgjgf=dsgjgjsjh"
        )

        context['user'] = User.objects.first()
        return context
'''

urlpatterns = [
    path('', include( router.urls)),
    #path('user/social/<int:pk>/disconnect/', users_views.GoogleDisconnect.as_view(), name=SOCIAL_VIEW_NAMES.disconnect),
    path('admin/', admin.site.urls),

    # path('email-test/', EmailTemplateView.as_view())
]


if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# vim:ts=4:sw=4:expandtab
