from pydantic import BaseModel
from typing import List

class IndicatorOut(BaseModel):
    pair: str
    timeframe: str
    value: float
    indicator_type: str
