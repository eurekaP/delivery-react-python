from base_settings import *

ROOT_URLCONF = 'api.urls'


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        #'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'EXCEPTION_HANDLER': 'api.views.exception_handler',
}
SESSION_EXPIRE_AT_BROWSER_CLOSE=True


MIDDLEWARE = [
    'common_helpers.django.disable_csrf.DisableCSRF',
    'corsheaders.middleware.CorsMiddleware',
] + MIDDLEWARE


CORS_ORIGIN_ALLOW_ALL = env.bool('CORS_ORIGIN_ALLOW_ALL', False)
CORS_ALLOW_CREDENTIALS = env.bool('CORS_ALLOW_CREDENTIALS', True)
CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST', cast=str, default=[])

# vim:ts=4:sw=4:expandtab
