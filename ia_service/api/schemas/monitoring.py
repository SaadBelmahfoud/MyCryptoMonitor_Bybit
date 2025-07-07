from pydantic import BaseModel
from datetime import datetime

class MonitoringRecord(BaseModel):
    timestamp: datetime
    event: str
    detail: str
