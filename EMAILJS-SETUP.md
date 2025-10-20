# Configuration EmailJS pour Portfolio

## 🚀 Avantages EmailJS

- ✅ **Pas de backend** nécessaire
- ✅ **Configuration simple** dans le frontend
- ✅ **Gratuit** jusqu'à 200 emails/mois
- ✅ **Fiable** et éprouvé
- ✅ **Pas de problèmes** de CORS ou permissions

## 📋 Configuration

### 1. **Créer un compte EmailJS**
- Allez sur [emailjs.com](https://emailjs.com)
- Créez un compte gratuit
- Connectez votre service email (Gmail, Outlook, etc.)

### 2. **Configuration dans le frontend**
- Ajoutez EmailJS à votre projet React
- Configurez les templates d'email
- Utilisez les API EmailJS directement

### 3. **Variables d'environnement**
```
REACT_APP_EMAILJS_SERVICE_ID = [votre-service-id]
REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT = [template-contact]
REACT_APP_EMAILJS_TEMPLATE_ID_QUOTE = [template-quote]
REACT_APP_EMAILJS_PUBLIC_KEY = [votre-clé-publique]
```

## 🔄 Migration depuis Vercel Functions

Si vous voulez garder les Vercel Functions, il faut :

1. **Vérifier les variables d'environnement** dans Vercel
2. **Tester les fonctions** individuellement
3. **Vérifier les logs** dans Vercel Dashboard

## 🎯 Recommandation

**EmailJS** est plus simple et fiable pour un portfolio. Voulez-vous que je configure EmailJS à la place ?
