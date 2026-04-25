import os 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv


# Load the .env into environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Database_URL is not set")


# Engine = manage DB connection (uses the psycopg2)

engine = create_engine(
    DATABASE_URL, 
    pool_pre_ping = True
    
)

SessionLocal = sessionmaker(
    autocommit= False,
    autoflush=False,
    bind=engine
)


# Base = Parent class for ORM models

Base = declarative_base()

# FastAPI Dependency 

def get_db():
    db = SessionLocal()
    try: 
        yield db 
    finally:
        db.close()
        
        