# File: ia_service/init_data.py

from database.session import SessionLocal
from database.models import Prediction
from datetime import datetime, timedelta
import random

def init_predictions():
    db = SessionLocal()
    
    # Supprimer les anciennes données
    db.query(Prediction).delete()
    
    # Générer des données de démonstration réalistes
    symbols = ["BTC/USDT", "ETH/USDT"]
    timeframes = ["5m", "15m", "1h"]
    
    for symbol in symbols:
        for timeframe in timeframes:
            for i in range(50):
                timestamp = datetime.utcnow() - timedelta(minutes=i*5)
                signal = random.choice(["buy", "sell", "hold"])
                confidence = random.uniform(0.7, 0.95) if signal != "hold" else random.uniform(0.4, 0.6)
                
                prediction = Prediction(
                    symbol=symbol,
                    timeframe=timeframe,
                    timestamp=timestamp,
                    signal=signal,
                    confidence=confidence
                )
                db.add(prediction)
    
    db.commit()
    print(f"✅ {db.query(Prediction).count()} prédictions initialisées")

if __name__ == "__main__":
    init_predictions()
