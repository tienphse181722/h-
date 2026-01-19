@echo off
echo ========================================
echo DEPLOY TO VERCEL
echo ========================================
echo.

REM Check if vercel is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Vercel CLI is not installed!
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo Vercel CLI is ready!
echo.
echo ========================================
echo STEP 1: Login to Vercel
echo ========================================
echo.
echo Please login to Vercel in your browser...
call vercel login

echo.
echo ========================================
echo STEP 2: Deploy to Production
echo ========================================
echo.
echo Deploying from client folder...
cd client
call vercel --prod

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app should now be live on Vercel!
echo Check the URL above to access your app.
echo.

pause
