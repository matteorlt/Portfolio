import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg: #0a0a0a;
    --color-surface: #111111;
    --color-surface-elevated: #161616;
    /* Bleu plus foncé / désaturé — lisible sur fond sombre sans effet « flashy » */
    --color-accent: #5b7aad;
    --color-accent-muted: rgba(91, 122, 173, 0.16);
    --color-text: #f4f4f0;
    --color-muted: #a3a3a3;
    --font-display: 'Syne', system-ui, sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
    --font-hero: 'Outfit', system-ui, sans-serif;
    --page-pad-x: max(24px, env(safe-area-inset-left, 0px));
    --page-pad-r: max(24px, env(safe-area-inset-right, 0px));
    --page-pad-b: max(0.5rem, env(safe-area-inset-bottom, 0px));
    --nav-h: 72px;
    --scroll-margin: calc(var(--nav-h) + 20px + env(safe-area-inset-top, 0px));
  }

  @media (min-width: 768px) {
    :root {
      --scroll-margin: calc(var(--nav-h) + 24px + env(safe-area-inset-top, 0px));
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: var(--color-bg);
    min-height: 100%;
  }

  body {
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    min-height: 100vh;
    background: var(--color-bg);
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #111;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #444;
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

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-accent);
  }

  button,
  a[role='button'] {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    touch-action: manipulation;
  }

  @media (max-width: 768px) {
    body {
      font-size: 15px;
    }
  }

  section[id] {
    scroll-margin-top: var(--scroll-margin);
  }
`;

export default GlobalStyle;
