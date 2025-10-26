import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackTimeOnPage } from '../utils/analytics';

/**
 * Hook personnalisé pour tracker automatiquement les visites de page
 * et le temps passé sur chaque page
 */
export const usePageTracking = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const pageNameRef = useRef('');

  useEffect(() => {
    // Nom de la page basé sur le pathname
    const getPageName = (pathname) => {
      const pageMap = {
        '/': 'Home',
        '/about': 'About',
        '/projects': 'Projects',
        '/skills': 'Skills',
        '/contact': 'Contact',
        '/quote': 'Quote',
        '/privacy-policy': 'Privacy Policy',
        '/legal-notices': 'Legal Notices'
      };
      
      // Si c'est une démo de projet
      if (pathname.startsWith('/demo/')) {
        const projectId = pathname.split('/demo/')[1];
        return `Project Demo: ${projectId}`;
      }
      
      return pageMap[pathname] || pathname;
    };

    const pageName = getPageName(location.pathname);
    pageNameRef.current = pageName;
    
    // Track la nouvelle page
    trackPageView(pageName);
    
    // Reset le timer
    startTimeRef.current = Date.now();

    // Track le temps passé sur la page lors du changement
    return () => {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000;
      if (timeSpent > 0) {
        trackTimeOnPage(pageNameRef.current, timeSpent);
      }
    };
  }, [location]);
};

export default usePageTracking;

