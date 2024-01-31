from fastapi import APIRouter
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.item import ItemModel, Item

# Create a router object to handle requests for the "/items" endpoint
router = APIRouter()

@router.post("/items/")
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
