# Configuration pour OVH Cloud Web

## Variables d'environnement requises
Créez un fichier `.env` à la racine du projet avec :

```env
NODE_ENV=production
PORT=5000
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
EMAIL_TO=votre-email@gmail.com
```

## Installation sur OVH

1. **Connectez-vous à votre serveur OVH**
2. **Clonez le repository** :
   ```bash
   git clone https://github.com/votre-username/Portfolio.git
   cd Portfolio
   ```

3. **Installez les dépendances** :
   ```bash
   npm run install-all
   ```

4. **Construisez le frontend** :
   ```bash
   npm run build
   ```

5. **Installez PM2** (gestionnaire de processus) :
   ```bash
   npm install -g pm2
   ```

6. **Démarrez l'application** :
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

7. **Configurez PM2 pour le démarrage automatique** :
   ```bash
   pm2 startup
   pm2 save
   ```

## Commandes utiles

- **Voir les logs** : `pm2 logs portfolio`
- **Redémarrer** : `pm2 restart portfolio`
- **Arrêter** : `pm2 stop portfolio`
- **Statut** : `pm2 status`

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
