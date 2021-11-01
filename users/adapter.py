from django.conf import settings
from django.contrib.auth import get_user_model

from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailAddress
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

from common_helpers.django.send_email import make_email_message
from os.path import join as os_path_join

class AccountAdapter( DefaultAccountAdapter):
    def format_email_subject(self, subject):
        return subject

    def get_email_confirmation_url(self, request, emailconfirmation):
        return settings.USERS_REGISTRATION_CONFIRM_URL.format( key=emailconfirmation.key)

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        user.name = data.get('name', '')
        user.email = data.get('email')
        if 'password' in data:
            user.set_password(data['password'])
        else:
            user.set_unusable_password()
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
        return user

    def render_mail(self, template_prefix, email, context):
        return make_email_message(
            to_email = email,
            from_email = settings.DEFAULT_FROM_EMAIL,
            context = dict(
                site_name = settings.PROJECT_NAME,
                site_url = settings.PROJECT_SITE_URL,
                action_url= context['activate_url'],
                **context,
            ),
            subject_template_name = 'users/registration_confirm_subject.txt',
            plain_body_template_name = 'users/registration_confirm_email.txt',
            html_body_template_name = 'users/registration_confirm_email.html',
            html_body_template_images= [os_path_join( settings.STATIC_ROOT, 'Logo.png')]
        )

    def respond_user_inactive(self, request, user):
        pass

    def respond_email_verification_sent(self, request, user):
        pass


class SocialSignUpFoundEmailAddress( RuntimeError):
    def __init__( self, sociallogin, email_address):
        self.sociallogin = sociallogin
        self.email_address = email_address
        super().__init__()


class SocialSignUpFoundUser( RuntimeError):
    def __init__( self, sociallogin, user):
        self.sociallogin = sociallogin
        self.user = user
        super().__init__()


#class SOCIAL_VIEW_NAMES:
#    connect = 'auth_social_accounts'
#    disconnect = 'auth_social_disconnect'


class SocialAccountAdapter( DefaultSocialAccountAdapter):
    def is_auto_signup_allowed(self, request, sociallogin):
        res = super().is_auto_signup_allowed( request, sociallogin)
        if not res:
            email = sociallogin.user.email
            if not email:
                return False
            found_email = EmailAddress.objects.filter( email__iexact=email).first()
            if found_email:
                raise SocialSignUpFoundEmailAddress( sociallogin, found_email)
            found_user = get_user_model().objects.filter(
                email__iexact=email, is_active=True
            ).first()
            if found_user:
                raise SocialSignUpFoundUser( sociallogin, found_user)
        else:
            sociallogin.signup_hint = True  # needed to hint the view that we are doing signup and not just login
        return res

    #def get_connect_redirect_url(self, request, socialaccount):
    #    assert request.user.is_authenticated
    #    return reverse( SOCIAL_VIEW_NAMES.connect)


# vim:ts=4:sw=4:expandtab
