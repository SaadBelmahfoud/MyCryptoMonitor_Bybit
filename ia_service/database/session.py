# File: ia_service/database/session.py

# ia_service/database/session.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.settings import settings

engine = create_engine(settings.IA_DATABASE_URL, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
