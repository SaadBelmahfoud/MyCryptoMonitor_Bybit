import time
import importlib
from datetime import datetime
import requests
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base

from database import engine, SessionLocal
from config import (
    BYBIT_API_KEY,
    BYBIT_API_SECRET,
    STRATEGIES,
    IA_API_URL,
    POLL_INTERVAL_S,
    IA_API_TOKEN,
    BYBIT_TESTNET,
)
from loguru import logger
import hmac
import hashlib

Base = declarative_base()

class Trade(Base):
    __tablename__ = "trades"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String)
    side = Column(String)
    price = Column(Float)
    quantity = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def generate_signature(api_key, api_secret, recv_window, timestamp, query_string=""):
    param_str = f"{timestamp}{api_key}{recv_window}{query_string}"
    return hmac.new(
        bytes(api_secret, "utf-8"),
        param_str.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

def get_latest_indicator(symbol: str):
    try:
        response = requests.get(
            f"{IA_API_URL}/api/indicators/latest?symbol={symbol}",
            headers={"Authorization": f"Bearer {IA_API_TOKEN}"},
            timeout=5,
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"IA API error: {e}")
        return None

def place_order(symbol: str, side: str, quantity: float):
    base_url = "https://api.bybit.com" if not BYBIT_TESTNET else "https://api-testnet.bybit.com"
    endpoint = "/v5/order/create"
    url = base_url + endpoint
    recv_window = "5000"
    timestamp = str(int(time.time() * 1000))
    order = {
        "category": "linear",
        "symbol": symbol.replace("/", ""),
        "side": side.upper(),
        "orderType": "Market",
        "qty": str(quantity),
        "timeInForce": "GoodTillCancel",
    }
    query_string = '&'.join([f"{key}={value}" for key, value in order.items()])
    signature = generate_signature(BYBIT_API_KEY, BYBIT_API_SECRET, recv_window, timestamp, query_string)

    headers = {
        "X-BAPI-API-KEY": BYBIT_API_KEY,
        "X-BAPI-TIMESTAMP": timestamp,
        "X-BAPI-SIGN": signature,
        "X-BAPI-RECV-WINDOW": recv_window,
        "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=order)
    logger.debug(f"Order response: {response.status_code} {response.text}")
    return response.ok

def load_strategies():
    strategies = []
    for strat_path in STRATEGIES:
        module = importlib.import_module(strat_path)
        strategy_class = getattr(module, "Strategy")
        strategies.append(strategy_class())
        logger.success(f"Strategy loaded: {strategy_class.__name__}")
    logger.info(f"Loaded {len(strategies)} strategies")
    return strategies

def run_bot():
    db = SessionLocal()
    strategies = load_strategies()
    symbols = set([s.symbol for s in strategies])

    while True:
        for strat in strategies:
            symbol = strat.symbol
            indicator = get_latest_indicator(symbol)
            if not indicator:
                logger.warning(f"No indicator available for {symbol}")
                continue

            signal = strat.generate_signal(indicator)
            logger.info(f"{symbol} - Signal: {signal}")

            if signal in ["buy", "sell"]:
                placed = place_order(symbol, signal, strat.quantity)
                if placed:
                    trade = Trade(symbol=symbol, side=signal, price=0, quantity=strat.quantity)
                    db.add(trade)
                    db.commit()
                    logger.success(f"{signal.upper()} order placed for {symbol}")
                else:
                    logger.error(f"Failed to place {signal} order for {symbol}")
        time.sleep(POLL_INTERVAL_S)

if __name__ == "__main__":
    logger.info("🔵 Bot service started")
    run_bot()