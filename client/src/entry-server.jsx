import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import App from './App.jsx';

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

/** Rend une route en HTML statique + les styles styled-components correspondants. */
export async function render(url) {
  const sheet = new ServerStyleSheet();
  try {
    const { prelude } = await prerenderToNodeStream(
      sheet.collectStyles(
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      )
    );
    const html = await streamToString(prelude);
    return { html, styles: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
