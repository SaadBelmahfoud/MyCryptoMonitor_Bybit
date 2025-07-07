# File: ia_service/api/endpoints/monitoring.py

from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat()
    }
