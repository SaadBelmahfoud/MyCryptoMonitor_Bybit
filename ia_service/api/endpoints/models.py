# File: ia_service/api/endpoints/models.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.models import SyncStatus
from database.session import get_db
from utils.logger import get_logger
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()
log = get_logger("models")

class ModelStatus(BaseModel):
    symbol: str
    timeframe: str
    last_update: datetime
    last_trained: datetime
    is_active: bool

@router.get("/", response_model=List[ModelStatus], summary="Liste l'état de sync/train par paire")
def list_models(db: Session = Depends(get_db)):
    stats = db.query(SyncStatus).all()
    return [
        {
            "symbol": s.symbol,
            "timeframe": s.timeframe,
            "last_update": s.last_update,
            "last_trained": s.last_trained,
            "is_active": s.is_active
        }
        for s in stats
    ]
