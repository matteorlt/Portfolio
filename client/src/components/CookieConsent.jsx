import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 9999;
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: 1px solid rgba(74, 144, 226, 0.4);
  background: transparent;
  color: #93c5fd;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  &:hover { background: rgba(74, 144, 226, 0.12); }
  &.primary { background: #3b82f6; color: #fff; border-color: #3b82f6; }
`;

function injectScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function enableConsentAndLoadTags() {
  window.__consentGranted = true;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  // Charger GA4
  injectScript('https://www.googletagmanager.com/gtag/js?id=G-F9XDS90C1K');
  gtag('config', 'G-F9XDS90C1K');
  // Charger Google Ads si souhaité
  injectScript('https://www.googletagmanager.com/gtag/js?id=AW-17634174804');
  gtag('config', 'AW-17634174804');
}

const CookieConsent = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem('cookie_consent_v1');
    if (stored === 'granted') {
      enableConsentAndLoadTags();
      setVisible(false);
    } else if (stored === 'denied') {
      window.__consentGranted = false;
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <Banner role="dialog" aria-live="polite" aria-label="Bannière de consentement aux cookies">
      Nous utilisons des cookies à des fins de mesure d’audience (GA4) et publicitaires (Google Ads). 
      Vous pouvez accepter ou refuser.
      <Actions>
        <Button
          onClick={() => {
            localStorage.setItem('cookie_consent_v1', 'denied');
            window.__consentGranted = false;
            setVisible(false);
          }}
        >Refuser</Button>
        <Button
          className="primary"
          onClick={() => {
            localStorage.setItem('cookie_consent_v1', 'granted');
            enableConsentAndLoadTags();
            setVisible(false);
          }}
        >Accepter</Button>
      </Actions>
    </Banner>
  );
};

export default CookieConsent;


