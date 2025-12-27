import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle.jsx';
import usePageTracking from './hooks/usePageTracking.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import CookieConsent from './components/CookieConsent.jsx';

// Lazy-load des composants globaux pour réduire le JS initial
const Navbar = React.lazy(() => import('./components/Navbar.jsx'));
const Footer = React.lazy(() => import('./components/Footer.jsx'));
const ThemeIcons = React.lazy(() => import('./components/ThemeIcons.jsx'));

// Lazy loading pour améliorer les performances
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Skills = lazy(() => import('./pages/Skills.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const ProjectDemo = lazy(() => import('./pages/ProjectDemo.jsx'));
const Quote = lazy(() => import('./pages/Quote.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const LegalNotices = lazy(() => import('./pages/LegalNotices.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  background-attachment: fixed;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: calc(100vh - 80px);
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Composant pour les routes avec animations
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll vers le haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <PageWrapper
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo/:projectId" element={<ProjectDemo />} />
            <Route path="/offres" element={<Quote />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </AnimatePresence>
  );
}

// Composant interne pour avoir accès au Router
function AppContent() {
  // Activer le tracking automatique des pages
  usePageTracking();

  useEffect(() => {
    // Ne charger GTM que si le consentement a été accordé
    const checkConsentAndLoadGTM = () => {
      const consent = localStorage.getItem('cookie_consent_v1');
      if (consent !== 'granted') return;
      
      // Vérifier si GTM n'est pas déjà chargé
      if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;
      
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) return;
      
      const loadScript = () => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-N2CMQQZD';
        document.head.appendChild(script);
      };
      
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadScript, { timeout: 3000 });
      } else {
        setTimeout(loadScript, 1500);
      }
    };
    
    // Vérifier immédiatement si le consentement existe déjà
    checkConsentAndLoadGTM();
    
    // Écouter l'événement de consentement accordé
    const handleConsentGranted = () => {
      checkConsentAndLoadGTM();
    };
    window.addEventListener('consentGranted', handleConsentGranted);
    
    // Écouter les changements de consentement via localStorage (autres onglets)
    const handleStorageChange = (e) => {
      if (e.key === 'cookie_consent_v1' && e.newValue === 'granted') {
        checkConsentAndLoadGTM();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('consentGranted', handleConsentGranted);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <ThemeIcons theme="auto" />
      </Suspense>
      <AppContainer>
        <CookieConsent />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <AnimatedRoutes />
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </AppContainer>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App; 