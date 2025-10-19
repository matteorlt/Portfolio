#!/bin/bash

# Script de test pour vérifier le déploiement
# Usage: ./test-deployment.sh

echo "🧪 Test du déploiement du portfolio..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}[TEST]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Test 1: Vérifier les fichiers essentiels
log_info "Vérification des fichiers essentiels..."

required_files=(
    "package.json"
    "server/index.js"
    "server/templates/emailTemplates.js"
    "ecosystem.config.js"
    "env.example"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        log_info "✅ $file existe"
    else
        log_error "❌ $file manquant"
        exit 1
    fi
done

# Test 2: Vérifier la syntaxe Node.js
log_info "Vérification de la syntaxe Node.js..."
node -c server/index.js
if [ $? -eq 0 ]; then
    log_info "✅ Syntaxe Node.js correcte"
else
    log_error "❌ Erreur de syntaxe dans server/index.js"
    exit 1
fi

# Test 3: Vérifier les dépendances
log_info "Vérification des dépendances..."
if [ -f "package.json" ]; then
    log_info "✅ package.json trouvé"
else
    log_error "❌ package.json manquant"
    exit 1
fi

# Test 4: Vérifier la configuration PM2
log_info "Vérification de la configuration PM2..."
if [ -f "ecosystem.config.js" ]; then
    node -c ecosystem.config.js
    if [ $? -eq 0 ]; then
        log_info "✅ Configuration PM2 correcte"
    else
        log_error "❌ Erreur dans ecosystem.config.js"
        exit 1
    fi
else
    log_error "❌ ecosystem.config.js manquant"
    exit 1
fi

# Test 5: Vérifier les templates d'email
log_info "Vérification des templates d'email..."
if [ -f "server/templates/emailTemplates.js" ]; then
    node -c server/templates/emailTemplates.js
    if [ $? -eq 0 ]; then
        log_info "✅ Templates d'email corrects"
    else
        log_error "❌ Erreur dans les templates d'email"
        exit 1
    fi
else
    log_error "❌ Templates d'email manquants"
    exit 1
fi

# Test 6: Vérifier le fichier .env
log_info "Vérification de la configuration..."
if [ -f ".env" ]; then
    log_info "✅ Fichier .env trouvé"
else
    log_warn "⚠️  Fichier .env manquant (normal si pas encore configuré)"
fi

log_info "🎉 Tous les tests sont passés ! Le déploiement est prêt."
log_info "📝 Prochaines étapes :"
log_info "   1. Configurez le fichier .env avec vos vraies valeurs"
log_info "   2. Lancez : ./deploy-ovh.sh"
log_info "   3. Vérifiez avec : pm2 status"
