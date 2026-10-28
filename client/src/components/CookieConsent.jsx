import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { darkTokens } from './ui.jsx';

const Backdrop = styled.div`
  ${darkTokens}
  position: fixed;
  left: max(0.75rem, env(safe-area-inset-left));
  right: max(0.75rem, env(safe-area-inset-right));
  bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
  z-index: 9999;
  max-width: 1080px;
  margin: 0 auto;
  padding: 1.1rem 1.25rem;
  border-radius: 20px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-line);
  box-shadow: 0 30px 80px -24px rgba(15, 15, 13, 0.6);
`;

const Inner = styled.div`
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
  background: var(--color-accent-muted);
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
    color: var(--color-text);
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
  border-radius: 999px;
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
  border: 1px solid var(--color-line-strong);
  background: transparent;
  color: var(--color-text);

  &:hover {
    border-color: var(--color-text);
  }
`;

const BtnPrimary = styled(Btn)`
  border: none;
  background: var(--color-accent);
  color: var(--color-accent-ink);

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
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  injectScript('https://www.googletagmanager.com/gtag/js?id=G-F9XDS90C1K');
  gtag('config', 'G-F9XDS90C1K', {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=None;Secure',
    cookie_expires: 0,
    client_storage: 'none'
  });

  gtag('config', 'AW-17634174804', {
    anonymize_ip: true,
    allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=None;Secure',
    cookie_expires: 0,
    client_storage: 'none'
  });

  loadMicrosoftClarity();

  window.dispatchEvent(new Event('consentGranted'));
}

const CookieConsent = () => {
  const [visible, setVisible] = React.useState(false);

  /* Le footer permet de rouvrir le bandeau pour modifier son choix (exigence CNIL). */
  React.useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener('open-cookie-consent', reopen);
    return () => window.removeEventListener('open-cookie-consent', reopen);
  }, []);

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
              J’utilise des cookies pour la mesure d’audience (Google Analytics), la publicité (Google Ads) et
              l’analyse de parcours (Microsoft Clarity). Les scripts associés ne sont chargés qu’avec votre accord.{' '}
              <PolicyLink to="/privacy-policy">Politique de confidentialité</PolicyLink>
            </Text>
          </Copy>
        </Lead>
        <Actions>
          <BtnGhost
            type="button"
            onClick={() => {
              const wasGranted = window.__consentGranted === true;
              localStorage.setItem('cookie_consent_v1', 'denied');
              window.__consentGranted = false;
              setVisible(false);
              // Les scripts déjà chargés ne se déchargent pas : on recharge pour retirer le suivi.
              if (wasGranted) window.location.reload();
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
