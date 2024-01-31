from sqlalchemy import Column, Integer, String, Float
from db.session import Base
from typing import Optional
from pydantic import BaseModel

class ItemModel(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    tax = Column(Float)
    price_with_tax = Column(Float)

# Pydantic model for input validation
class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None