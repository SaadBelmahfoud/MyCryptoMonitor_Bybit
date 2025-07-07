# File: ia_service/config/settings.py

from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    IA_DATABASE_URL: str
    IA_DB_NAME: str
    IA_DB_USER: str
    IA_DB_PASS: str
    EXCHANGE: str
    BYBIT_API_KEY: str
    BYBIT_API_SECRET: str

    TRAIN_INTERVAL_S: int = 300
    POLL_INTERVAL_S: int = 60
    FULL_RETRAIN_EVERY: int = 86400

    FETCH_LIMIT: int = 1000
    WATCHED_PAIRS: List[str]
    TIMEFRAMES: List[str]

    IA_API_TOKEN: str
    API_EXCHANGES: List[str]
    RUN_INIT_SYNC: bool = False

    BYBIT_TESTNET: bool = False

    class Config:
        env_file = "../.env"
        case_sensitive = True

settings = Settings()
