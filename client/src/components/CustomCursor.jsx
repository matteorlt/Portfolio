import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  pointer-events: none;
  z-index: 9800;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  will-change: transform;
`;

const Ring = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(200, 242, 74, 0.55);
  pointer-events: none;
  z-index: 9799;
  transform: translate(-50%, -50%);
  will-change: transform, width, height, background;
  transition:
    width 0.28s var(--ease-out),
    height 0.28s var(--ease-out),
    background 0.28s var(--ease-out),
    border-color 0.28s var(--ease-out);
`;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hover = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(mq.matches && !reduced.matches);
    sync();
    mq.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-cursor');
      return undefined;
    }
    document.documentElement.classList.add('has-cursor');

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const t = e.target;
      hover.current = !!(t && t.closest && t.closest('a, button, [role="button"], input, textarea, select, .magnetic'));
    };

    let raf = 0;
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const size = hover.current ? 56 : 36;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.background = hover.current ? 'rgba(200, 242, 74, 0.12)' : 'transparent';
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Dot ref={dotRef} aria-hidden />
      <Ring ref={ringRef} aria-hidden />
    </>
  );
}
