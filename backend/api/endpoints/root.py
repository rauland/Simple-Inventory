from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/")
async def root():
    current_date = datetime.now()
    date_string = current_date.strftime("%Y-%m-%d")
    return {"current_date": date_string}