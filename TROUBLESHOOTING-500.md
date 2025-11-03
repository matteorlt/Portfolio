# 🔧 Dépannage Erreur 500 - /api/auth/request-code

## 🔍 Causes possibles

### 1. **Dépendances manquantes**

Les dépendances Prisma et autres ne sont pas installées dans le dossier `api/`.

**Solution** :
```bash
cd api
npm install
```

Ou si vous êtes à la racine :
```bash
npm install --prefix api
```

### 2. **Variables d'environnement manquantes**

Vérifiez que ces variables sont configurées dans Vercel :

**Variables requises** :
- `DATABASE_URL` - URL de connexion PostgreSQL
- `SMTP_HOST` - Serveur SMTP (ex: smtp.zoho.com)
- `SMTP_PORT` - Port SMTP (ex: 465)
- `SMTP_USER` - Email SMTP
- `SMTP_PASS` - Mot de passe SMTP
- `SESSION_PASSWORD` - Mot de passe pour les sessions (min 32 caractères)
- `FROM_EMAIL` - Email expéditeur (optionnel)

**Comment vérifier dans Vercel** :
1. Allez sur [vercel.com](https://vercel.com)
2. Projet → **Settings** → **Environment Variables**
3. Vérifiez que toutes les variables sont présentes

### 3. **Base de données non accessible**

Le `DATABASE_URL` peut être incorrect ou la base de données non accessible.

**Solution** :
- Vérifiez que `DATABASE_URL` est correct
- Testez la connexion à la base de données
- Assurez-vous que les IPs de Vercel sont autorisées (si restrictions)

### 4. **Prisma Client non généré**

Le client Prisma doit être généré avant le déploiement.

**Solution** :
```bash
# À la racine du projet
npx prisma generate
```

### 5. **Configuration Vercel incorrecte**

Vercel doit savoir où trouver les fonctions API.

**Vérifiez `vercel.json`** :
```json
{
  "buildCommand": "cd client && npm run build:prod",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm ci && cd ../api && npm ci"
}
```

## 🚀 Étapes de résolution

### Étape 1 : Installer les dépendances API

```bash
cd api
npm install
cd ..
```

### Étape 2 : Générer Prisma Client

```bash
npx prisma generate
```

### Étape 3 : Vérifier les variables d'environnement

Dans Vercel, vérifiez que toutes les variables sont définies :
- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SESSION_PASSWORD`
- `FROM_EMAIL` (optionnel)

### Étape 4 : Vérifier les logs Vercel

1. Allez dans **Vercel** → **Deployments**
2. Cliquez sur le dernier déploiement
3. Allez dans **Functions** → **Logs**
4. Regardez les erreurs détaillées

### Étape 5 : Redéployer

Après avoir corrigé les problèmes :
1. **Deployments** → **Redeploy**
2. Ou faites un nouveau push sur GitHub

## 🧪 Test local

Pour tester localement avant de déployer :

```bash
# 1. Installer les dépendances
cd api
npm install
cd ..

# 2. Générer Prisma
npx prisma generate

# 3. Créer un fichier .env.local dans api/
cat > api/.env.local << EOF
DATABASE_URL=votre-database-url
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=contact@matteo-rlt.fr
SMTP_PASS=votre-mot-de-passe
SESSION_PASSWORD=votre-session-password-min-32-caracteres
FROM_EMAIL=contact@matteo-rlt.fr
EOF

# 4. Tester avec Vercel CLI (si installé)
vercel dev
```

## 📋 Checklist de vérification

- [ ] `api/package.json` contient toutes les dépendances
- [ ] `npm install` exécuté dans `api/`
- [ ] `npx prisma generate` exécuté
- [ ] `DATABASE_URL` configuré dans Vercel
- [ ] Variables SMTP configurées dans Vercel
- [ ] `SESSION_PASSWORD` configuré (min 32 caractères)
- [ ] Base de données accessible depuis Vercel
- [ ] Logs Vercel consultés pour erreurs détaillées

## 🔗 Ressources

- [Documentation Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation iron-session](https://github.com/vvo/iron-session)

