# Root Dockerfile for Monorepo Deployment
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements from the backend folder
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual backend code
COPY backend/ ./backend/

# Set Python Path so 'backend.main' can be found
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Leapcell typically expects port 8080
EXPOSE 8080

# Command to run the app
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
