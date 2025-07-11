from .base_settings import *

from decouple import config


DEBUG = False

SECRET_KEY = config('SECRET_KEY')

#TODO
ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = []

# Database config
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
        "ATOMIC_REQUESTS": True,
    }
}

INSTALLED_APPS += []

# Log config
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': './logs/erros.log',
            'maxBytes': 5 * 1024 * 1024,
            'backupCount': 5, 
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': False,
        },
        'skyCarManager': {
            'handlers': ['file', 'console'],
            'level': 'ERROR', 
            'propagate': False,
        },
    },
}
