# File: ia_service/trainer/train_model.py

# ia_service/trainer/train_model.py

import time
from datetime import datetime
from sqlalchemy.orm import Session
from ia_service.database.session import SessionLocal
from ia_service.database.crud import (
    get_last_update, save_indicators,
    upsert_sync_status, save_predictions
)
from ia_service.data_fetcher.fetch_ohlcv import fetch_ohlcv
from ia_service.indicator_engine.processor import enrich_candles
from utils.logger import get_logger
from ia_service.config.settings import settings


log = get_logger("trainer")

def train_loop():
    db: Session = SessionLocal()
    symbols = [s.strip() for s in settings.WATCHED_PAIRS.split(',')]
    timeframes = [tf.strip() for tf in settings.TIMEFRAMES.split(',')]
    
    while True:
        for symbol in symbols:
            for tf in timeframes:
                try:
                    # Récupérer la dernière mise à jour
                    last_rec = db.query(SyncStatus).filter_by(symbol=symbol, timeframe=tf).first()
                    last_update = last_rec.last_update if last_rec else None
                    
                    # Calculer le since en millisecondes
                    since_ms = int(last_update.timestamp() * 1000) if last_update else None
                    
                    # Récupérer les données OHLCV
                    candles = fetch_ohlcv(symbol, tf, since_ms)
                    
                    if not candles:
                        log.warning(f"No new candles for {symbol} {tf}")
                        continue
                    
                    # Enrichir les données
                    df = enrich_candles(candles)
                    
                    # Sauvegarder les indicateurs
                    save_indicators(db, symbol, tf, df)
                    
                    if not df.empty:
                        # Mettre à jour le statut de synchronisation
                        new_last_update = df.index[-1].to_pydatetime()
                        upsert_sync_status(db, symbol, tf, new_last_update)
                        
                        # Générer des prédictions simulées
                        predictions = []
                        for index, row in df.iterrows():
                            signal = 'hold'
                            confidence = 0.5
                            
                            if row['rsi14'] < 30:
                                signal = 'buy'
                                confidence = 0.85
                            elif row['rsi14'] > 70:
                                signal = 'sell'
                                confidence = 0.75
                            
                            predictions.append({
                                "timestamp": index.to_pydatetime(),
                                "signal": signal,
                                "confidence": confidence
                            })
                        
                        # Sauvegarder les prédictions
                        save_predictions(db, symbol, tf, predictions)
                        log.info(f"Saved {len(predictions)} predictions for {symbol}/{tf}")
                
                except Exception as e:
                    log.error(f"Error processing {symbol}/{tf}: {str(e)}")
                    continue
        
        log.info(f"Training cycle complete, sleeping {settings.TRAIN_INTERVAL_S}s")
        time.sleep(settings.TRAIN_INTERVAL_S)
