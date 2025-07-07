# bot_service/strategies/dca.py

from .base import Strategy
from loguru import logger

class DcaStrategy(Strategy):
    """
    DCA : achète X USDT à chaque cycle.
    """
    def generate_signal(self, ind):
        logger.info("DCA: BUY signal")
        return {"type": "buy", "amount_usdt": 50}
