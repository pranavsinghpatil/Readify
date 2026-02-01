# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app/backend
# We do this to preserve the 'backend.main' module structure expected by the code
COPY . /app/backend/

# Set PYTHONPATH to include /app so 'backend' module is found
ENV PYTHONPATH=/app

# Expose port 8000
EXPOSE 8000

# Run the application
# We listen on 0.0.0.0 because we are inside a container
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
