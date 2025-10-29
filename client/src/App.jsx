import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './components/Loading.jsx';
import GlobalStyle from './styles/GlobalStyle.jsx';
import usePageTracking from './hooks/usePageTracking.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

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
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const LegalNotices = lazy(() => import('./pages/LegalNotices.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const AppContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
`;

// Composant interne pour avoir accès au Router
function AppContent() {
  // Activer le tracking automatique des pages
  usePageTracking();
  
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Injection GTM maxim. différée (desktop uniquement et après load + idle)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const deferGTM = () => {
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
    if (document.readyState === 'complete') deferGTM();
    else window.addEventListener('load', deferGTM, { once: true });

    // Simulation du chargement des ressources
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', deferGTM);
    };
  }, []);

  if (isLoading) {
    return <Loading progress={progress} />;
  }

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <ThemeIcons theme="auto" />
      </Suspense>
      <AppContainer>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<Loading progress={100} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo/:projectId" element={<ProjectDemo />} />
          <Route path="/offres" element={<Quote />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
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