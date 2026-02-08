import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env first before any local imports
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import ingest, chat
from backend.database import test_connection
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    test_connection()
    yield
    # Shutdown

app = FastAPI(title="Readify API", version="1.0.0", lifespan=lifespan)

# CORS
origins = ["http://localhost:3000", "http://localhost:8000", "*"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router, prefix="/api", tags=["Ingestion"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])

@app.get("/")
async def root():
    return {"message": "Readify Backend Running"}

@app.get("/kaithhealthcheck")
@app.get("/health")
async def health():
    return {"status": "ok", "message": "Backend is healthy"}
