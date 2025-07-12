from bot_service.strategies.base import Strategy
from loguru import logger

class ScalpingStrategy(Strategy):
    def __init__(self, max_position=0.05, rsi_buy=30, rsi_sell=70, stop_loss_pct=0.02):
        super().__init__(max_position)
        self.rsi_buy = rsi_buy
        self.rsi_sell = rsi_sell
        self.stop_loss_pct = stop_loss_pct

    def generate_signal(self, indicator, current_price):
        # Utiliser la prédiction IA si disponible
        ia_signal = indicator.get("prediction", {}).get("signal")
        ia_confidence = indicator.get("prediction", {}).get("confidence", 0)
        
        if ia_signal == "buy" and ia_confidence > 0.7:
            logger.info("Scalping: BUY signal from IA")
            return {
                "type": "buy",
                "amount_usdt": 100,
                "stop_loss": current_price * (1 - self.stop_loss_pct)
            }
            
        if ia_signal == "sell" and ia_confidence > 0.7:
            logger.info("Scalping: SELL signal from IA")
            return {"type": "sell", "amount": 0.001}
        
        # Fallback à la logique RSI
        rsi = indicator.get("rsi14", 50)
        
        # Signal d'achat
        if not self.active_position and rsi < self.rsi_buy:
            logger.info("Scalping: BUY signal from RSI")
            return {
                "type": "buy",
                "amount_usdt": 100,
                "stop_loss": current_price * (1 - self.stop_loss_pct)
            }
        
        # Signal de vente
        if self.active_position and rsi > self.rsi_sell:
            logger.info("Scalping: SELL signal from RSI")
            return {"type": "sell", "amount": 0.001}
        
        return {"type": "hold"}