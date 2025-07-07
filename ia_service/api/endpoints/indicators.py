# File: ia_service/api/endpoints/indicators.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.engine import SessionLocal
from database.models import Indicator
from api.schemas.indicators import IndicatorOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/latest", response_model=IndicatorOut)
def get_latest_indicator(symbol: str, db: Session = Depends(get_db)):
    ind = (
        db.query(Indicator)
          .filter(Indicator.symbol == symbol)
          .order_by(Indicator.timestamp.desc())
          .first()
    )
    if not ind:
        raise HTTPException(status_code=404, detail="Indicator not found")
    return ind

