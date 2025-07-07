import requests
import time
from config.settings import settings

def fetch_ohlcv(symbol="BTCUSDT", interval="1h", limit=200):
    base_url = "https://api-testnet.bybit.com" if settings.BYBIT_TESTNET else "https://api.bybit.com"
    endpoint = "/v5/market/kline"
    url = f"{base_url}{endpoint}"

    params = {
        "category": "spot",
        "symbol": symbol,
        "interval": interval,
        "limit": str(limit)
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("result", {}).get("list", [])
    except Exception as e:
        raise RuntimeError(f"Failed to fetch OHLCV for {symbol}: {e}")