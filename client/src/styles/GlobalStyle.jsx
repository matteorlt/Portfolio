import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg: #070706;
    --color-bg-2: #0d0d0b;
    --color-surface: #121210;
    --color-surface-elevated: #181816;
    --color-accent: #c8f24a;
    --color-accent-ink: #10110c;
    --color-accent-muted: rgba(200, 242, 74, 0.12);
    --color-text: #f2eee6;
    --color-muted: #9a958c;
    --color-line: rgba(242, 238, 230, 0.1);
    --font-display: 'Syne', system-ui, sans-serif;
    --font-serif: 'Instrument Serif', Georgia, serif;
    --font-body: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;
    --font-hero: 'Syne', system-ui, sans-serif;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --page-pad-x: max(20px, env(safe-area-inset-left, 0px));
    --page-pad-r: max(20px, env(safe-area-inset-right, 0px));
    --page-pad-b: max(0.5rem, env(safe-area-inset-bottom, 0px));
    --nav-h: 76px;
    --scroll-margin: calc(var(--nav-h) + 20px + env(safe-area-inset-top, 0px));
    --max: 1280px;
  }

  @media (min-width: 768px) {
    :root {
      --page-pad-x: max(32px, env(safe-area-inset-left, 0px));
      --page-pad-r: max(32px, env(safe-area-inset-right, 0px));
      --scroll-margin: calc(var(--nav-h) + 28px + env(safe-area-inset-top, 0px));
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
    text-rendering: optimizeLegibility;
  }

  #root {
    min-height: 100vh;
    background: var(--color-bg);
    isolation: isolate;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  ::selection {
    background: var(--color-accent);
    color: var(--color-accent-ink);
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  code {
    font-family: var(--font-mono);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #0b0b09;
  }

  ::-webkit-scrollbar-thumb {
    background: #2a2a26;
    border-radius: 99px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3c3c36;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.25s var(--ease-out);
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

  img {
    max-width: 100%;
    display: block;
  }

  section[id] {
    scroll-margin-top: var(--scroll-margin);
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
