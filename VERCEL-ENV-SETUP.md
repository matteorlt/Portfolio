# 🔧 Configuration Variables d'Environnement Vercel

## ⚠️ IMPORTANT : Variables d'environnement requises

Pour que vos formulaires de contact et devis fonctionnent, vous devez configurer ces variables dans Vercel :

### 📋 Variables à ajouter dans Vercel

1. **Connectez-vous à [vercel.com](https://vercel.com)**
2. **Allez dans votre projet Portfolio**
3. **Settings → Environment Variables**
4. **Ajoutez ces variables :**

```env
EMAIL_USER=contact@matteo-rlt.fr
EMAIL_PASS=votre-mot-de-passe-app-zoho
EMAIL_TO=contact@matteo-rlt.fr
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
NODE_ENV=production
```

### 🔐 Configuration Zoho Mail

1. **Connectez-vous à votre compte Zoho Mail**
2. **Paramètres → Sécurité → Mots de passe d'application**
3. **Créez un nouveau mot de passe pour "Mail"**
4. **Utilisez ce mot de passe dans `EMAIL_PASS`**

### 🚀 Redéploiement

Après avoir ajouté les variables :
1. **Allez dans Deployments**
2. **Cliquez sur "Redeploy" sur le dernier déploiement**
3. **Ou faites un nouveau push sur GitHub**

### ✅ Vérification

Testez vos formulaires :
- **Contact** : https://matteo-rlt.fr/contact
- **Devis** : https://matteo-rlt.fr/quote

### 🔍 Debug

Si ça ne fonctionne toujours pas :
1. **Vérifiez les logs Vercel** : Functions → Logs
2. **Vérifiez que les variables sont bien définies**
3. **Testez avec un email simple d'abord**

## 📝 Notes

- Les variables d'environnement sont **sensibles** - ne les partagez jamais
- Vercel chiffre automatiquement les variables
- Un redéploiement est nécessaire après modification des variables
