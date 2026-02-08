import os
import certifi
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

# Explicitly load .env from the backend directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

def get_mongodb_uri():
    # Try MONGODB_URI first, then MONGODB_URL (common in some platforms)
    uri = os.getenv("MONGODB_URI") or os.getenv("MONGODB_URL")
    return uri

def get_db_client():
    uri = get_mongodb_uri()
    if not uri:
        print("Error: Neither MONGODB_URI nor MONGODB_URL is set in environment.")
        return None
    
    # Hide the password in logs but show the start of the URI
    sanitized_uri = uri.split('@')[-1] if '@' in uri else "Invalid URI"
    print(f"Connecting to MongoDB Atlas cluster: ...@{sanitized_uri}")
    
    return MongoClient(uri, tlsCAFile=certifi.where())

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
