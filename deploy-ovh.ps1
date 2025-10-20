# Script PowerShell de déploiement pour OVH
# Usage: .\deploy-ovh.ps1

Write-Host "🚀 Déploiement du portfolio sur OVH..." -ForegroundColor Green

# Fonction pour afficher les messages
function Log-Info {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Log-Warn {
    param($Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Log-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version
    Log-Info "Node.js version: $nodeVersion"
} catch {
    Log-Error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
}

# Vérifier si npm est installé
try {
    $npmVersion = npm --version
    Log-Info "npm version: $npmVersion"
} catch {
    Log-Error "npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
}

Log-Info "Installation des dépendances..."
npm run install-all

if ($LASTEXITCODE -ne 0) {
    Log-Error "Erreur lors de l'installation des dépendances"
    exit 1
}

Log-Info "Construction du frontend..."
npm run build:prod

if ($LASTEXITCODE -ne 0) {
    Log-Error "Erreur lors de la construction du frontend"
    exit 1
}

Log-Info "Vérification des fichiers de configuration..."
if (-not (Test-Path ".env")) {
    Log-Warn "Fichier .env manquant. Copie du template..."
    Copy-Item "env.example" ".env"
    Log-Warn "⚠️  Veuillez configurer le fichier .env avec vos vraies valeurs avant de continuer"
}

# Vérifier si PM2 est installé
try {
    $pm2Version = pm2 --version
    Log-Info "PM2 version: $pm2Version"
} catch {
    Log-Warn "PM2 n'est pas installé. Installation..."
    npm install -g pm2
}

Log-Info "Démarrage de l'application avec PM2..."
pm2 start ecosystem.config.js --env production

if ($LASTEXITCODE -eq 0) {
    Log-Info "✅ Application déployée avec succès!"
    Log-Info "📊 Statut: pm2 status"
    Log-Info "📝 Logs: pm2 logs portfolio"
    Log-Info "🔄 Redémarrage: pm2 restart portfolio"
} else {
    Log-Error "Erreur lors du démarrage de l'application"
    exit 1
}

# Configurer PM2 pour le démarrage automatique
Log-Info "Configuration du démarrage automatique..."
pm2 startup
pm2 save

Log-Info "🎉 Déploiement terminé!"
