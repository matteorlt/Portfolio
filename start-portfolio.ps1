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
    $clientNodeModules = Test-Path "client\node_modules"
    if (-not $clientNodeModules) {
        Write-Host "Dependances du client (Vite) non installees" -ForegroundColor Yellow
        return $false
    }
    Write-Host "Dependances client installees" -ForegroundColor Green
    return $true
}

# Fonction pour installer les dependances
function Install-Dependencies {
    Write-Host "Installation des dependances (client)..." -ForegroundColor Yellow
    Set-Location "client"
    npm install
    Set-Location ".."
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Erreur lors de l'installation" -ForegroundColor Red
        return $false
    }
    Write-Host "Installation terminee avec succes!" -ForegroundColor Green
    return $true
}

# Fonction pour verifier si les ports sont disponibles
function Test-Ports {
    $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($port3000) {
        Write-Host "Le port 3000 est deja utilise" -ForegroundColor Yellow
        Write-Host "   Vous pouvez arreter le processus ou utiliser un autre port" -ForegroundColor Yellow
    } else {
        Write-Host "Le port 3000 est disponible (Vite)" -ForegroundColor Green
    }
}

# Fonction pour lancer le serveur de developpement
function Start-DevServer {
    Write-Host "Lancement du serveur de developpement (Vite)..." -ForegroundColor Cyan
    Write-Host "   http://localhost:3000" -ForegroundColor Green
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
