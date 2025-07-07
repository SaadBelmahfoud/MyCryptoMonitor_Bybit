# File: ia_service/services/trainer.py

import time
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from database.models import Base, ModelPerformance
from config import settings

# Ici, tu implémenterais ton modèle ML réel.
# Pour l’exemple, on simule un calcul de "performance" aléatoire.
import random

def train_loop():
    # Assure-toi que la table existe
    Base.metadata.create_all(bind=engine)

    while True:
        perf = random.random()  # simulate performance metric
        db: Session = SessionLocal()
        mp = ModelPerformance(metric="simulated_accuracy", value=perf)
        db.add(mp)
        db.commit()
        db.close()
        print(f"[Trainer] New performance: {perf:.4f}")
        time.sleep(settings.TRAIN_INTERVAL_S)
