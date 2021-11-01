from base_settings import *

MIDDLEWARE += [
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'admin.urls'
LOGIN_REDIRECT_URL = '/'

# vim:ts=4:sw=4:expandtab
