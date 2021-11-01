from allauth.account.apps import AccountConfig
from allauth.socialaccount.apps import SocialAccountConfig


class ModifiedAccountConfig(AccountConfig):
    default_auto_field = 'django.db.models.AutoField'

class ModifiedSocialAccountConfig(SocialAccountConfig):
    default_auto_field = 'django.db.models.AutoField'


# vim:ts=4:sw=4:expandtab
