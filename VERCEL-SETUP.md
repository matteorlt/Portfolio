# 🚀 Configuration Vercel pour Portfolio

## 📋 Étapes de configuration

### 1. **Créer un compte Vercel**
- Allez sur [vercel.com](https://vercel.com)
- Connectez-vous avec votre compte GitHub
- Importez votre repository `Portfolio`

### 2. **Configuration automatique**
Vercel détectera automatiquement :
- ✅ Framework : React + Vite
- ✅ Dossier de build : `client/dist`
- ✅ Commandes de build : `npm run build:prod`

### 3. **Secrets GitHub (optionnel pour GitHub Actions)**
Si vous voulez utiliser GitHub Actions au lieu de l'intégration Vercel :

Dans GitHub > **Settings** > **Secrets and variables** > **Actions** :
```
VERCEL_TOKEN = [token de votre compte Vercel]
VERCEL_ORG_ID = [ID de votre organisation Vercel]
VERCEL_PROJECT_ID = [ID de votre projet Vercel]
```

## 🎯 Avantages Vercel

- ✅ **Déploiement en 30 secondes**
- ✅ **Déploiement automatique** à chaque push
- ✅ **Preview des branches** automatique
- ✅ **CDN global** inclus
- ✅ **SSL automatique**
- ✅ **Analytics** inclus
- ✅ **Pas de configuration** complexe

## 🔧 Configuration du projet

### **Build Settings**
- **Framework Preset** : Vite
- **Root Directory** : `client`
- **Build Command** : `npm run build:prod`
- **Output Directory** : `dist`

### **Environment Variables**
Ajoutez vos variables d'environnement dans Vercel :
```
NODE_ENV=production
EMAIL_USER=contact@matteo-rlt.fr
EMAIL_PASS=[votre-mot-de-passe-app]
EMAIL_TO=contact@matteo-rlt.fr
```

## 🚀 Déploiement

### **Option 1 : Intégration Vercel (Recommandé)**
1. Connectez votre GitHub à Vercel
2. Importez le repository
3. Vercel déploie automatiquement à chaque push

### **Option 2 : GitHub Actions**
1. Configurez les secrets GitHub
2. Le workflow se lance automatiquement

## 📝 Notes importantes

- **Backend Node.js** : Vercel supporte les API routes
- **Variables d'environnement** : Configurées dans l'interface Vercel
- **Domaine personnalisé** : Possible dans les paramètres Vercel
- **Analytics** : Disponibles dans le dashboard Vercel

## 🎉 Résultat

Votre portfolio sera disponible sur :
- `https://votre-projet.vercel.app` (URL Vercel)
- `https://votre-domaine.com` (si domaine personnalisé configuré)
