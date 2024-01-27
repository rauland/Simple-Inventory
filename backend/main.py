from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from core.config import DATABASE_URL
from sqlalchemy import create_engine, Column, Integer, String, Float, MetaData
from sqlalchemy.orm import declarative_base, Session, sessionmaker
from fastapi.middleware.cors import CORSMiddleware

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
# Base.metadata.create_all(bind=engine)

app = FastAPI()

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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/items/")
async def create_item(item: Item):
    db_item = ItemModel(**item.dict())

    if item.tax:
        db_item.price_with_tax = item.price + item.tax

    # Use a database session to add the new item
    db = SessionLocal()
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    db.close()

    return db_item    
    
    ### OLD TAX RESPONSE METHOD
    # item_dict = item.dict()
    # if item.tax:
    #     price_with_tax = item.price + item.tax
    #     item_dict.update({"price_with_tax": price_with_tax})
    # return item_dict

@app.put("/items/{item_id}")
async def create_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.dict()}

@app.get("/")
async def root():
    return {"message": "Hello World 🚀"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}

@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}