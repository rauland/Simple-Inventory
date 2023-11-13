import os
from dotenv import load_dotenv

from pathlib import Path
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Settings:
    Project_Name: str = "Inventory System"
    Project_Version: str = "1.0.0"

    Postgres_User: str = os.getenv("POSTGRES_USER")
    Postgres_Password = os.getenv("POSTGRES_PASSWORD")
    Postgres_Server: str = os.getenv("POSTGRES_SERVER", "localhost")
    Postgres_Port: str = os.getenv("POSTGRES_PORT", 5432) # default postgres port is 5432
    Postgres_DB: str = os.getenv("POSTGRES_DB", "tdd")
    Database_URL = f"postgresql://{Postgres_User}:{Postgres_Password}@{Postgres_Server}:{Postgres_Port}/{Postgres_DB}"

settings = Settings()