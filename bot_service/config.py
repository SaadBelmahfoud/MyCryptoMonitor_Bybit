import os
import sys
from dotenv import load_dotenv
import importlib
import inspect

# 🔧 Correction IMPORT MODULE en Docker/hors-racine
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))

load_dotenv()

# ————————————————————————————
# 🔐 API KEYS & ACCESS
# ————————————————————————————
BYBIT_API_KEY = os.getenv("BYBIT_API_KEY")
BYBIT_API_SECRET = os.getenv("BYBIT_API_SECRET")
BYBIT_TESTNET = os.getenv("BYBIT_TESTNET", "False").lower() == "false"

# ————————————————————————————
# ⚙️ PARAMS & STRATEGIES
# ————————————————————————————
STRATEGIES_NAMES = [s.strip() for s in os.getenv("STRATEGIES", "dca,scalping").split(",")]

def find_strategy_class(module):
    """Retourne la première classe qui hérite de Strategy et n'est pas Strategy elle-même."""
    from bot_service.strategies.base import Strategy
    for name, obj in inspect.getmembers(module, inspect.isclass):
        if issubclass(obj, Strategy) and obj is not Strategy:
            return obj
    return None

STRATEGIES = []
for strat_name in STRATEGIES_NAMES:
    module_path = f"bot_service.strategies.{strat_name}"
    try:
        mod = importlib.import_module(module_path)
        strategy_class = find_strategy_class(mod)
        if strategy_class:
            STRATEGIES.append(strategy_class)
    except Exception as e:
        print(f"[ERREUR IMPORT STRATEGIE {strat_name}] : {e}")

# ————————————————————————————
# ⏱️ Fréquence des vérifications
# ————————————————————————————
POLL_INTERVAL_S = int(os.getenv("POLL_INTERVAL_S", 60))

# ————————————————————————————
# ⏱️ DATABASE
# ————————————————————————————
BOT_DB_NAME=os.getenv("BOT_DB_NAME")
BOT_DATABASE_URL=os.getenv("BOT_DATABASE_URL")
BOT_DB_USER=os.getenv("BOT_DB_USER")
BOT_DB_PASS=os.getenv("BOT_DB_PASS")
# ————————————————————————————
# 🧠 API de l'IA
# ————————————————————————————
IA_API_URL = os.getenv("IA_API_URL")
IA_API_TOKEN = os.getenv("IA_API_TOKEN")

# ————————————————————————————
# 📈 EXCHANGE Unique
# ————————————————————————————
EXCHANGE = os.getenv("EXCHANGE", "bybit") 
