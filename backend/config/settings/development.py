
from .base import *

DEBUG = True

SECRET_KEY = "dev-secret-key-change-me"

# En local, on autorise tous les hôtes
ALLOWED_HOSTS = []


# =========================
# BASE DE DONNÉES (SQLite)
# =========================

# En développement, on utilise SQLite
# La base de données est un simple fichier db.sqlite3
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# =========================
# CORS (Frontend local)
# =========================

# Autorise le frontend local (Vite / React)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
