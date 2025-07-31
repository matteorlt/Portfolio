import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const ThemeIcons = ({ theme = 'auto' }) => {
  const [currentTheme, setCurrentTheme] = useState('bright');

  useEffect(() => {
    // Fonction pour détecter le thème système
    const detectSystemTheme = () => {
      if (theme === 'auto') {
        // Détecte la préférence système
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDarkMode ? 'dark' : 'bright';
      }
      return theme === 'dark' ? 'dark' : 'bright';
    };

    // Fonction pour changer les icônes selon le thème
    const updateIcons = () => {
      const detectedTheme = detectSystemTheme();
      setCurrentTheme(detectedTheme);
      
      const favicon = document.querySelector('link[rel="icon"]');
      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
      const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
      
      const iconPath = `/ico/${detectedTheme}`;
      
      if (favicon) favicon.href = `${iconPath}/favicon.ico`;
      if (appleTouchIcon) appleTouchIcon.href = `${iconPath}/apple-touch-icon.png`;
      if (favicon32) favicon32.href = `${iconPath}/favicon-32x32.png`;
      if (favicon16) favicon16.href = `${iconPath}/favicon-16x16.png`;
    };

    // Mise à jour initiale
    updateIcons();

    // Écoute les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      updateIcons();
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [theme]);

  return (
    <Helmet>
      <link rel="icon" href={`/ico/${currentTheme}/favicon.ico`} />
      <link rel="apple-touch-icon" href={`/ico/${currentTheme}/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/ico/${currentTheme}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/ico/${currentTheme}/favicon-16x16.png`} />
    </Helmet>
  );
};

export default ThemeIcons; 