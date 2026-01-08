

from .base import *
import os
import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration


# =========================
# MODE PRODUCTION
# =========================

# En production, DEBUG doit TOUJOURS être à False
DEBUG = False


# =========================
# SÉCURITÉ
# =========================

# Clé secrète Django (OBLIGATOIRE en production)
# Elle doit être définie sur la plateforme de déploiement (Render / Railway)
SECRET_KEY = os.environ.get("SECRET_KEY", "")

# Hôtes autorisés (domaines autorisés à accéder à l'API)
# Exemple de variable d'environnement :
# ALLOWED_HOSTS=mon-api.onrender.com
ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ.get("ALLOWED_HOSTS", "").split(",")
    if host.strip()
]


# =========================
# BASE DE DONNÉES (PostgreSQL)
# =========================

# En production, on utilise PostgreSQL via DATABASE_URL
# Exemple :
# DATABASE_URL=postgres://user:password@host:5432/dbname
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL", ""),
        conn_max_age=600,
        ssl_require=True,
    )
}


# =========================
# CORS (Frontend ↔ Backend)
# =========================

# Autorise les requêtes venant du frontend (Vercel / Netlify)
# Exemple :
# CORS_ALLOWED_ORIGINS=https://todo.vercel.app
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

# Recommandé pour éviter les erreurs CSRF en production
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CSRF_TRUSTED_ORIGINS", "").split(",")
    if origin.strip()
]


# =========================
# SENTRY (Monitoring des erreurs)
# =========================

# DSN fourni par Sentry (optionnel mais requis pour l'examen)
SENTRY_DSN = os.environ.get("SENTRY_DSN", "")

# Initialisation de Sentry uniquement si la clé est définie
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration()],
        traces_sample_rate=0.1,
        send_default_pii=False,
    )
