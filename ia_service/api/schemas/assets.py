from pydantic import BaseModel
from typing import Dict

class WalletBalanceResponse(BaseModel):
    exchange: str
    balances: Dict[str, float]
