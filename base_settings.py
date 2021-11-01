import sys
from common_helpers.django.env import Env, config_email
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent

Env.DB_SCHEMES['connectdb'] = 'core.db_backend'
env = Env()
_env_path = BASE_DIR / '_env'
assert _env_path.exists(), '''
Can not find "_env" config file.
'''
Env.read_env( str( _env_path))

WSGI_APPLICATION = 'wsgi.application'

DEBUG = env.bool('DEBUG', False)
DEBUG_SQL = env.bool('DEBUG_SQL', DEBUG)

DATABASES = dict(
    default = env.db(),
)

if sys.platform.startswith('win'):
    GDAL_LIBRARY_PATH = r"C:\OSGeo4W\bin\gdal303"

SECRET_KEY = env('SECRET_KEY')

APPEND_SLASH = False

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', cast=str, default=['*'])

SERIALIZATION_MODULES = dict(json='common_helpers.django.iterative_json')

INSTALLED_APPS = [
    'django.contrib.admin.apps.SimpleAdminConfig',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'django_extensions',
    'admin.waffle_app_config.Config',  # feature flags
    'django_rq',
    'corsheaders',
    'crispy_forms',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'django_elasticsearch_dsl',
    'common_helpers.django',  # reset_db_sequences,install_crons management commands

    'allauth',
    'core.apps.ModifiedAccountConfig',
    'core.apps.ModifiedSocialAccountConfig',
    'allauth.socialaccount.providers.google',
    'dj_rest_auth',
    'dj_rest_auth.registration',

    'users',
    'vmrs',
    'core',
    'teams',
    'service_history',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'waffle.middleware.WaffleMiddleware',
]

#ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates',],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


PUBLIC_DIR = BASE_DIR / 'srv' / 'public'
STATIC_ROOT = PUBLIC_DIR / 'static'
MEDIA_ROOT = PUBLIC_DIR / 'media'
STATIC_URL = '/static/'
MEDIA_URL = '/media/'


EMAIL_SUBJECT_PREFIX = None
globals().update( config_email( env))  # includes ANYMAIL settings
if not EMAIL_SUBJECT_PREFIX:
    EMAIL_SUBJECT_PREFIX = '[Connect]'


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = []

AUTH_USER_MODEL = 'users.User'

# used by users app email templates
PROJECT_NAME = 'Fleetpal'
PROJECT_SITE_URL = env.str('PROJECT_SITE_URL', 'https://connect.fleetpal.io')
USERS_PASSWORD_RESET_URL = f'{PROJECT_SITE_URL}' + '/reset-password/{uid}/{token}'
USERS_REGISTRATION_CONFIRM_URL = f'{PROJECT_SITE_URL}' + '/registration-confirm/{key}'

# allauth config
SITE_ID = 1  # required by dj_rest_auth.registration
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 1
ACCOUNT_EMAIL_CONFIRMATION_COOLDOWN = 3*60  # seconds to prevent abuse
ACCOUNT_EMAIL_VERIFICATION = False # True for mandatory, False for optional
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = 'email'
ACCOUNT_USER_MODEL_EMAIL_FIELD = 'email'
ACCOUNT_ADAPTER = 'users.adapter.AccountAdapter'
ACCOUNT_PASSWORD_MIN_LENGTH=0
SOCIALACCOUNT_ADAPTER = 'users.adapter.SocialAccountAdapter'

SOCIALACCOUNT_PROVIDERS = dict(
    google = dict(
        APP = dict(
            client_id = '538571589624-ugva7f8j3t0vemv2040mh20mlsskbcrb.apps.googleusercontent.com',
            secret = 'Gos1CDXJXGr-s2YvIoOxkkLj',
            key = 'fleetpal_rethink',
        )
    )
)

INVITATIONS_ACCEPT_URL = f'{PROJECT_SITE_URL}' +'/invitations/accept/{token}'

redis_url = env.str('REDIS_URL') #, 'redis://localhost:6379/0')
RQ_QUEUES = {
    'default': {
        'URL': redis_url,
        'DEFAULT_TIMEOUT': 360,
    },
    'high': {
        'URL': redis_url,
        'DEFAULT_TIMEOUT': 500,
    },
    'low': {
        'URL': redis_url,
    }
}


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'localhost:9200'
    },
}
ELASTICSEARCH_DSL_AUTOSYNC = env.bool('USE_ELASTIC_SEARCH', True)

# vim:ts=4:sw=4:expandtab
