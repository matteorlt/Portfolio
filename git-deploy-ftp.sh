#!/bin/bash

# Script de déploiement Git vers FTP OVH
# Usage: ./git-deploy-ftp.sh

echo "🚀 Déploiement Git vers FTP OVH..."

# Configuration FTP (à remplir)
FTP_HOST="ftp.votre-domaine.com"
FTP_USER="votre-utilisateur"
FTP_PASS="votre-mot-de-passe"
FTP_DIR="/www/"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    log_error "lftp n'est pas installé. Installation..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get install lftp
    elif command -v yum &> /dev/null; then
        sudo yum install lftp
    elif command -v brew &> /dev/null; then
        brew install lftp
    else
        log_error "Impossible d'installer lftp automatiquement"
        exit 1
    fi
fi

# Build du frontend
log_info "Construction du frontend..."
npm run build:prod

if [ $? -ne 0 ]; then
    log_error "Erreur lors du build"
    exit 1
fi

# Déploiement FTP
log_info "Déploiement vers FTP..."

lftp -c "
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST
lcd .
cd $FTP_DIR
mirror -R --delete --verbose --exclude-glob .git* --exclude-glob node_modules/ --exclude-glob .env --exclude-glob deploy-*.sh --exclude-glob test-deployment.sh --exclude-glob OVH-DEPLOYMENT.md --exclude-glob ecosystem.config.js .
bye
"

if [ $? -eq 0 ]; then
    log_info "✅ Déploiement réussi !"
else
    log_error "❌ Erreur lors du déploiement"
    exit 1
fi

log_info "🎉 Site déployé sur OVH !"
