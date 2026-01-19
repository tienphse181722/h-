@echo off
echo ========================================
echo Pushing code to GitHub
echo ========================================

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Initialize git if needed
if not exist .git (
    echo Initializing git repository...
    git init
)

REM Add remote if not exists
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Adding remote repository...
    git remote add origin https://github.com/tienphse181722/h-.git
) else (
    echo Updating remote URL...
    git remote set-url origin https://github.com/tienphse181722/h-.git
)

REM Add all files
echo Adding files...
git add .

REM Commit
echo Committing changes...
git commit -m "Update: Stage2 filtering logic, harder Stage3 actions, cleanup unused server files"

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo SUCCESS! Code pushed to GitHub
    echo ========================================
) else (
    echo ========================================
    echo ERROR: Failed to push to GitHub
    echo You may need to authenticate or check your internet connection
    echo ========================================
)

pause
