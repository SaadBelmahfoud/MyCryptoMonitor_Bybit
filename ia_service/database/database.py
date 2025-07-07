# ✅ Corrigé - File: ia_service/database/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.settings import settings

# ✅ Création du moteur à partir de l’URL stockée dans la configuration
engine = create_engine(settings.IA_DATABASE_URL, future=True)

# ✅ Session locale utilisée dans les endpoints
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
