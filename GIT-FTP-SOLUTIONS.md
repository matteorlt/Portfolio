# Configuration OVHcloud Git Integration

## Méthode 1: Intégration Git native OVH

### Étapes pour activer l'intégration Git sur OVH :

1. **Connectez-vous à votre espace client OVH**
2. **Allez dans "Hébergement web" > "Gestionnaire de fichiers"**
3. **Activez l'intégration Git** :
   - Cliquez sur "Intégration Git"
   - Connectez votre compte GitHub
   - Sélectionnez votre repository
   - Configurez la branche (généralement `main`)

### Configuration automatique :
- **Déploiement automatique** à chaque push
- **Build automatique** du frontend
- **Variables d'environnement** configurables dans l'interface OVH

## Méthode 2: GitHub Actions (Recommandée)

### Configuration des secrets GitHub :

1. **Allez dans votre repository GitHub**
2. **Settings > Secrets and variables > Actions**
3. **Ajoutez ces secrets** :
   ```
   FTP_SERVER: ftp.votre-domaine.com
   FTP_USERNAME: votre-utilisateur-ftp
   FTP_PASSWORD: votre-mot-de-passe-ftp
   ```

### Avantages GitHub Actions :
- ✅ Déploiement automatique à chaque push
- ✅ Build et tests avant déploiement
- ✅ Rollback facile
- ✅ Logs détaillés
- ✅ Support des environnements multiples

## Méthode 3: Services tiers

### Netlify (gratuit)
- Connecte directement votre Git
- Build automatique
- Déploiement en quelques secondes
- CDN global inclus

### Vercel (gratuit)
- Optimisé pour React/Next.js
- Déploiement instantané
- Preview des branches
- Analytics inclus

### Render (gratuit)
- Support Node.js natif
- Base de données incluse
- SSL automatique
- Monitoring intégré

## Recommandation

Pour votre portfolio avec backend Node.js, je recommande :

1. **GitHub Actions** si vous voulez garder OVH
2. **Vercel** si vous voulez une solution simple et rapide
3. **Render** si vous voulez une alternative à OVH avec plus de fonctionnalités
