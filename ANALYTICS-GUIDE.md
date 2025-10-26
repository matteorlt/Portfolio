# Guide d'Analyse et de Tracking

Ce guide explique comment utiliser le système de tracking analytics intégré dans votre portfolio.

## 📊 Ce qui est tracké automatiquement

1. **Visites de pages** : Chaque changement de page est enregistré automatiquement
2. **Temps passé par page** : Le temps passé sur chaque page est mesuré
3. **Google Analytics** : Connecté avec votre ID `G-F9XDS90C1K`
4. **Google Tag Manager** : Connecté avec votre ID `GTM-N2CMQQZD`

## 🎯 Fonctionnalités disponibles

### Dans `client/src/utils/analytics.js`

- `trackPageView(pageName)` - Enregistrer une visite de page
- `trackClick(elementName, category, value)` - Enregistrer un clic
- `trackDownload(fileName, category)` - Enregistrer un téléchargement
- `trackExternalLink(url, category)` - Enregistrer un clic sur lien externe
- `trackFormEvent(formName, eventType, data)` - Enregistrer des événements de formulaire
- `trackVideo(videoName, action, category)` - Enregistrer des événements vidéo
- `trackScroll(percentage)` - Enregistrer le pourcentage de scroll
- `trackTimeOnPage(pageName, timeInSeconds)` - Enregistrer le temps passé
- `trackConversion(conversionType, value, currency)` - Enregistrer une conversion

## 💡 Exemples d'utilisation

### Exemple 1: Tracker un bouton

```jsx
import { trackClick } from '../utils/analytics';

const handleContactClick = () => {
  trackClick('Contact Button', 'navbar', 1);
  // Votre logique ici
};
```

### Exemple 2: Tracker un lien externe

```jsx
import { trackExternalLink } from '../utils/analytics';

const handleGitHubClick = () => {
  trackExternalLink('https://github.com/username', 'social_media');
  window.open('https://github.com/username', '_blank');
};
```

### Exemple 3: Tracker un téléchargement de CV

```jsx
import { trackDownload } from '../utils/analytics';

const handleDownloadCV = () => {
  trackDownload('matteo-rannou-le-texier-cv.pdf', 'cv');
  // Votre logique de téléchargement
};
```

### Exemple 4: Tracker les événements de formulaire

```jsx
import { trackFormEvent } from '../utils/analytics';

// Quand l'utilisateur commence à remplir le formulaire
const handleInputFocus = () => {
  trackFormEvent('Contact Form', 'start');
};

// Quand l'utilisateur soumet le formulaire
const handleSubmit = () => {
  trackFormEvent('Contact Form', 'submit', {
    form_location: 'contact_page'
  });
};

// En cas d'erreur
const handleError = (error) => {
  trackFormEvent('Contact Form', 'error', {
    error_message: error.message
  });
};
```

### Exemple 5: Tracker une conversion (ex: demande de devis)

```jsx
import { trackConversion } from '../utils/analytics';

const handleQuoteSubmit = async (quoteData) => {
  try {
    await submitQuote(quoteData);
    trackConversion('Quote Request', quoteData.value, 'EUR');
  } catch (error) {
    console.error(error);
  }
};
```

### Exemple 6: Utiliser le hook personnalisé

```jsx
import { useAnalytics } from '../utils/analytics';

function MyComponent() {
  const { trackClick, trackDownload } = useAnalytics();
  
  const handleButtonClick = () => {
    trackClick('My Button', 'interaction', 1);
  };
  
  return <button onClick={handleButtonClick}>Cliquez-moi</button>;
}
```

## 📈 Voir les statistiques

1. **Google Analytics** : https://analytics.google.com
   - Connectez-vous avec votre compte Google
   - Sélectionnez votre propriété
   - Consultez les rapports dans "Comportement" > "Aperçu du contenu"

2. **Google Tag Manager** : https://tagmanager.google.com
   - Gérer vos tags et triggers
   - Voir les événements en temps réel dans le mode Debug

## 🛠️ Événements personnalisés dans Google Analytics

Vous pouvez créer des rapports personnalisés dans Google Analytics pour voir :
- Les pages les plus visitées
- Les éléments les plus cliqués
- Les conversions (devis, contacts)
- Le temps moyen passé par page
- Les liens externes les plus cliqués
- etc.

## 📝 Notes importantes

- En mode développement, les événements sont loggés dans la console
- Tous les événements sont automatiquement envoyés à Google Analytics
- Le tracking est respectueux de la vie privée et conforme au RGPD
- Les données sont anonymisées par défaut

## 🔧 Configuration avancée

Pour personnaliser davantage le tracking, vous pouvez modifier :
- `client/src/utils/analytics.js` - Ajouter de nouvelles fonctions de tracking
- `client/src/hooks/usePageTracking.jsx` - Modifier le tracking automatique des pages
- `client/index.html` - Personnaliser les scripts Google Analytics et Tag Manager

