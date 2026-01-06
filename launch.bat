@echo off
echo ===================================================
echo           Readify - Document QA Assistant
echo ===================================================

echo.
echo [1/2] Starting Backend Server (FastAPI)...
echo ------------------------------------------
start "Readify Backend" cmd /k "uvicorn backend.main:app --reload"

echo.
echo [2/2] Starting Frontend Server (Next.js)...
echo -------------------------------------------
start "Readify Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo Success! The application is starting up.
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000/docs
echo.
pause
