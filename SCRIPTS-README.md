# 🚀 Scripts de lancement du Portfolio

Ce dossier contient des scripts automatisés pour lancer votre portfolio en local avec toutes les vérifications nécessaires.

## 📋 Prérequis

- **Node.js** (version 16 ou supérieure) : [Télécharger ici](https://nodejs.org/)
- **npm** (installé avec Node.js)

## 🎯 Scripts disponibles

### PowerShell (Recommandé pour Windows)
```powershell
.\start-portfolio.ps1
```

### Batch (Alternative pour Windows)
```cmd
start-portfolio.bat
```

## ✨ Fonctionnalités des scripts

### Vérifications automatiques
- ✅ **Node.js** : Vérifie si Node.js est installé
- ✅ **npm** : Vérifie si npm est disponible
- ✅ **Dépendances** : Vérifie si les modules sont installés
- ✅ **Ports** : Vérifie la disponibilité des ports 3000 et 5000

### Installation automatique
- 📦 Installe les dépendances du serveur si nécessaire
- 📦 Installe les dépendances du client si nécessaire
- 🔄 Propose l'installation automatique si des dépendances manquent

### Lancement du serveur
- 🚀 Lance le serveur de développement avec `npm run dev`
- 🌐 Frontend accessible sur : http://localhost:3000
- 🔧 Backend accessible sur : http://localhost:5000

## 🛠️ Utilisation

1. **Ouvrez un terminal** dans le dossier du projet
2. **Exécutez le script** :
   - PowerShell : `.\start-portfolio.ps1`
   - Batch : `start-portfolio.bat`
3. **Suivez les instructions** à l'écran
4. **Ouvrez votre navigateur** sur http://localhost:3000

## 🔧 Dépannage

### Erreur "Execution Policy"
Si vous obtenez une erreur d'exécution PowerShell :
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Ports déjà utilisés
Si les ports 3000 ou 5000 sont occupés :
- Arrêtez les processus qui les utilisent
- Ou modifiez les ports dans les fichiers de configuration

### Dépendances manquantes
Les scripts proposeront automatiquement de les installer. Acceptez pour continuer.

## 📝 Notes

- Les scripts vérifient automatiquement tous les prérequis
- L'installation des dépendances peut prendre quelques minutes
- Le serveur se relance automatiquement lors des modifications (hot reload)
- Utilisez `Ctrl+C` pour arrêter le serveur

## 🎉 C'est parti !

Votre portfolio est maintenant prêt à être développé en local ! 🚀
