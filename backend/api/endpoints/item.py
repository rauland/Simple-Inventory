from fastapi import APIRouter
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.item import ItemModel


router = APIRouter()



@router.get("/items/")
async def read_items():
    db: Session = SessionLocal()
    items = db.query(ItemModel)
    db.close()
    return items

@router.get("/items/{item_id}")
async def read_item(item_id: int):
    db: Session = SessionLocal()
    item = db.query(ItemModel).filter_by(id=item_id).first()
    db.close()
    return item
