@echo off
REM Script Batch pour lancer le Portfolio en local
REM Auteur: Assistant IA
REM Description: Vérifie les dépendances et lance le serveur de développement

echo.
echo 🚀 Script de lancement du Portfolio
echo =================================
echo.

REM Vérification de Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé ou pas dans le PATH
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Vérification de npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm n'est pas installé ou pas dans le PATH
    pause
    exit /b 1
)

echo ✅ Node.js et npm sont installés
echo.

REM Vérification des dépendances (client Vite uniquement)
if not exist "client\node_modules" (
    echo ⚠️  Dépendances du client non installées
    set /p install="Voulez-vous installer les dépendances maintenant? (y/n): "
    if /i "%install%"=="y" (
        echo 📦 Installation...
        cd client
        npm install
        cd ..
        if %errorlevel% neq 0 (
            echo ❌ Erreur lors de l'installation
            pause
            exit /b 1
        )
    ) else (
        echo ❌ Installation des dépendances requise pour continuer
        pause
        exit /b 1
    )
)

echo ✅ Toutes les dépendances sont installées
echo.

REM Lancement du serveur
echo 🚀 Lancement du serveur de développement (Vite)...
echo    http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo =================================
echo.

npm run dev

pause
