# File: ia_service/database/engine.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.settings import settings

engine = create_engine(settings.IA_DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    from database.models import Base
    Base.metadata.create_all(bind=engine)
