from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.exceptions import ErrorDetail
from rest_framework.response import Response
from common_helpers.drf.merge import MergeViewSetMixinsMeta

from users import views as users_views
from core import views as core_views
from teams import views as teams_views

from lib.mixins import CreateDeleteImageMixin
from rest_framework.views import APIView
from rest_framework import serializers
from users import models as users_models


class UserDetailsView(
            teams_views.UserDetailsViewMixin,
            users_views.UserDetailsView,
            metaclass = MergeViewSetMixinsMeta):
    pass

class UserAvatarView(CreateDeleteImageMixin, APIView):
    class serializer_class( serializers.ModelSerializer):
        class Meta:
            model = users_models.User
            fields = ['avatar']

    class serializer_class_output( UserDetailsView.serializer_class):
        pass

    def _get_instance(self, request, *args, **kwargs):
        return users_models.User.objects.get(id= request.user.id)

    def image_getter( self, instance):
        return getattr( instance, 'avatar')


class RegistrationView(
            teams_views.RegistrationViewMixin,
            users_views.RegistrationView):
    pass


class GoogleLoginView(
            teams_views.GoogleLoginViewMixin,
            users_views.GoogleLogin):
    pass


class FleetViewSet(
            teams_views.FleetViewSetMixin,
            core_views.FleetViewSet,
            metaclass = MergeViewSetMixinsMeta):
    pass


class TruckViewSet(
            teams_views.TruckViewSetMixin,
            core_views.TruckViewSet,
            metaclass = MergeViewSetMixinsMeta):
    pass


def exception_handler(exc, context):
    res = drf_exception_handler( exc, context)
    if res:
        res = Response( data=decode_error_details(res.data), status=res.status_code, headers=res.headers)
    return res


def decode_error_details(data):
    if isinstance(data, (list, tuple)):
        return [ decode_error_details(item) for item in data ]
    if isinstance(data, dict):
        return {
            key: decode_error_details(value)
            for key, value in data.items()
        }
    if isinstance(data, ErrorDetail):
        return dict(message=str(data), code=data.code)
    return data


# vim:ts=4:sw=4:expandtab
