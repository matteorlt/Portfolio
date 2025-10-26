/**
 * Utilitaire pour le tracking analytics
 * Supporte Google Analytics (gtag) et autres événements personnalisés
 */

// Fonction pour tracker un événement de page vue
export const trackPageView = (pageName) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
  
  // Console log pour debug en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', pageName);
  }
};

// Fonction pour tracker les clics
export const trackClick = (elementName, category = 'user_action', value = null) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: category,
      event_label: elementName,
      value: value,
      non_interaction: false
    });
  }
  
  // Console log pour debug en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('🖱️ Click:', { elementName, category, value });
  }
};

// Fonction pour tracker les téléchargements
export const trackDownload = (fileName, category = 'download') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      event_category: category,
      event_label: fileName
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📥 Download:', fileName);
  }
};

// Fonction pour tracker les liens externes
export const trackExternalLink = (url, category = 'external_link') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'external_link_click', {
      event_category: category,
      event_label: url,
      external_url: url
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔗 External Link:', url);
  }
};

// Fonction pour tracker les interactions de formulaire
export const trackFormEvent = (formName, eventType, data = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_' + eventType, {
      event_category: 'form',
      form_name: formName,
      ...data
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📝 Form Event:', { formName, eventType, data });
  }
};

// Fonction pour tracker les vidéos
export const trackVideo = (videoName, action, category = 'video') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'video_' + action, {
      video_title: videoName,
      event_category: category
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🎬 Video:', { videoName, action });
  }
};

// Fonction pour tracker le scroll
export const trackScroll = (percentage) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      value: percentage
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📜 Scroll:', percentage + '%');
  }
};

// Fonction pour tracker le temps passé sur une page
export const trackTimeOnPage = (pageName, timeInSeconds) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'time_on_page', {
      page_title: pageName,
      value: Math.round(timeInSeconds),
      event_category: 'engagement'
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('⏱️ Time on Page:', { pageName, timeInSeconds: Math.round(timeInSeconds) });
  }
};

// Fonction pour tracker les conversions (ex: devis, contact)
export const trackConversion = (conversionType, value = null, currency = 'EUR') => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: conversionType,
      value: value,
      currency: currency
    });
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Conversion:', { conversionType, value, currency });
  }
};

// Hook React pour tracker les événements de manière plus simple
export const useAnalytics = () => {
  return {
    trackPageView,
    trackClick,
    trackDownload,
    trackExternalLink,
    trackFormEvent,
    trackVideo,
    trackScroll,
    trackTimeOnPage,
    trackConversion
  };
};

