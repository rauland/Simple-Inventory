# from typing import Optional
from fastapi import FastAPI
# from pydantic import BaseModel
from core.config import DATABASE_URL, CORS_URL
from sqlalchemy import create_engine, Column, Integer, String, Float, MetaData
from sqlalchemy.orm import declarative_base, Session, sessionmaker
from fastapi.middleware.cors import CORSMiddleware

from api.endpoints import item
from api.endpoints import user
from api.endpoints import root

# Create a database engine and session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a SQLAlchemy model for the "items" table
Base = declarative_base()

# Initialize the database schema
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(item.router)
app.include_router(root.router)

# Set up CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    f"http://{CORS_URL}",
    f"http://{CORS_URL}:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

