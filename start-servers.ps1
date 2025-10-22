# AI Resume Analyzer - Startup Script
# ====================================
# This script helps you start all three servers at once
# Run this in PowerShell after completing setup

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "AI Resume Analyzer - Server Startup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path ".\frontend") -or -not (Test-Path ".\backend") -or -not (Test-Path ".\ai-model")) {
    Write-Host "ERROR: Please run this script from the project root directory" -ForegroundColor Red
    Write-Host "Expected folders: frontend, backend, ai-model`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting servers in separate windows...`n" -ForegroundColor Green

# Start Python AI API
Write-Host "[1/3] Starting Python AI API (port 5001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai-model; .\venv\Scripts\activate; Write-Host 'Python AI API Server' -ForegroundColor Cyan; python api.py"

Start-Sleep -Seconds 2

# Start Node.js Backend
Write-Host "[2/3] Starting Node.js Backend (port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host 'Node.js Backend Server' -ForegroundColor Cyan; npm start"

Start-Sleep -Seconds 2

# Start React Frontend
Write-Host "[3/3] Starting React Frontend (port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; Write-Host 'React Frontend Development Server' -ForegroundColor Cyan; npm run dev"

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "All servers starting!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Wait 10-15 seconds for all servers to start, then:" -ForegroundColor Cyan
Write-Host "  • Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  • Backend: http://localhost:5000" -ForegroundColor White
Write-Host "  • AI API: http://localhost:5001`n" -ForegroundColor White

Write-Host "To stop servers: Close all terminal windows`n" -ForegroundColor Yellow

# Keep this window open
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
