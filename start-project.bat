@echo off
echo ===================================================
echo     Starting ShopEase E-commerce Store
echo ===================================================
echo.

echo [1/2] Starting Backend Server (Port 3000)...
start "ShopEase Backend" cmd /k "cd backend && npm start"

echo [2/2] Starting Frontend Server (Port 5500)...
start "ShopEase Frontend" cmd /k "cd frontend && npx serve -p 5500"

echo.
echo ===================================================
echo Success! Both servers are starting in new windows.
echo.
echo Please wait about 5 seconds for them to load, then
echo open your web browser and go to:
echo.
echo http://localhost:5500
echo ===================================================
echo.
pause
