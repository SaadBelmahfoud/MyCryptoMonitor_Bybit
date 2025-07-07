#!/usr/bin/env bash
set -e

# 1) Création des tables SQLAlchemy si besoin
python - <<'PYCODE'
from database.session import engine
from database.models  import Base
Base.metadata.create_all(bind=engine)
PYCODE

# 2) Démarrage du thread de synchronisation
python - <<'PYCODE'
import threading
from sync_engine.sync_manager import start as sync_start
threading.Thread(target=sync_start, daemon=True).start()
PYCODE

# 3) Lancement de l’API FastAPI
exec uvicorn api.main:app --host 0.0.0.0 --port 8000 --log-level info
