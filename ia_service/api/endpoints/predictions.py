# --- File: ia_service/api/endpoints/predictions.py ---

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.session import get_db
from database import crud
from api.schemas import predictions as schemas

router = APIRouter()

@router.get("/", response_model=list[schemas.PredictionOut])
def list_predictions(db: Session = Depends(get_db)):
    try:
        return crud.get_latest_predictions(db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des prédictions")


