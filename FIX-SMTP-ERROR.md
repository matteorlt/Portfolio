# 🔧 Correction Erreur SMTP "535 Authentication Failed"

## ❌ Problème

L'erreur `Invalid login: 535 Authentication Failed` signifie que l'authentification SMTP échoue.

## 🔍 Causes possibles

1. **Mot de passe d'application incorrect** - Zoho nécessite un mot de passe d'application spécifique
2. **Mot de passe expiré** - Les mots de passe d'application Zoho peuvent expirer
3. **Compte Zoho désactivé** - Vérifiez que votre compte Zoho est actif
4. **Configuration incorrecte** - Port ou serveur SMTP incorrect

## ✅ Solution

### 1. Créer un nouveau mot de passe d'application Zoho

1. Allez sur [https://accounts.zoho.com/home](https://accounts.zoho.com/home)
2. Connectez-vous avec votre compte `contact@matteo-rlt.fr`
3. Allez dans **Sécurité** → **Mots de passe d'application**
4. Cliquez sur **Générer un nouveau mot de passe**
5. Sélectionnez **Client Mail** ou **Zoho Mail**
6. Donnez un nom (ex: "Portfolio API")
7. Copiez le mot de passe généré (affiche UNE SEULE FOIS)

### 2. Mettre à jour le .env

Dans votre fichier `.env` à la racine, remplacez :

```env
EMAIL_PASS=ApDfQ7i5Zak3
```

Par le nouveau mot de passe d'application que vous venez de générer :

```env
EMAIL_PASS=votre-nouveau-mot-de-passe-d-application
```

### 3. Redémarrer le serveur

```powershell
# Arrêtez le serveur (Ctrl+C)
# Puis relancez :
npm run dev
```

### 4. Vérifier la configuration

Votre `.env` doit contenir :

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_USER=contact@matteo-rlt.fr
EMAIL_PASS=votre-nouveau-mot-de-passe-d-application
EMAIL_TO=contact@matteo-rlt.fr
```

## 🧪 Test

Après avoir mis à jour le `.env` et redémarré le serveur :

1. Allez sur `http://localhost:3000/admin`
2. Cliquez sur "Envoyer le code par e-mail"
3. Vérifiez votre boîte mail (et spam) à `contact@matteo-rlt.fr`

## 📝 Notes importantes

- ⚠️ Le mot de passe d'application est différent du mot de passe de votre compte
- ⚠️ Le mot de passe d'application s'affiche UNE SEULE FOIS lors de la création
- ✅ Si vous perdez le mot de passe, créez-en un nouveau
- ✅ Vous pouvez avoir plusieurs mots de passe d'application

## 🔗 Ressources

- [Documentation Zoho - Mots de passe d'application](https://help.zoho.com/portal/en/kb/mail/help-articles/configure-email-client)

