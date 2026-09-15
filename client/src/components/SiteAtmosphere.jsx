import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Grain = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 180px 180px;
`;

const drift = keyframes`
  0% { transform: translate3d(-8%, -6%, 0) scale(1); }
  50% { transform: translate3d(6%, 8%, 0) scale(1.08); }
  100% { transform: translate3d(-8%, -6%, 0) scale(1); }
`;

const Glow = styled.div`
  position: fixed;
  width: min(70vw, 720px);
  height: min(70vw, 720px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(200, 242, 74, 0.09) 0%, rgba(200, 242, 74, 0.02) 42%, transparent 70%);
  filter: blur(8px);
  transform: translate(-50%, -50%);
  will-change: transform, left, top;
  animation: ${drift} 18s var(--ease-out) infinite;
  mix-blend-mode: screen;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }

  @media (max-width: 720px) {
    opacity: 0.55;
  }
`;

const Veil = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 50% at 80% -10%, rgba(200, 242, 74, 0.06), transparent 50%),
    radial-gradient(ellipse 60% 40% at 0% 100%, rgba(90, 110, 70, 0.12), transparent 55%);
`;

export default function SiteAtmosphere() {
  const glowRef = useRef(null);
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.7 : 400, y: 180 });
  const target = useRef({ ...pos.current });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.06;
      pos.current.y += (target.current.y - pos.current.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.left = `${pos.current.x}px`;
        glowRef.current.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Veil aria-hidden />
      <Glow ref={glowRef} aria-hidden />
      <Grain aria-hidden />
    </>
  );
}
