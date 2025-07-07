# File: bot_service/database.py

from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

from config import BOT_DATABASE_URL

engine = create_engine(BOT_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    side = Column(String)
    price = Column(Float)
    quantity = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)
