# Compte Rendu Frontend - Système de Particules Interactives & Curseur Personnalisé

## Technologies utilisées

- **React 18** avec **Hooks** (useState, useEffect, useRef, useCallback)
- **tsParticles** avec **@tsparticles/react** et **@tsparticles/preset-links**
- **Styled Components** pour le styling CSS-in-JS
- **Framer Motion** pour les animations fluides
- **Media Queries** pour la responsivité adaptative
- **Web APIs** (matchMedia, addEventListener) pour la détection d'environnement

---

## Architecture du projet

```
client/src/
├── components/           # Composants réutilisables
│   ├── ParticlesBackground.jsx    # Système de particules principal
│   ├── CustomCursor.jsx           # Curseur personnalisé interactif
│   └── SEO.jsx                    # Optimisation SEO
├── pages/               # Pages de l'application
│   ├── Home.jsx                   # Page d'accueil avec intégration
│   └── HomeSimple.jsx            # Version simplifiée (fallback)
├── styles/              # Styles globaux
│   └── GlobalStyle.jsx           # Configuration CSS globale
└── utils/               # Utilitaires
    └── threeConfig.jsx           # Configuration Three.js (legacy)
```

---

## Fonctionnalité principale : Système de Particules Interactives Responsive

### Description

Cette fonctionnalité implémente un **système de particules interactives** sophistiqué qui :

- **Détection intelligente** : Désactive automatiquement sur mobile et si l'utilisateur préfère les animations réduites
- **Chargement dynamique** : Import conditionnel pour optimiser les performances
- **Interactivité avancée** : Réactions au survol (grab) et clic (push) de la souris
- **Responsivité adaptative** : Configuration différente selon la taille d'écran
- **Performance optimisée** : Limitation FPS, détection Retina, gestion mémoire
- **Curseur personnalisé** : Système de curseur custom avec animations fluides
- **Accessibilité** : Respect des préférences utilisateur (prefers-reduced-motion)

Ce système crée une expérience utilisateur immersive et moderne tout en maintenant d'excellentes performances.

### Code principal

**Composant Particules** (`client/src/components/ParticlesBackground.jsx` - extrait):

```jsx
import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Détection intelligente de l'environnement
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateShouldRender = () => {
      setShouldRender(!isMobile() && !prefersReduced());
    };

    updateShouldRender();
    window.addEventListener('resize', updateShouldRender);

    // Initialisation asynchrone du moteur de particules
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setInit(true));

    return () => {
      window.removeEventListener('resize', updateShouldRender);
    };
  }, []);

  const options = {
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false },
    detectRetina: true,
    fpsLimit: 45,
    particles: {
      number: { value: 40, density: { enable: true, area: 800 } },
      move: { enable: true, speed: 1.2 },
      links: { enable: true, distance: 150, opacity: 0.4, width: 1 },
      shape: { type: 'circle' },
      size: { value: 2 }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        repulse: { distance: 120, duration: 0.4 },
        push: { quantity: 2 }
      }
    },
    // Configuration responsive adaptative
    responsive: [
      {
        maxWidth: 1024,
        options: {
          particles: {
            number: { value: 30, density: { enable: true, area: 800 } },
            move: { speed: 1.0 },
            links: { distance: 130 }
          },
          interactivity: {
            modes: {
              grab: { distance: 120, links: { opacity: 0.5 } },
              repulse: { distance: 100 }
            }
          }
        }
      },
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 15, density: { enable: true, area: 700 } },
            move: { speed: 0.8 },
            links: { distance: 100 }
          }
        }
      },
      {
        maxWidth: 99999, // Grands écrans
        options: {
          particles: {
            number: { value: 55, density: { enable: true, area: 1000 } },
            move: { speed: 1.4 },
            links: { distance: 170 }
          }
        }
      }
    ]
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {init && shouldRender && (
        <Particles
          id="tsparticles"
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          options={options}
        />
      )}
    </div>
  );
};
```

**Curseur Personnalisé** (`client/src/components/CustomCursor.jsx` - extrait):

```jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(74, 144, 226, 0.6);
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.18s ease-out, opacity 0.2s ease, 
              box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.25), 
               inset 0 0 12px rgba(74, 144, 226, 0.15);
`;

const CustomCursor = () => {
  const ringRef = useRef(null);
  const mouseX = useRef(window.innerWidth / 2);
  const mouseY = useRef(window.innerHeight / 2);
  const isDown = useRef(false);
  const isHoveringInteractive = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      const translate = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      
      // Détection des éléments interactifs
      const target = e.target;
      const hovering = !!(target && target.closest && 
        target.closest('a, button, [role="button"], .interactive, .btn, .primary, .secondary'));
      
      if (hovering !== isHoveringInteractive.current) {
        isHoveringInteractive.current = hovering;
        if (hovering) {
          if (ringRef.current) {
            ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.9)';
            ringRef.current.style.boxShadow = 
              '0 0 28px rgba(255, 255, 255, 0.35), inset 0 0 16px rgba(255, 255, 255, 0.25)';
          }
        } else {
          if (ringRef.current) {
            ringRef.current.style.borderColor = 'rgba(74, 144, 226, 0.6)';
            ringRef.current.style.boxShadow = 
              '0 0 20px rgba(74, 144, 226, 0.25), inset 0 0 12px rgba(74, 144, 226, 0.15)';
          }
        }
      }
      
      if (ringRef.current) {
        const scale = isHoveringInteractive.current ? 
          (isDown.current ? 1.05 : 1.15) : 
          (isDown.current ? 0.9 : 1);
        ringRef.current.style.transform = `${translate} scale(${scale})`;
      }
    };

    const onMouseDown = () => {
      isDown.current = true;
      const translate = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `${translate} scale(0.9)`;
    };

    const onMouseUp = () => {
      isDown.current = false;
      const translate = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = translate;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <CursorRing ref={ringRef} />;
};
```

**Intégration dans Home** (`client/src/pages/Home.jsx` - extrait):

```jsx
const Home = () => {
  const [showParticles, setShowParticles] = React.useState(false);

  React.useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isDesktop && !prefersReduced) {
      // Chargement dynamique pour optimiser les performances
      import('../components/ParticlesBackground.jsx').then(mod => {
        ParticlesBackground = mod.default;
        setShowParticles(true);
      }).catch(() => setShowParticles(false));
    }
  }, []);

  return (
    <HomeContainer>
      <CustomCursor />
      <BackgroundCanvas>
        {showParticles && ParticlesBackground && <ParticlesBackground />}
      </BackgroundCanvas>
      
      <Content>
        <TextContent>
          {/* Contenu avec animations Framer Motion */}
        </TextContent>
      </Content>
    </HomeContainer>
  );
};
```

---

## Configuration

**Dépendances** (`client/package.json` - extrait):

```json
{
  "dependencies": {
    "@tsparticles/preset-links": "^3.2.0",
    "@tsparticles/react": "^3.0.0",
    "framer-motion": "^10.16.4",
    "react": "^18.2.0",
    "styled-components": "^6.1.0"
  }
}
```

**Configuration Vite** (`client/vite.config.js`):

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'tsparticles': ['@tsparticles/react', '@tsparticles/preset-links']
        }
      }
    }
  }
});
```

**Styles globaux** (`client/src/styles/GlobalStyle.jsx` - extrait):

```jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
    cursor: none; /* Désactive le curseur par défaut */
  }

  /* Restauration du curseur sur mobile */
  @media (max-width: 768px) {
    body {
      cursor: auto;
    }
  }

  /* Respect des préférences d'accessibilité */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
```

---

## Optimisations et Performance

### Chargement conditionnel
- **Import dynamique** : Les particules ne se chargent que sur desktop
- **Détection d'environnement** : Respect des préférences utilisateur
- **Code splitting** : Séparation du bundle pour optimiser le chargement

### Responsivité intelligente
- **Breakpoints adaptatifs** : Configuration différente par taille d'écran
- **Densité ajustée** : Moins de particules sur petits écrans
- **Performance mobile** : Désactivation complète sur mobile

### Gestion mémoire
- **Cleanup des listeners** : Suppression des event listeners au démontage
- **Limitation FPS** : Cap à 45 FPS pour économiser les ressources
- **Détection Retina** : Optimisation pour les écrans haute résolution

---

## Installation

```bash
cd client
npm install @tsparticles/react @tsparticles/preset-links framer-motion styled-components
npm run start
```

L'application sera accessible sur `http://localhost:3000`

### Variables d'environnement (optionnelles)

```env
VITE_PARTICLES_ENABLED=true
VITE_CURSOR_ENABLED=true
VITE_PERFORMANCE_MODE=auto
```

---

## Fonctionnalités avancées

### Système de particules
- **Liens dynamiques** : Connexions entre particules avec opacité variable
- **Interactions souris** : Grab au survol, push au clic
- **Animations fluides** : Transitions CSS optimisées
- **Responsive design** : Adaptation automatique à la taille d'écran

### Curseur personnalisé
- **Détection d'éléments** : Changement d'apparence sur les éléments interactifs
- **Animations contextuelles** : Scale et couleur selon l'état
- **Performance optimisée** : Utilisation de useRef pour éviter les re-renders
- **Accessibilité** : Désactivation automatique sur mobile

### Intégration Framer Motion
- **Animations d'entrée** : Séquence d'apparition des éléments
- **Transitions fluides** : Délais échelonnés pour un effet naturel
- **Performance** : Utilisation de transform et opacity pour les animations GPU
