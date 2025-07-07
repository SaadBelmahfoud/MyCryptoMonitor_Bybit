from pydantic import BaseModel

class PredictionIn(BaseModel):
    pair: str
    timeframe: str
    data: dict

class PredictionOut(BaseModel):
    pair: str
    timeframe: str
    prediction: float
    confidence: float
