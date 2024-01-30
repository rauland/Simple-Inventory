from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from core.config import DATABASE_URL
from sqlalchemy import create_engine, Column, Integer, String, Float, MetaData
from sqlalchemy.orm import declarative_base, Session, sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from api.endpoints import item
from api.endpoints import user

# Create a database engine and session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a SQLAlchemy model for the "items" table
Base = declarative_base()

class ItemModel(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    tax = Column(Float)
    price_with_tax = Column(Float)

# Initialize the database schema
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(item.router)

# Pydantic model for input validation
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

# Set up CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",  # Update with the actual address of your frontend
    "http://192.168.0.2",
    "http://192.168.0.2:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    current_date = datetime.now()
    date_string = current_date.strftime("%Y-%m-%d")
    return {"current_date": date_string}


