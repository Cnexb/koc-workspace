@echo off
rem Opens the gallery with saving switched on, so the boards and review
rem decisions write straight into data/state.js.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed, so saving to the repo is unavailable.
  echo You can still open index.html directly and use the download fallback.
  pause
  exit /b 1
)
start "" http://localhost:8123/
node tools\serve.mjs
pause
