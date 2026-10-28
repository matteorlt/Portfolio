import { createGlobalStyle } from 'styled-components';

/**
 * Thème « atelier » : papier clair + encre, vert citron réservé aux surlignages.
 * Les sections sombres (<Band $dark>) redéfinissent les mêmes variables : les composants
 * s’adaptent sans connaître le fond sur lequel ils sont posés.
 *   --color-accent      couleur d’action sur le fond courant (encre sur papier, citron sur encre)
 *   --color-accent-ink  texte posé sur --color-accent
 *   --lime              citron de marque, toujours utilisé en aplat avec du texte encre
 */
const GlobalStyle = createGlobalStyle`
  :root {
    --paper: #f3f1ec;
    --paper-2: #e9e6de;
    --ink: #0f0f0d;
    --ink-2: #181816;
    --lime: #d4ff3f;

    --color-bg: var(--paper);
    --color-bg-2: var(--paper-2);
    --color-surface: #ffffff;
    --color-surface-elevated: #ffffff;
    --color-text: var(--ink);
    --color-muted: #5d5a53;
    --color-line: rgba(15, 15, 13, 0.12);
    --color-line-strong: rgba(15, 15, 13, 0.28);
    --color-accent: var(--ink);
    --color-accent-ink: var(--paper);
    --color-accent-muted: rgba(15, 15, 13, 0.06);

    --font-display: 'Bricolage Grotesque', 'Arial Narrow', system-ui, sans-serif;
    --font-body: 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --font-mono: 'Geist Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
    --font-serif: var(--font-display);
    --font-hero: var(--font-display);

    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --radius: 22px;
    --page-pad-x: max(20px, env(safe-area-inset-left, 0px));
    --page-pad-r: max(20px, env(safe-area-inset-right, 0px));
    --page-pad-b: max(0.5rem, env(safe-area-inset-bottom, 0px));
    --nav-h: 72px;
    --scroll-margin: calc(var(--nav-h) + 20px + env(safe-area-inset-top, 0px));
    --max: 1320px;
  }

  @media (min-width: 768px) {
    :root {
      --page-pad-x: max(40px, env(safe-area-inset-left, 0px));
      --page-pad-r: max(40px, env(safe-area-inset-right, 0px));
      --scroll-margin: calc(var(--nav-h) + 28px + env(safe-area-inset-top, 0px));
    }
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: var(--color-bg);
    min-height: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
    min-height: 100vh;
    min-height: 100dvh;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'ss01', 'cv11';
  }

  #root {
    min-height: 100vh;
    background: var(--color-bg);
    isolation: isolate;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  ::selection {
    background: var(--lime);
    color: var(--ink);
  }

  :focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 3px;
    border-radius: 4px;
  }

  code {
    font-family: var(--font-mono);
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--paper-2);
  }

  ::-webkit-scrollbar-thumb {
    background: #b9b5ab;
    border-radius: 99px;
    border: 2px solid var(--paper-2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #8f8b82;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
  }

  button,
  a[role='button'] {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    touch-action: manipulation;
  }

  img,
  video {
    max-width: 100%;
    display: block;
  }

  section[id] {
    scroll-margin-top: var(--scroll-margin);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  html.has-cursor,
  html.has-cursor * {
    cursor: none !important;
  }

  html.has-cursor input,
  html.has-cursor textarea,
  html.has-cursor select,
  html.has-cursor input *,
  html.has-cursor textarea * {
    cursor: text !important;
  }

  @media (max-width: 768px) {
    body {
      font-size: 15px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyle;
