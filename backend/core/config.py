import os
from dotenv import load_dotenv

env_path = '.env'
print(env_path)
load_dotenv(dotenv_path=env_path)

from sqlalchemy.engine import URL

username: str = os.getenv("POSTGRES_USER")
password: str = os.getenv("POSTGRES_PASSWORD")
host= os.getenv("POSTGRES_SERVER")
database= os.getenv("POSTGRES_DB")

print(username)
print(host)
print(database)

url_object = URL.create(
    "postgresql",
    username=username,
    password=password,
    host=host,
    database=database,
)

DATABASE_URL = url_object
CORS_URL = os.getenv("CORS_URL")