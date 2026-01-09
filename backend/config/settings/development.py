from .base import *

DEBUG = True

SECRET_KEY = "dev-secret-key-change-me"

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

#  Add your development domains here
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5177",
    "http://127.0.0.1:5177",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5177",
    "http://127.0.0.1:5177",
]

CORS_ALLOW_CREDENTIALS = False
