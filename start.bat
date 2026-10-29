@echo off
setlocal enabledelayedexpansion

title AgentShield Enterprise Launcher
color 0B

echo =========================================================================
echo    AGENTSHIELD: SOVEREIGN FINOPS & SPENDING FIREWALL FOR AI AGENTS
echo =========================================================================
echo  [PayPal AI Hackathon 2026] | Track: Agentic Commerce ^& AG Grid Enterprise
echo =========================================================================
echo.

:: 1. Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python 3.10+ is required but not found in PATH.
    pause
    exit /b 1
)

:: 2. Check Node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js 18+ is required but not found in PATH.
    pause
    exit /b 1
)

echo [*] Initializing AgentShield Services...
echo.

:: 3. Setup and Launch Backend (FastAPI on Port 8000)
echo [*] Starting Backend Engine (FastAPI) on http://localhost:8000...
cd /d "%~dp0backend"
if not exist "venv" (
    echo [*] Creating Python virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

start "AgentShield Backend [Port 8000]" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

:: 4. Setup and Launch Frontend (Next.js on Port 3000)
echo [*] Starting Frontend Cockpit (Next.js 14 + AG Grid) on http://localhost:3000...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo [*] Installing frontend npm dependencies...
    call npm install
)

start "AgentShield Frontend [Port 3000]" cmd /k "npm run dev"

:: 5. Open Browser
echo.
echo =========================================================================
echo  [SUCCESS] All AgentShield microservices launched!
echo  - Backend API & Docs: http://localhost:8000/docs
echo  - AG Grid Console UI: http://localhost:3000
echo =========================================================================
echo.
echo [*] Opening default web browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo Press any key to close this launcher window (services will stay running).
pause >nul
