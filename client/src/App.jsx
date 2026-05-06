import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
const ProjectDemo = lazy(() => import('./pages/ProjectDemo.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const LegalNotices = lazy(() => import('./pages/LegalNotices.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  position: relative;
  overflow-x: hidden;
`;

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: calc(100dvh - var(--nav-h));
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
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/projects" element={<Navigate to="/#realisations" replace />} />
            <Route path="/skills" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/demo/:projectId" element={<ProjectDemo />} />
            <Route path="/offres" element={<Navigate to="/#offres" replace />} />
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

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <ThemeIcons />
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