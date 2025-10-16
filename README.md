# Portfolio – React, Netlify, Functions (SMTP Zoho)

Portfolio moderne et performant (React + Netlify). Formulaires (Contact/Devis) envoyés via Netlify Functions (SMTP Zoho).

## 🚀 Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript pour l'interface utilisateur
- **Framer Motion** - Animations fluides et transitions
- **Styled Components** - Styling CSS-in-JS
- **React Router** - Navigation entre les pages
- **React Icons** - Icônes modernes
- **tsParticles** - Fond de particules responsive (desktop)

### Backend (deux options)
- **Netlify Functions (prod)** - `/api/contact`, `/api/quote`
- **Node/Express (dev/optionnel)** - `server/index.js`
- **Nodemailer (Zoho SMTP)** - Envoi d'emails

## 📁 Structure du Projet

```
portfolio/
├── client/                 # Application React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── styles/         # Styles globaux
│   │   ├── App.js          # Composant principal
│   │   └── index.js        # Point d'entrée
│   └── package.json
├── server/                 # Serveur Node.js (local/optionnel)
│   ├── index.js
│   └── templates/
├── netlify/
│   └── functions/
│       ├── contact.js      # Function Netlify Contact
│       ├── quote.js        # Function Netlify Devis
│       └── templates.js    # Templates email (HTML)
├── package.json           # Configuration principale
└── README.md
```

## 🎨 Fonctionnalités

### Pages
- **Accueil** - tsParticles responsive (desktop), Custom cursor
- **À propos** - Présentation personnelle avec statistiques
- **Projets** - Galerie de projets avec filtres
- **Compétences** - Sections de compétences
- **Contact** - Formulaire de contact avec validation

### Animations
- Framer Motion (entrées/transitions)
- tsParticles (fond desktop), custom cursor (home)

### Design
- Interface moderne et responsive
- Thème sombre avec accents bleus
- Typographie Inter
- Composants réutilisables et modulaires

## 🛠️ Installation (local)

1. **Cloner le repository**
```bash
git clone https://github.com/matteorlt/Portfolio
cd portfolio
```

2. **Installer les dépendances**
```bash
# Racine (si serveur local utilisé)
npm install

# Client
cd client
npm install
cd ..
```

3. **Démarrer en local**
```bash
# Client
cd client && npm run start
```

## 🔧 Scripts Disponibles (racine)

```bash
npm run build        # Build du front (Vite)
```

## 📱 Pages et Sections

### Accueil
- Présentation, CTA, liens sociaux

### À propos
- Description, statistiques, technologies maîtrisées

### Projets
- Grille de projets, images de preview WebP, liens demo/code

### Compétences
- Regroupement par domaines

### Contact
- Formulaire via Netlify Functions + Zoho SMTP

## 🛠 Déploiement Netlify + Functions (Production)

Frontend (client):
- base: `client/`
- build command: `npm run build`
- publish: `client/dist`

Functions (API):
- dossier: `netlify/functions/`
- endpoints: `/api/contact`, `/api/quote`
- redirections (dans `netlify.toml`):
  - `/api/contact` → `/.netlify/functions/contact`
  - `/api/quote` → `/.netlify/functions/quote`

Dépendances Functions:
- `netlify/functions/package.json` contient `nodemailer`
- plugin Netlify: `@netlify/plugin-functions-install-core`

## 🔐 Variables d’environnement

Netlify (Site → Settings → Environment):
- `EMAIL_USER` = contact@matteo-rlt.fr
- `EMAIL_PASS` = mot de passe d’application Zoho
- `EMAIL_TO` = contact@matteo-rlt.fr
- `SMTP_HOST` = `smtp.zoho.eu` (ou `.com`)
- `SMTP_PORT` = `465` (ou `587`)
- `SMTP_SECURE` = `true` (ou `false` si 587)

Client (optionnel, si EmailJS encore utilisé):
- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_TEMPLATE_CONTACT_ID`

## ✨ Détails produits

- Formulaires (Contact/Devis) → Netlify Functions (Nodemailer/Zoho) avec templates HTML + version texte et `reply-to`.
- tsParticles responsive (desktop uniquement) + désactivé mobile/reduced‑motion.
- Optimisations perfs: lazy des composants globaux, GTM différé, images WebP, logo dimensionné, fonts preload.
- Accessibilité: aria-label sur liens, focus visible, hiérarchie H1→H2 respectée.

## 📄 Licence

MIT License

## 🤝 Contribution

Issues et PR bienvenues.

---

**Développé par Mattéo Rannou-Le Texier** 