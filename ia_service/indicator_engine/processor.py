# File: ia_service/indicator_engine/processor.py

# ia_service/indicator_engine/processor.py

import pandas as pd
from ia_service.indicator_engine.indicators import compute_ema, compute_rsi
from utils.logger import get_logger

log = get_logger("processor")

def enrich_candles(ohlcv: list[list]) -> pd.DataFrame:
    """
    Transforme la liste OHLCV en DataFrame, calcule EMA/RSI, dropna, et logge la forme.
    """
    df = pd.DataFrame(ohlcv, columns=["ts","open","high","low","close","volume"])
    df["datetime"] = pd.to_datetime(df["ts"], unit="ms")
    df.set_index("datetime", inplace=True)
    df["ema20"] = compute_ema(df, 20)
    df["ema50"] = compute_ema(df, 50)
    df["rsi14"] = compute_rsi(df, 14)
    df = df.dropna()
    log.info(f"Enriched DataFrame shape: {df.shape}")
    return df
