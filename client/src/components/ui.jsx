import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

/** Variables du thème sombre : posées sur une bande, elles retournent tous les composants enfants. */
export const darkTokens = css`
  --color-bg: var(--ink);
  --color-bg-2: #141412;
  --color-surface: var(--ink-2);
  --color-surface-elevated: #1f1f1c;
  --color-text: var(--paper);
  --color-muted: #a6a299;
  --color-line: rgba(243, 241, 236, 0.12);
  --color-line-strong: rgba(243, 241, 236, 0.3);
  --color-accent: var(--lime);
  --color-accent-ink: var(--ink);
  --color-accent-muted: rgba(212, 255, 63, 0.1);
`;

/** Bande pleine largeur ; `$dark` pour une section sur fond encre. */
export const Band = styled.section`
  position: relative;
  width: 100%;
  background: var(--color-bg);
  color: var(--color-text);
  ${({ $dark }) => $dark && darkTokens}
`;

export const Container = styled.div`
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  padding: clamp(4.5rem, 11vw, 8.5rem) var(--page-pad-r) clamp(4.5rem, 11vw, 8.5rem) var(--page-pad-x);
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 1.1rem;

  &::before {
    content: '';
    width: 22px;
    height: 1px;
    background: currentColor;
  }
`;

export const SectionHead = styled.header`
  display: grid;
  gap: 1.25rem 4rem;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: end;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.3rem, 6vw, 4.6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.95;
  color: var(--color-text);
`;

export const SectionLead = styled(motion.p)`
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.65;
  color: var(--color-muted);
  max-width: 34rem;
`;

/** Surlignage citron façon marqueur, lisible sur les deux fonds. */
export const Mark = styled.span`
  position: relative;
  white-space: nowrap;
  color: var(--ink);
  padding: 0 0.12em;
  margin: 0 -0.04em;
  background: linear-gradient(transparent 8%, var(--lime) 8%, var(--lime) 92%, transparent 92%);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  border-radius: 0.08em;
`;

const buttonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 54px;
  padding: 0 1.55rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  isolation: isolate;
  transition: color 0.35s var(--ease-out), border-color 0.35s var(--ease-out), background 0.35s var(--ease-out);

  svg {
    flex-shrink: 0;
    transition: transform 0.35s var(--ease-out);
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

/** Bouton plein : encre sur papier, citron sur encre ; remplissage citron au survol. */
export const ButtonPrimary = styled.a`
  ${buttonBase}
  background: var(--color-accent);
  color: var(--color-accent-ink);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: var(--lime);
    transform: translateY(101%);
    transition: transform 0.45s var(--ease-out);
  }

  &:hover {
    color: var(--ink);
  }

  &:hover::before {
    transform: translateY(0);
  }
`;

export const ButtonGhost = styled.a`
  ${buttonBase}
  border: 1px solid var(--color-line-strong);
  color: var(--color-text);
  background: transparent;

  &:hover {
    border-color: var(--color-text);
    background: var(--color-accent-muted);
  }
`;

export const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
};

export const revealDelay = (delay) => ({ ...reveal, transition: { ...reveal.transition, delay } });
