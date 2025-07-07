# File: ia_service/services/asset_service.py

import time
import hashlib
import hmac
import requests
from config.settings import settings

def get_wallet_balance():
    try:
        timestamp = str(int(time.time() * 1000))
        recv_window = "5000"
        base_url = "https://api-testnet.bybit.com" if settings.BYBIT_TESTNET else "https://api.bybit.com"
        endpoint = "/v5/account/wallet-balance"
        url = base_url + endpoint

        params = {
            "api_key": settings.BYBIT_API_KEY,
            "timestamp": timestamp,
            "recv_window": recv_window
        }

        # Générer la signature
        sorted_params = sorted(params.items())
        query_string = "&".join(f"{k}={v}" for k, v in sorted_params)
        signature = hmac.new(
            settings.BYBIT_API_SECRET.encode("utf-8"),
            query_string.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

        headers = {
            "X-BYBIT-SIGNATURE": signature
        }

        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()

        return {
            "exchange": "bybit",
            "balances": data.get("result", {}).get("list", [])
        }

    except Exception as e:
        return {"error": str(e)}
