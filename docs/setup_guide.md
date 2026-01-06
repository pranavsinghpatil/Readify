# MongoDB Atlas Setup Guide

This guide ensures your database is ready for Vector Search.

## Prerequisite: Account & Cluster
1.  **Log in** to [MongoDB Atlas](https://cloud.mongodb.com/).
2.  **Create a Cluster** (The free "M0 Sandbox" works perfectly).
3.  **Create a User**: Go to "Database Access", create a user (e.g., `admin`) and password. **Save these!**
4.  **Network Access**: Go to "Network Access", click "Add IP Address", and select **"Allow Access from Anywhere"** (0.0.0.0/0).

## Step 1: Get Connection String
1.  Click **"Connect"** on your Cluster.
2.  Choose **"Drivers"** -> **"Python"**.
3.  Copy the connection string.
4.  Paste it into `backend/.env` as `MONGODB_URI`.
    - *Example*: `mongodb+srv://admin:password@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

## Step 2: Create Database & Collection
1.  Go to **"Browse Collections"**.
2.  Click **"Create Database"**.
3.  **Database Name**: `readify_db`
4.  **Collection Name**: `documents`
5.  Click Create.

## Step 3: Create Vector Search Index (CRITICAL)
**Note**: MongoDB has two index types. If one JSON fails, try the other.

### Option A: The "Atlas Search" Editor (Most Common)
If you are in the standard "Search" tab and see a "JSON Editor".

**For Gemini (768 dimensions):**
```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "dimensions": 768,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
```

**For OpenAI (1536 dimensions):**
```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "dimensions": 1536,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
```

### Option B: The "Vector Search" Editor (Newer)
Only use this if you specifically selected "Vector Search" (not regular Search) in the left sidebar.

**For Gemini (768 dimensions):**
```json
{
  "fields": [
    {
      "numDimensions": 768,
      "path": "embedding",
      "similarity": "cosine",
      "type": "vector"
    }
  ]
}
```

**For OpenAI (1536 dimensions):**
```json
{
  "fields": [
    {
      "numDimensions": 1536,
      "path": "embedding",
      "similarity": "cosine",
      "type": "vector"
    }
  ]
}
```

## Troubleshooting
- **Error: "Property fields is not allowed"**: You are in the Standard Search editor but using Vector Search syntax. Use **Option A** JSON.
- **Error: "Dimension mismatch"**: You are using Gemini (768) but created an OpenAI index (1536), or vice-versa.
