# File: ia_service/api/endpoints/assets.py

from fastapi import APIRouter, HTTPException
from services.asset_service import get_wallet_balance
from config.settings import settings

router = APIRouter()

@router.get("/balance")
async def get_balance():
    try:
        balances = get_wallet_balance()
        return {"exchange": settings.EXCHANGE, "balances": balances}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
