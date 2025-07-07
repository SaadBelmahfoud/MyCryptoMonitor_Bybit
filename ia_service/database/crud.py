# File: ia_service/database/crud.py

from sqlalchemy.orm import Session
from database.models import Base, SyncStatus
from database.models import Prediction

def init_db(db: Session):
    # Réservé à la création initiale des tables si besoin de pré-remplissage
    Base.metadata.create_all(bind=db.get_bind())

def create_tables():
    from database.engine import engine
    Base.metadata.create_all(bind=engine)

def upsert_sync_status(db: Session, symbol: str, timeframe: str, last_update, last_trained):
    status = db.query(SyncStatus).filter_by(symbol=symbol, timeframe=timeframe).first()
    if status:
        status.last_update = last_update
        status.last_trained = last_trained
    else:
        status = SyncStatus(symbol=symbol, timeframe=timeframe,
                            last_update=last_update, last_trained=last_trained)
        db.add(status)
    db.commit()

def get_latest_predictions(db: Session):
    try:
        return db.query(Prediction).order_by(Prediction.timestamp.desc()).limit(50).all()
    except Exception:
        return []