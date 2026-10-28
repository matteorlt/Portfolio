import React from 'react';
import styled from 'styled-components';

/** Grain papier très léger posé sur tout le site (purement décoratif). */
const Grain = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  opacity: 0.07;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 200px 200px;
`;

export default function SiteAtmosphere() {
  return <Grain aria-hidden />;
}
