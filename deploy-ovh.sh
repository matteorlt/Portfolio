#!/bin/bash

# Script de déploiement pour OVH
# Usage: ./deploy-ovh.sh

echo "🚀 Déploiement du portfolio sur OVH..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    log_error "npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

log_info "Installation des dépendances..."
npm run install-all

if [ $? -ne 0 ]; then
    log_error "Erreur lors de l'installation des dépendances"
    exit 1
fi

log_info "Construction du frontend..."
npm run build:prod

if [ $? -ne 0 ]; then
    log_error "Erreur lors de la construction du frontend"
    exit 1
fi

# Vérifier si PM2 est installé
if ! command -v pm2 &> /dev/null; then
    log_warn "PM2 n'est pas installé. Installation..."
    npm install -g pm2
fi

log_info "Démarrage de l'application avec PM2..."
pm2 start ecosystem.config.js --env production

if [ $? -eq 0 ]; then
    log_info "✅ Application déployée avec succès!"
    log_info "📊 Statut: pm2 status"
    log_info "📝 Logs: pm2 logs portfolio"
    log_info "🔄 Redémarrage: pm2 restart portfolio"
else
    log_error "Erreur lors du démarrage de l'application"
    exit 1
fi

# Configurer PM2 pour le démarrage automatique
log_info "Configuration du démarrage automatique..."
pm2 startup
pm2 save

log_info "🎉 Déploiement terminé!"
