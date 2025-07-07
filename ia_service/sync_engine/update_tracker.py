# File: ia_service/sync_engine/update_tracker.py

# sync_engine/update_tracker.py
from database.session import SessionLocal
from database.crud import upsert_sync_status
from utils.logger import get_logger

log = get_logger("update_tracker")

def mark_trained(symbol: str, timeframe: str):
    """Met à jour last_trained après un entraînement."""
    db = SessionLocal()
    upsert_sync_status(db, symbol, timeframe, None)
    log.info(f"Marked trained for {symbol} {timeframe}")
    db.close()
