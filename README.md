# Portfolio Original - React, Node.js, Three.js

Un portfolio moderne et interactif développé avec React, Node.js et Three.js pour créer des expériences web immersives.

## 🚀 Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript pour l'interface utilisateur
- **Three.js** - Bibliothèque 3D pour les animations et effets visuels
- **Framer Motion** - Animations fluides et transitions
- **Styled Components** - Styling CSS-in-JS
- **React Router** - Navigation entre les pages
- **React Icons** - Icônes modernes

### Backend
- **Node.js** - Runtime JavaScript côté serveur
- **Express** - Framework web pour les APIs
- **CORS** - Gestion des requêtes cross-origin
- **Nodemailer** - Envoi d'emails

## 📁 Structure du Projet

```
portfolio/
├── client/                 # Application React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── styles/        # Styles globaux
│   │   ├── App.js         # Composant principal
│   │   └── index.js       # Point d'entrée
│   └── package.json
├── server/                 # Serveur Node.js
│   └── index.js
├── package.json           # Configuration principale
└── README.md
```

## 🎨 Fonctionnalités

### Pages
- **Accueil** - Animation Three.js avec sphère 3D et étoiles
- **À propos** - Présentation personnelle avec statistiques
- **Projets** - Galerie de projets avec filtres
- **Compétences** - Graphiques interactifs des compétences
- **Contact** - Formulaire de contact avec validation

### Animations
- Animations d'entrée avec Framer Motion
- Effets de hover et transitions fluides
- Animation 3D avec Three.js
- Parallax et effets de profondeur

### Design
- Interface moderne et responsive
- Thème sombre avec accents bleus
- Typographie Inter pour une meilleure lisibilité
- Composants réutilisables et modulaires

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/matteorlt/Portfolio
cd portfolio
```

2. **Installer les dépendances**
```bash
# Installer les dépendances du serveur
npm install

# Installer les dépendances du client
cd client
npm install
cd ..
```

3. **Démarrer l'application**
```bash
# Démarrer le serveur et le client en même temps
npm run dev

# Ou séparément :
npm run server    # Serveur sur http://localhost:5000
npm run client    # Client sur http://localhost:3000
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarrer le serveur et le client
npm run server       # Démarrer uniquement le serveur
npm run client       # Démarrer uniquement le client
npm run build        # Construire l'application pour la production
npm run install-all  # Installer toutes les dépendances
```

## 🌟 Fonctionnalités Avancées

### Three.js
- Sphère 3D rotative sur la page d'accueil
- Étoiles animées en arrière-plan
- Contrôles de caméra interactifs

### Animations
- Transitions de page fluides
- Animations d'entrée séquentielles
- Effets de hover sur les cartes
- Animations de progression des compétences

### Responsive Design
- Design adaptatif pour mobile et desktop
- Navigation mobile avec menu hamburger
- Grilles flexibles et adaptatives

## 📱 Pages et Sections

### Accueil
- Présentation personnelle avec animation 3D
- Boutons d'action (CV, projets)
- Liens vers les réseaux sociaux

### À propos
- Description personnelle
- Statistiques avec icônes
- Liste des technologies maîtrisées

### Projets
- Grille de projets avec filtres
- Cartes avec images et descriptions
- Liens vers démos et code source

### Compétences
- Graphiques de progression interactifs
- Catégorisation par domaine
- Domaines d'expertise

### Contact
- Formulaire de contact fonctionnel
- Informations de contact
- Liens vers les réseaux sociaux

## 🎯 Personnalisation

### Modifier les Informations
1. **Page d'accueil** : Modifier `client/src/pages/Home.js`
2. **À propos** : Modifier `client/src/pages/About.js`
3. **Projets** : Modifier `client/src/pages/Projects.js`
4. **Compétences** : Modifier `client/src/pages/Skills.js`
5. **Contact** : Modifier `client/src/pages/Contact.js`

### Changer les Couleurs
Modifier les variables de couleur dans `client/src/styles/GlobalStyle.js` :
```css
--primary-color: #4a90e2;
--secondary-color: #357abd;
--background-color: #0f0f23;
```

### Ajouter des Projets
Modifier le tableau `projects` dans `client/src/pages/Projects.js` :
```javascript
{
  id: 7,
  title: 'Nouveau Projet',
  description: 'Description du projet',
  image: '🎯',
  tech: ['React', 'Node.js'],
  category: ['react', 'node'],
  demo: 'https://demo.com',
  code: 'https://github.com'
}
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repository GitHub à Vercel
2. Configurer le build command : `npm run build`
3. Déployer automatiquement

### Netlify
1. Connecter le repository à Netlify
2. Build command : `npm run build`
3. Publish directory : `client/build`

### Heroku
1. Créer un `Procfile` :
```
web: npm start
```
2. Déployer avec Heroku CLI

## 📄 Licence

MIT License - Libre d'utilisation et de modification

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter via le formulaire de contact du portfolio.

---

**Développé par Mattéo Rannou-Le Texier en utilisant React, Node.js et Three.js** 