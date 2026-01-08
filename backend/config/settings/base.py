from pathlib import Path
import os

# =========================
# BASE DIR
# =========================
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# =========================
# APPLICATIONS
# =========================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",

    # Local apps
    "todo",
]


# =========================
# MIDDLEWARE
# =========================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# =========================
# URL / WSGI
# =========================
ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# =========================
# TEMPLATES
# =========================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# =========================
# DATABASE
# (在 development.py / production.py 中配置)
# =========================
DATABASES = {}


# =========================
# PASSWORD VALIDATION
# =========================
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# =========================
# INTERNATIONALIZATION
# =========================
LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True
USE_TZ = True


# =========================
# STATIC FILES (Whitenoise)
# =========================
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# =========================
# DEFAULT PRIMARY KEY
# =========================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# =========================
# DJANGO REST FRAMEWORK
# =========================
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
}


# =========================
# CORS (默认开发配置，生产用环境变量覆盖)
# =========================
CORS_ALLOW_CREDENTIALS = True

# 给本地开发用，生产环境会在 production.py 中覆盖
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
