from django.conf import settings
from django.db import transaction
from django.contrib.auth import update_session_auth_hash, login as django_login
from django.contrib.auth.tokens import default_token_generator as password_reset_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode as uid_decoder
from django.utils.encoding import force_bytes, force_text

from rest_framework.generics import CreateAPIView
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from dj_rest_auth.views import (
    LoginView as _LoginView,
    LogoutView as _LogoutView,
    UserDetailsView as _UserDetailsView,
)
from dj_rest_auth.registration.views import (
    RegisterView as _RegisterView, VerifyEmailView,
)
from allauth.account.adapter import get_adapter
#from allauth.socialaccount.adapter import get_adapter as get_social_adapter
from allauth.socialaccount.helpers import complete_social_signup
from lib.models import AddressPhoneAbstract

#from phonenumber_field.serializerfields import PhoneNumberField

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import (
    SocialLoginView, SocialConnectView, SocialAccount, #SocialAccountDisconnectView,
)
from dj_rest_auth.registration.serializers import (
    SocialAccountSerializer as _SocialAccountSerializer,
    SocialConnectSerializer as _SocialConnectSerializer,
)

from os.path import join as os_path_join

from common_helpers.django.send_email import send_email
#from common_helpers.drf import RelatedResourceUrlField

from .adapter import SocialSignUpFoundUser, SocialSignUpFoundEmailAddress #, SOCIAL_VIEW_NAMES
from . import models


throttle_scope = 'users'


def PasswordField( **kwargs):
    return serializers.CharField( write_only=True, max_length=40, **kwargs)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    class serializer_class( SocialLoginView.serializer_class):
        password = PasswordField( required=False, allow_blank=True, allow_null=True)

        def validate(self, attrs):
            try:
                return super().validate(attrs)
            except SocialSignUpFoundEmailAddress as e:
                if not e.email_address.verified:
                    password = attrs.get('password')
                    if not password:
                        raise serializers.ValidationError('password_required')
                    if not e.email_address.user.check_password( password):
                        raise serializers.ValidationError('invalid_password')
                self.connect_social( e.sociallogin, e.email_address.user, e.email_address)
                attrs['user'] = e.email_address.user
            except SocialSignUpFoundUser as e:
                self.connect_social( e.sociallogin, e.user)
                attrs['user'] = e.user
            return attrs

        def get_social_login( self, *a, **ka):
            login = super().get_social_login( *a, **ka)
            self.social_login = login  # needed later when checking for signup_hint
            return login

        @transaction.atomic
        def connect_social( self, sociallogin, user, email_address=None):
            request = self.context['request']
            sociallogin.user = user
            sociallogin.save(request, connect=True)
            if email_address:
                get_adapter(request).confirm_email(request, email_address)
            #get_social_adapter(request).save_user(request, sociallogin, form=None)
            return complete_social_signup(request, sociallogin)

    def get_response(self):
        response_serializer_class = self.get_response_serializer()
        data = response_serializer_class(
            instance=self.token,
            context=self.get_serializer_context(),
        ).data
        data['created'] = getattr( self.serializer.social_login, 'signup_hint', False)
        return Response( data)


class GoogleConnect( SocialConnectView):
    adapter_class = GoogleOAuth2Adapter

    class serializer_class( _SocialConnectSerializer):
        class DublicateSocialAccountException( RuntimeError):
            pass
        def get_social_login( self, *a, **ka):
            login = super().get_social_login( *a, **ka)

            request = self._get_request()
            if login.user != request.user:
                raise self.DublicateSocialAccountException( login)

            return login

        def validate( self, attrs, *a, **ka):
            try:
                return super().validate( attrs, *a, **ka)
            except self.DublicateSocialAccountException as e:
                login = e.args[0]

                #delete other social for same provider.account
                SocialAccount.objects.filter(
                    uid = login.account.uid,
                    provider = login.account.provider,
                    ).delete()

                request = self._get_request()
                login.user = request.user
                login.save( request, connect=True)
                attrs['user'] = login.account.user
                return attrs

    def get_response(self):
        data = UserDetailsView.serializer_class( context=dict(request=self.request)).to_representation( self.request.user)
        return Response( data)


class GoogleDisconnect( CreateAPIView):
    permission_classes = [ IsAuthenticated ]

    def create(self, request, *args, **kwargs):
        account = SocialAccount.objects.filter( user=request.user, pk=kwargs['pk']).first()
        if not account:
            raise NotFound
        account.delete()

        data = UserDetailsView.serializer_class( context=dict(request=request)).to_representation( request.user)
        return Response( data)


class EmailRequiredSerializer( serializers.Serializer):
    email = serializers.EmailField( required=True)

    def get_user(self):
        return models.User.objects.filter(
            email__iexact = self.validated_data['email'],
            is_active = True,
        ).first()


def _validate_password(password):
    return get_adapter().clean_password(password)


class RegistrationView( _RegisterView):
    throttle_scope = throttle_scope
    permission_classes = [AllowAny]

    class serializer_class( EmailRequiredSerializer, _RegisterView.serializer_class):
        name = serializers.CharField( max_length=150, allow_blank=True, required=False)
        password = PasswordField()
        username = password1 = password2 = None
        class Meta:
            fields = ['email', 'password', 'name']

        def validate_password(self, password):
            return _validate_password( password)

        def validate(self, data):
            # don't validate missing fields password1 and password2
            return data

        def get_cleaned_data(self):
            return dict(
                name = self.validated_data.get('name', ''),
                password = self.validated_data.get('password', ''),
                email = self.validated_data.get('email', ''),
            )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            user = self.perform_create(serializer)
        if 'auto login after sign up':
            user = serializer.get_user()
            return login_token_response( self.request, user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            self.get_response_data(user),
            headers=headers,
        )


class RegistrationConfirmView( VerifyEmailView):
    throttle_scope = throttle_scope
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        r = super().post(request, *args, **kwargs)
        if 'auto login after confirmation':
            user = self.get_object().email_address.user
            return login_token_response( request, user)
        return r


def login_token_response(request, user):
    token, created = LoginView.token_model.objects.get_or_create( user=user)
    django_login( request, user)
    update_session_auth_hash(request, user)
    return Response( dict(token=token.key))


class LoginView( _LoginView):
    throttle_scope = throttle_scope
    permission_classes = [AllowAny]

    class serializer_class( _LoginView.serializer_class):
        username = None


class LogoutView(_LogoutView):
    throttle_scope = throttle_scope


class SocialAccountSerializer( _SocialAccountSerializer):
    #url_disconnect = RelatedResourceUrlField( SOCIAL_VIEW_NAMES.disconnect, pk='pk')
    details = serializers.JSONField( source='extra_data')
    class Meta(_SocialAccountSerializer.Meta):
        fields = list(_SocialAccountSerializer.Meta.fields) + [
            #'url_disconnect',
            'details',
        ]


class UserDetailsView(_UserDetailsView):
    throttle_scope = throttle_scope

    class serializer_class( _UserDetailsView.serializer_class):
        #url_social_connect = RelatedResourceUrlField( SOCIAL_VIEW_NAMES.connect)
        social_accounts = serializers.SerializerMethodField()
        has_usable_password = serializers.BooleanField( read_only=True)
        avatar = serializers.ImageField( required=False)

        class Meta( _UserDetailsView.serializer_class.Meta):
            read_only_fields = ('email',)
            fields = [
                name
                for name in _UserDetailsView.serializer_class.Meta.fields
                if name not in ['first_name', 'last_name']
            ] + [
              f.name for f in AddressPhoneAbstract._meta.fields
            ] + [
                'name',
                'avatar',
                'has_usable_password',
                'social_accounts',
                #'url_social_connect',
            ]
        def get_social_accounts( self, obj):
            return SocialAccountSerializer(many=True, context=self.context).to_representation( obj.socialaccount_set.all())


class PasswordResetView( CreateAPIView):
    throttle_scope = throttle_scope
    permission_classes = [AllowAny]

    class serializer_class( EmailRequiredSerializer):
        def save(self):
            user = self.get_user()
            if user:
                send_password_reset_email( user)
            else:
                raise serializers.ValidationError(
                    dict( email= 'Email Address not associated with an account.'),
                    'does_not_exist'
                    )



def send_password_reset_email( user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = password_reset_token_generator.make_token(user)
    send_email(
        to_email = user.email,
        from_email = settings.DEFAULT_FROM_EMAIL,
        context = dict(
            site_name=settings.PROJECT_NAME,
            site_url = settings.PROJECT_SITE_URL,
            action_url= settings.USERS_PASSWORD_RESET_URL.format( uid=uid, token=token),
            user = user,
        ),
        subject_template_name = 'users/password_reset_subject.txt',
        plain_body_template_name = 'users/password_reset_email.txt',
        html_body_template_name = 'users/password_reset_email.html',
        html_body_template_images= [os_path_join( settings.STATIC_ROOT, 'Logo.png')]
    )


class UidTokenSerializer( serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    def validate(self, attrs):
        # Decode the uidb64 to uid to get User object
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = models.User._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, models.User.DoesNotExist):
            raise ValidationError({'uid': ['Invalid value']})

        if not password_reset_token_generator.check_token(self.user, attrs['token']):
            raise ValidationError({'token': ['Invalid value']})
        return attrs


class PasswordResetConfirmView(CreateAPIView):
    throttle_scope = throttle_scope
    permission_classes = [AllowAny]

    class serializer_class( UidTokenSerializer):
        new_password = PasswordField()

        def save(self):
            self.user.set_password( self.validated_data['new_password'])
            self.user.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        if 'auto login after password reset':
            return login_token_response( request, serializer.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, headers=headers)


class PasswordChangeView(CreateAPIView):
    throttle_scope = throttle_scope
    permission_classes = [ IsAuthenticated ]

    class serializer_class(serializers.Serializer):
        current_password = PasswordField( required=False, allow_blank=True)
        new_password = PasswordField()

        def validate_current_password( self, pwd):
            u = self.context['request'].user
            if u.has_usable_password():
                if not u.check_password( pwd):
                    raise serializers.ValidationError('Incorrect password')
            elif pwd:
                raise serializers.ValidationError('Incorrect password')

        def validate_new_password( self, pwd):
            return _validate_password( pwd)

    def perform_create(self, serializer):
        user = self.request.user
        user.set_password( serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash( self.request, user)


# vim:ts=4:sw=4:expandtab
