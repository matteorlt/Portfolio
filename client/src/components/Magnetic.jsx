import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: inline-flex;
  will-change: transform;
`;

const Inner = styled.div`
  display: inline-flex;
  transition: transform 0.35s var(--ease-out);
  will-change: transform;
`;

export default function Magnetic({ children, strength = 0.28, className }) {
  const innerRef = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = 'translate(0, 0)';
  };

  return (
    <Wrap className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <Inner ref={innerRef}>{children}</Inner>
    </Wrap>
  );
}
