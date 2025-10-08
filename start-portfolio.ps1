# Script PowerShell pour lancer le Portfolio en local
# Description: Verifie les dependances et lance le serveur de developpement

Write-Host "Script de lancement du Portfolio" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Fonction pour verifier si Node.js est installe
function Test-NodeJS {
    try {
        $nodeVersion = node --version
        Write-Host "Node.js detecte: $nodeVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Node.js n'est pas installe ou pas dans le PATH" -ForegroundColor Red
        Write-Host "Veuillez installer Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
        return $false
    }
}

# Fonction pour verifier si npm est installe
function Test-NPM {
    try {
        $npmVersion = npm --version
        Write-Host "npm detecte: $npmVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "npm n'est pas installe ou pas dans le PATH" -ForegroundColor Red
        return $false
    }
}

# Fonction pour verifier si les dependances sont installees
function Test-Dependencies {
    $rootNodeModules = Test-Path "node_modules"
    $clientNodeModules = Test-Path "client\node_modules"
    
    if (-not $rootNodeModules) {
        Write-Host "Dependances du serveur non installees" -ForegroundColor Yellow
        return $false
    }
    
    if (-not $clientNodeModules) {
        Write-Host "Dependances du client non installees" -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "Toutes les dependances sont installees" -ForegroundColor Green
    return $true
}

# Fonction pour installer les dependances
function Install-Dependencies {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    
    # Installation des dependances du serveur
    Write-Host "Installing server dependencies..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erreur lors de l'installation des dependances du serveur" -ForegroundColor Red
        return $false
    }
    
    # Installation des dependances du client
    Write-Host "Installing client dependencies..." -ForegroundColor Cyan
    Set-Location "client"
    npm install
    Set-Location ".."
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erreur lors de l'installation des dependances du client" -ForegroundColor Red
        return $false
    }
    
    Write-Host "Installation terminee avec succes!" -ForegroundColor Green
    return $true
}

# Fonction pour verifier si les ports sont disponibles
function Test-Ports {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    $port5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
    
    if ($port3000) {
        Write-Host "Le port 3000 est deja utilise" -ForegroundColor Yellow
        Write-Host "   Vous pouvez arreter le processus ou utiliser un autre port" -ForegroundColor Yellow
    }
    
    if ($port5000) {
        Write-Host "Le port 5000 est deja utilise" -ForegroundColor Yellow
        Write-Host "   Vous pouvez arreter le processus ou utiliser un autre port" -ForegroundColor Yellow
    }
    
    if (-not $port3000 -and -not $port5000) {
        Write-Host "Les ports 3000 et 5000 sont disponibles" -ForegroundColor Green
    }
}

# Fonction pour lancer le serveur de developpement
function Start-DevServer {
    Write-Host "Lancement du serveur de developpement..." -ForegroundColor Cyan
    Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Green
    Write-Host "   Backend: http://localhost:5000" -ForegroundColor Green
    Write-Host ""
    Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Yellow
    Write-Host "=================================" -ForegroundColor Cyan
    
    npm run dev
}

# Script principal
try {
    # Verifications preliminaires
    Write-Host "Verification des prerequis..." -ForegroundColor Cyan
    
    if (-not (Test-NodeJS)) {
        exit 1
    }
    
    if (-not (Test-NPM)) {
        exit 1
    }
    
    # Verification des dependances
    Write-Host ""
    Write-Host "Verification des dependances..." -ForegroundColor Cyan
    
    if (-not (Test-Dependencies)) {
        Write-Host ""
        $install = Read-Host "Voulez-vous installer les dependances maintenant? (y/n)"
        if ($install -eq "y" -or $install -eq "Y") {
            if (-not (Install-Dependencies)) {
                Write-Host "Echec de l'installation des dependances" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "Installation des dependances requise pour continuer" -ForegroundColor Red
            exit 1
        }
    }
    
    # Verification des ports
    Write-Host ""
    Write-Host "Verification des ports..." -ForegroundColor Cyan
    Test-Ports
    
    # Lancement du serveur
    Write-Host ""
    Start-DevServer
}
catch {
    Write-Host "Erreur inattendue: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
