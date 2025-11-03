# 🔐 Guide d'Authentification Simplifiée

## 📋 Vue d'ensemble

Le système d'authentification utilise un **code magique par e-mail** - simple, sécurisé et sans captcha compliqué !

## 🚀 Comment se connecter

### 1. **Accéder à la page Admin**

Allez sur : `https://matteo-rlt.fr/admin`

### 2. **Demander un code**

1. Cliquez sur **"Envoyer le code par e-mail"**
2. Un code d'accès unique sera envoyé à **contact@matteo-rlt.fr**
3. Le code est valable **15 minutes**

### 3. **Valider le code**

1. Entrez le code reçu par e-mail
2. Cliquez sur **"Valider le code"**
3. Vous êtes maintenant connecté ! 🎉

## 🔒 Sécurité

- **Rate Limiting** : Maximum 3 demandes de code par heure par IP
- **Code unique** : Chaque code ne peut être utilisé qu'une seule fois
- **Expiration** : Les codes expirent après 15 minutes
- **Session sécurisée** : Utilise `iron-session` avec cookies HTTP-only

## ⚙️ Configuration

### Variables d'environnement requises

```env
# Pour les sessions (minimum 32 caractères)
SESSION_PASSWORD=votre-mot-de-passe-super-securise-minimum-32-caracteres

# Pour l'envoi d'email (déjà configuré)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=contact@matteo-rlt.fr
SMTP_PASS=votre-mot-de-passe-app
FROM_EMAIL=contact@matteo-rlt.fr

# Base de données (déjà configurée)
DATABASE_URL=postgresql://...
```

### Générer un SESSION_PASSWORD sécurisé

```bash
# Avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Ou avec OpenSSL
openssl rand -hex 32
```

## 📧 Email de code

L'email contient :
- Le code d'accès
- Un lien direct : `https://matteo-rlt.fr/admin?code=XXXXX`
- Validité : 15 minutes

## 🐛 Dépannage

### Le code n'arrive pas

1. Vérifiez votre boîte spam
2. Vérifiez que `SMTP_USER` et `SMTP_PASS` sont correctement configurés
3. Vérifiez les logs du serveur

### "Trop de demandes"

- Limite : 3 demandes par heure par IP
- Attendez 1 heure ou utilisez une autre IP

### Le code est expiré

- Les codes expirent après 15 minutes
- Demandez un nouveau code

## ✅ Avantages

- ✅ **Simple** : Pas de captcha compliqué
- ✅ **Sécurisé** : Code unique, expiration, rate limiting
- ✅ **Pratique** : Lien direct dans l'email
- ✅ **Sans mot de passe** : Pas besoin de mémoriser un mot de passe

## 🔄 Fonctionnalités Admin

Une fois connecté, vous pouvez :
- Voir les statistiques du portfolio
- Modifier les prix des offres
- Accéder aux données analytiques

