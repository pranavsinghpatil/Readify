from pymongo import MongoClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Explicitly load .env from the backend directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

def get_mongodb_uri():
    uri = os.getenv("MONGODB_URI")
    if not uri:
        # Fallback to check if it's set after imports
        print("Warning: MONGODB_URI not found in initial environment fetch. Retrying...")
    return uri

def get_db_client():
    uri = get_mongodb_uri()
    if not uri:
        print("Error: MONGODB_URI is still not set. Current env keys:", list(os.environ.keys()))
        return None
    return MongoClient(uri)

def get_collection():
    client = get_db_client()
    if not client:
        return None
    db_name = os.getenv("DB_NAME", "readify_db")
    collection_name = os.getenv("COLLECTION_NAME", "documents")
    db = client[db_name]
    return db[collection_name]

def test_connection():
    try:
        client = get_db_client()
        if client:
            client.admin.command('ping')
            print("yes//// MongoDB Connection Successful")
            return True
    except Exception as e:
        print(f"!!!!! MongoDB Connection Failed: {e}")
        return False
