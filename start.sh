#!/usr/bin/env bash

# AgentShield Enterprise Launcher for Linux / macOS
set -e

echo "========================================================================="
echo "   AGENTSHIELD: SOVEREIGN FINOPS & SPENDING FIREWALL FOR AI AGENTS"
echo "========================================================================="
echo " [PayPal AI Hackathon 2026] | Track: Agentic Commerce & AG Grid Enterprise"
echo "========================================================================="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check dependencies
command -v python3 >/dev/null 2>&1 || { echo "[ERROR] Python 3 required but not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "[ERROR] Node.js required but not installed."; exit 1; }

# 1. Start Backend
echo "[*] Launching Backend (FastAPI on Port 8000)..."
cd "$DIR/backend"
if [ ! -d "venv" ]; then
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 2. Start Frontend
echo "[*] Launching Frontend (Next.js 14 on Port 3000)..."
cd "$DIR/frontend"
if [ ! -d "node_modules" ]; then
    npm install
fi

npm run dev &
FRONTEND_PID=$!

echo "========================================================================="
echo " [SUCCESS] All AgentShield services are online!"
echo " - Backend API: http://localhost:8000/docs"
echo " - AG Grid UI:  http://localhost:3000"
echo "========================================================================="

# Trap cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
