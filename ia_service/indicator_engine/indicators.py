# File: ia_service/indicator_engine/indicators.py

# ia_service/indicator_engine/indicators.py

"""
Calculs d'indicateurs techniques de base.
"""

import pandas as pd

def compute_ema(df: pd.DataFrame, period: int, column: str = "close") -> pd.Series:
    return df[column].ewm(span=period, adjust=False).mean()

def compute_rsi(df: pd.DataFrame, period: int = 14) -> pd.Series:
    delta = df["close"].diff()
    gain = delta.clip(lower=0).rolling(period).mean()
    loss = -delta.clip(upper=0).rolling(period).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))
