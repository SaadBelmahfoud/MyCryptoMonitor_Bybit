# File: ia_service/database/models.py

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class SyncStatus(Base):
    __tablename__ = "sync_status"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    timeframe = Column(String, index=True)
    last_update = Column(DateTime)
    last_trained = Column(DateTime)
    is_active = Column(String, default="true")

class Indicator(Base):
    __tablename__ = "indicators"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    timeframe = Column(String, index=True)
    timestamp = Column(DateTime, index=True)
    data = Column(JSON)

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    timeframe = Column(String, index=True)
    timestamp = Column(DateTime, index=True)
    signal = Column(String)
    confidence = Column(Float)
