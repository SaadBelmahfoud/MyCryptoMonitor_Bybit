# File: ia_service/database/schemas.py

# ia_service/database/schemas.py
from pydantic import BaseModel
from datetime import datetime

class SyncStatusOut(BaseModel):
    id: int
    symbol: str
    timeframe: str
    last_update: datetime
    last_trained: datetime | None
    is_active: bool
    class Config:
        orm_mode = True

class IndicatorOut(BaseModel):
    id: int
    symbol: str
    timeframe: str
    timestamp: datetime
    ema20: float
    ema50: float
    rsi14: float
    class Config:
        orm_mode = True

class PredictionOut(BaseModel):
    id: int
    symbol: str
    timeframe: str
    timestamp: datetime
    signal: str
    confidence: float
    class Config:
        orm_mode = True
