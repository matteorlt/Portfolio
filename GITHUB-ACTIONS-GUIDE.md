# 🚀 Guide de déploiement GitHub Actions + OVH

## ✅ Vos informations FTP
- **Serveur** : `ftp.cluster021.hosting.ovh.net`
- **Utilisateur** : `tattooa`
- **Mot de passe** : [À ajouter dans GitHub Secrets]

## 📋 Étapes à suivre

### 1. **Configurer les secrets GitHub**

Allez dans votre repository GitHub :
1. **Settings** (onglet en haut)
2. **Secrets and variables** > **Actions**
3. **New repository secret** (3 fois)

**Ajoutez ces secrets :**

```
Nom: FTP_SERVER
Valeur: ftp.cluster021.hosting.ovh.net

Nom: FTP_USERNAME  
Valeur: tattooa

Nom: FTP_PASSWORD
Valeur: [VOTRE MOT DE PASSE FTP]
```

### 2. **Commit et push**

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### 3. **Vérifier le déploiement**

1. Allez dans l'onglet **"Actions"** de votre repository
2. Vous devriez voir le workflow **"Deploy Portfolio to OVH FTP"** se lancer
3. Cliquez dessus pour voir les logs en temps réel

## 🔍 Dépannage

### Si le déploiement échoue :

1. **Vérifiez vos secrets** dans Settings > Secrets
2. **Regardez les logs** dans l'onglet Actions
3. **Erreur FTP** : Vérifiez le mot de passe
4. **Erreur build** : Vérifiez que `npm run build:prod` fonctionne localement

### Commandes utiles :

```bash
# Test local du build
npm run build:prod

# Vérifier que le dossier dist existe
ls -la client/dist/

# Test de connexion FTP (optionnel)
ftp ftp.cluster021.hosting.ovh.net
```

## 🎯 Résultat attendu

Après un push sur `main` :
- ✅ Build automatique du frontend
- ✅ Upload automatique vers OVH
- ✅ Site en ligne en quelques minutes

## 📞 Support

Si vous avez des problèmes :
1. Regardez les logs dans GitHub Actions
2. Vérifiez vos secrets FTP
3. Testez la connexion FTP manuellement
