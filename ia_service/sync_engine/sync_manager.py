# File: ia_service/sync_engine/sync_manager.py

# ia_service/sync_engine/sync_manager.py
from utils.logger import get_logger
from sync_engine.initial_bootstrap import run as bootstrap
from trainer.train_model import train_loop

log = get_logger("sync_manager")

def start():
    log.info("🔄 Starting sync manager")
    bootstrap()
    train_loop()
