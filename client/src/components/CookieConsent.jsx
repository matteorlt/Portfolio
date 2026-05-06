import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

const Backdrop = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 1rem max(1.25rem, env(safe-area-inset-left)) calc(1rem + env(safe-area-inset-bottom, 0px)) max(1.25rem, env(safe-area-inset-right));
  background: rgba(10, 10, 10, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.45);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;

  @media (min-width: 880px) {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Lead = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  min-width: 0;
  flex: 1;
`;

const IconWrap = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.22);
  color: var(--color-accent);
  font-size: 1.15rem;
`;

const Copy = styled.div`
  min-width: 0;
`;

const Title = styled.p`
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 0.35rem;
`;

const Text = styled.p`
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--color-muted);
  margin: 0;
`;

const PolicyLink = styled(Link)`
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #93c5fd;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  flex-shrink: 0;

  @media (min-width: 880px) {
    margin-left: auto;
  }

  @media (max-width: 879px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Btn = styled.button`
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1.1rem;
  min-height: 48px;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  @media (min-width: 880px) {
    flex: 0 0 auto;
    min-width: 7rem;
  }

  @media (max-width: 879px) {
    width: 100%;
  }
`;

const BtnGhost = styled(Btn)`
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text);

  &:hover {
    border-color: rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.07);
  }
`;

const BtnPrimary = styled(Btn)`
  border: none;
  background: var(--color-accent);
  color: #0a0a0a;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

function injectScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Microsoft Clarity — même déclencheur que la mesure d’audience (consentement cookies). */
const CLARITY_PROJECT_ID = 'wmmdmn1l4y';

function loadMicrosoftClarity() {
  if (document.querySelector(`script[src*="clarity.ms/tag/${CLARITY_PROJECT_ID}"]`)) return;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
}

function enableConsentAndLoadTags() {
  window.__consentGranted = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());

  injectScript('https://www.googletagmanager.com/gtag/js?id=G-F9XDS90C1K');
  gtag('config', 'G-F9XDS90C1K', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  injectScript('https://www.googletagmanager.com/gtag/js?id=AW-17634174804');
  gtag('config', 'AW-17634174804', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  setTimeout(() => {
    if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-N2CMQQZD';
      document.head.appendChild(gtmScript);
    }
  }, 500);

  loadMicrosoftClarity();

  window.dispatchEvent(new Event('consentGranted'));
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
    <Backdrop role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-desc">
      <Inner>
        <Lead>
          <IconWrap aria-hidden>
            <FiShield strokeWidth={2} />
          </IconWrap>
          <Copy>
            <Title id="cookie-banner-title">Cookies &amp; confidentialité</Title>
            <Text id="cookie-banner-desc">
              Nous utilisons des cookies pour la mesure d’audience (Google Analytics), à la publicité (Google Ads) et
              pour l’analyse de parcours (Microsoft Clarity). Les scripts associés ne sont chargés qu’avec votre accord.{' '}
              <PolicyLink to="/privacy-policy">Politique de confidentialité</PolicyLink>
            </Text>
          </Copy>
        </Lead>
        <Actions>
          <BtnGhost
            type="button"
            onClick={() => {
              localStorage.setItem('cookie_consent_v1', 'denied');
              window.__consentGranted = false;
              setVisible(false);
            }}
          >
            Refuser
          </BtnGhost>
          <BtnPrimary
            type="button"
            onClick={() => {
              localStorage.setItem('cookie_consent_v1', 'granted');
              enableConsentAndLoadTags();
              setVisible(false);
            }}
          >
            Accepter
          </BtnPrimary>
        </Actions>
      </Inner>
    </Backdrop>
  );
};

export default CookieConsent;
