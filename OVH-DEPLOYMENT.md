# Configuration pour OVH Cloud Web

## Variables d'environnement requises
Créez un fichier `.env` à la racine du projet avec :

```env
NODE_ENV=production
PORT=5000

# Configuration SMTP (Zoho Mail recommandé pour OVH)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_USER=contact@matteo-rlt.fr
EMAIL_PASS=votre-mot-de-passe-app-zoho
EMAIL_TO=contact@matteo-rlt.fr
```

## Installation sur OVH

1. **Connectez-vous à votre serveur OVH**
2. **Clonez le repository** :
   ```bash
   git clone https://github.com/votre-username/Portfolio.git
   cd Portfolio
   ```

3. **Testez la configuration** :
   ```bash
   chmod +x test-deployment.sh
   ./test-deployment.sh
   ```

4. **Configurez les variables d'environnement** :
   ```bash
   cp env.example .env
   nano .env  # Éditez avec vos vraies valeurs
   ```

5. **Installez les dépendances** :
   ```bash
   npm run install-all
   ```

6. **Construisez le frontend** :
   ```bash
   npm run build:prod
   ```

7. **Installez PM2** (gestionnaire de processus) :
   ```bash
   npm install -g pm2
   ```

8. **Déployez automatiquement** :
   ```bash
   chmod +x deploy-ovh.sh
   ./deploy-ovh.sh
   ```

## Configuration Email (Zoho Mail)

Pour utiliser Zoho Mail avec OVH :

1. **Créez un compte Zoho Mail** ou utilisez votre domaine existant
2. **Générez un mot de passe d'application** :
   - Allez dans Paramètres > Sécurité > Mots de passe d'application
   - Créez un nouveau mot de passe pour "Mail"
3. **Configurez dans .env** :
   ```env
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=465
   SMTP_SECURE=true
   EMAIL_USER=votre-email@votre-domaine.com
   EMAIL_PASS=votre-mot-de-passe-app
   ```

## Commandes utiles

- **Voir les logs** : `pm2 logs portfolio`
- **Redémarrer** : `pm2 restart portfolio`
- **Arrêter** : `pm2 stop portfolio`
- **Statut** : `pm2 status`
- **Tester l'email** : `curl -X POST http://localhost:5000/api/test-email`

## Endpoints API disponibles

- `GET /api/health` - Vérification de l'API
- `POST /api/contact` - Envoi de messages de contact
- `POST /api/quote` - Envoi de demandes de devis
- `POST /api/test-email` - Test d'envoi d'email

## Configuration Nginx (optionnel)

Si vous utilisez Nginx comme reverse proxy :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Dépannage

### Problèmes courants

1. **Erreur SMTP** : Vérifiez vos identifiants Zoho Mail
2. **Port déjà utilisé** : Changez le PORT dans .env
3. **PM2 ne démarre pas** : Vérifiez les logs avec `pm2 logs portfolio`
4. **Frontend ne se charge pas** : Vérifiez que `npm run build:prod` s'est bien exécuté

### Logs utiles

```bash
# Logs de l'application
pm2 logs portfolio

# Logs système
journalctl -u nginx -f

# Test de connectivité
curl http://localhost:5000/api/health
```
