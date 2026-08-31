@echo off
title Kartar Sports and Toys House - Retail & Admin Manager
echo ========================================================
echo   Starting Kartar Sports Physical File Database Server...
echo ========================================================
echo.

powershell -ExecutionPolicy Bypass -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -File \"\"%~dp0server.ps1\"\"' -WindowStyle Hidden"

timeout /t 2 /nobreak >nul
start "" "http://localhost:3001/index.html"
exit
