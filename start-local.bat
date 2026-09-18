@echo off
setlocal
title minimani - local preview
cd /d "%~dp0"

echo ============================================================
echo   minimani  ^|  local preview server
echo ============================================================
echo.

if not exist "node_modules\" (
  echo [!] node_modules not found - installing dependencies ^(first run only^)...
  call npm install
  if errorlevel 1 goto :fail
  echo.
)

echo [i] Starting Vite on  http://localhost:3000
echo [i] The browser will open automatically in a few seconds.
echo [i] Press Ctrl+C in this window to stop the server.
echo.

REM Give Vite time to boot before opening the browser.
start "" cmd /c "timeout /t 7 /nobreak >nul & start "" http://localhost:3000"

call npm run dev
goto :eof

:fail
echo.
echo [x] npm install failed.
echo     Make sure Node.js is installed: https://nodejs.org
echo.
pause