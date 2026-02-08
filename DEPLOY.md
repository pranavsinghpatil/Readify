# Readify Deployment Guide

This guide will help you deploy the Readify application. The project consists of two parts:
1. **Frontend**: Next.js (Port 3000)
2. **Backend**: FastAPI (Port 8000)

## 1. Database Setup (MongoDB Atlas)
Ensure your MongoDB Atlas cluster is running and you have the connection string.
- You need to allow access from **Anywhere (0.0.0.0/0)** in Network Access.

## 2. Deploying Backend (Leapcell)
We will use **Leapcell** for the Python backend as it provides excellent generic serverless hosting for FastAPI.

1. **Push your code to GitHub**.
2. Go to [leapcell.io](https://leapcell.io) and sign up/login.
3. Click **Create Service** -> **Connect GitHub**.
4. Select your `Readify` repository.
5. **Configuration**:
   - **Runtime**: Python 3.10 (or latest)
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `python -m uvicorn backend.main:app --host 0.0.0.0 --port 8080`
   - **Port**: `8080` (Leapcell expects the app to listen on this port)
   - **Root Directory**: `.` (Leave as default, running from repo root is best for imports).
6. **Environment Variables**:
   - `LLM_PROVIDER`: `groq`
   - `GROQ_API_KEY`: (Your Groq API Key)
   - `GOOGLE_API_KEY`: (Your Google Key - needed for Embeddings!)
   - `MONGODB_URI`: (Your Atlas Connection String)
   - `DB_NAME`: `readify_db`
   - `COLLECTION_NAME`: `documents`
7. Click **Deploy**.
8. Copy the **Service Domain** (e.g., `https://readify-backend-xyz.leapcell.dev`).

## 3. Deploying Frontend (Vercel)
We use **Vercel** for the Next.js frontend.

1. Go to [vercel.com](https://vercel.com) and sign up/login.
2. **Add New...** -> **Project**.
3. Import your `Readify` repository.
4. **Framework Preset**: Next.js.
5. **Root Directory**: Select `frontend`.
6. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Paste your Leapcell Service Domain (e.g., `https://readify-backend-xyz.leapcell.dev/api`).
   - **CRITICAL**: The URL **must** end with `/api` but **must NOT** have a slash at the end. 
     - ✅ `https://your-app.leapcell.dev/api`
     - ❌ `https://your-app.leapcell.dev` (Missing `/api`)
     - ❌ `https://your-app.leapcell.dev/api/` (Extra trailing slash)
7. **Deploy**.

## 4. Final Verification
1. Open your Vercel App URL.
2. Try uploading a document.
3. If it fails, check:
   - **CORS**: Leapcell might strictly check host headers. If you get CORS errors, update `backend/main.py` -> `origins` to typically include your Vercel domain.
   - **Logs**: Check Leapcell logs for any "Module not found" errors.
   - **MongoDB Auth**: If you see `bad auth`, check that your MongoDB password does not contain special characters like `@`, `:`, or `/`. If it does, you must **URL-encode** them (e.g., `@` becomes `%40`).

## Troubleshooting
- **Import Errors on Leapcell**: If you see `Module backend not found`, ensure your Start Command is running from the repository root (not inside `backend` folder) and using `python -m uvicorn backend.main:app`.
