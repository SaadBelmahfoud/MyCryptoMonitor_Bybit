#--- File: ia_service/services/asset_service.py ---

import time
import hashlib
import hmac
import requests
from config.settings import settings

def get_wallet_balance():
    try:
        timestamp = str(int(time.time() * 1000))
        recv_window = "5000"
        account_type = "UNIFIED"
        base_url = "https://api-testnet.bybit.com" if settings.BYBIT_TESTNET else "https://api.bybit.com"
        endpoint = "/v5/account/wallet-balance"
        url = base_url + endpoint

        payload_str = f"{timestamp}{settings.BYBIT_API_KEY}{recv_window}accountType={account_type}"
        signature = hmac.new(
            settings.BYBIT_API_SECRET.encode(),
            payload_str.encode(),
            hashlib.sha256
        ).hexdigest()

        headers = {
            "X-BAPI-API-KEY": settings.BYBIT_API_KEY,
            "X-BAPI-SIGN": signature,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-RECV-WINDOW": recv_window,
            "X-BAPI-SIGN-TYPE": "2",
            "Content-Type": "application/json"
        }

        params = {"accountType": account_type}
        resp = requests.get(url, headers=headers, params=params)
        resp.raise_for_status()
        data = resp.json()

        if data.get("retCode") != 0:
            return {"exchange": "bybit", "error": f"Bybit error {data['retCode']}: {data.get('retMsg')}"}

        balances = {}
        for acct in data["result"].get("list", []):
            if acct.get("accountType") != account_type:
                continue
            for coin in acct.get("coin", []):
                try:
                    total = float(coin.get("walletBalance", 0))
                    usdv = float(coin.get("usdValue", 0))
                except (ValueError, TypeError):
                    total = 0.0
                    usdv = 0.0
                balances[coin["coin"]] = {
                    "total": total,
                    "usdValue": usdv
                }

        return {
            "exchange": "bybit",
            "balances": {
                "balances": {
                    "parsed_balances": {
                        account_type: balances
                    }
                }
            }
        }

    except Exception as e:
        return {
            "exchange": "bybit",
            "balances": {"error": str(e)}
        }
