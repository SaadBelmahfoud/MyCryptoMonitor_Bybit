# File: ia_service/api/endpoints/bots.py

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

class BotSummary(BaseModel):
    id: int
    name: str
    status: str
    last_updated: datetime

@router.get("/bots", response_model=List[BotSummary])
def list_bots():
    # ⚠️ Fake data de test pour permettre au frontend de fonctionner
    return [
        BotSummary(id=1, name="Bot BTC/USDT", status="active", last_updated=datetime.now()),
        BotSummary(id=2, name="Bot ETH/USDT", status="paused", last_updated=datetime.now()),
    ]