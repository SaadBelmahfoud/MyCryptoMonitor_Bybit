import sys
import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

# ✅ Ajout pour garantir que les imports fonctionnent même en mode Docker
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from api.endpoints import (
    status,
    indicators,
    predictions,
    monitoring,
    assets,
    bots,
)

app = FastAPI(
    title="IA Service",
    description="Service IA pour prédictions et monitoring de bots de trading",
    version="1.0.0",
)

# ✅ Middleware CORS (ouvert pour dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Inclusion des routers sous un APIRouter global avec préfixe /api
api_router = APIRouter(prefix="/api")
print("✅ API router monté avec /api/")

# 🔁 Maintenant, on monte les routes **dans api_router** (et plus dans app directement)
api_router.include_router(status.router, prefix="/status", tags=["Status"])
api_router.include_router(indicators.router, prefix="/indicators", tags=["Indicators"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
api_router.include_router(monitoring.router, prefix="/monitoring", tags=["Monitoring"])
api_router.include_router(assets.router, prefix="/assets", tags=["Assets"])
api_router.include_router(bots.router, tags=["Bots"]) 

# ✅ Enfin, on monte le routeur global dans app
app.include_router(api_router)

# ✅ Initialisation automatique des tables si elles n'existent pas encore
try:
    from sync_engine.initial_bootstrap import initialize_service
    initialize_service()
except Exception as e:
    print("⚠️ Erreur lors de l'initialisation automatique :", e)