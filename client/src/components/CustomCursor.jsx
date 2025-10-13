import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 1);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: transform 0.08s ease-out, background 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.6);
`;

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(74, 144, 226, 0.6);
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.18s ease-out, opacity 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.25), inset 0 0 12px rgba(74, 144, 226, 0.15);
`;

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(window.innerWidth / 2);
  const mouseY = useRef(window.innerHeight / 2);
  const isDown = useRef(false);
  const isHoveringInteractive = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      const translate = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      const target = e.target;
      const hovering = !!(target && target.closest && target.closest('a, button, [role="button"], .interactive, .btn, .primary, .secondary'));
      if (hovering !== isHoveringInteractive.current) {
        isHoveringInteractive.current = hovering;
        if (hovering) {
          if (dotRef.current) {
            dotRef.current.style.background = 'rgba(255, 255, 255, 1)';
            dotRef.current.style.boxShadow = '0 0 14px rgba(255, 255, 255, 0.7)';
          }
          if (ringRef.current) {
            ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.9)';
            ringRef.current.style.boxShadow = '0 0 28px rgba(255, 255, 255, 0.35), inset 0 0 16px rgba(255, 255, 255, 0.25)';
          }
        } else {
          if (dotRef.current) {
            dotRef.current.style.background = 'rgba(74, 144, 226, 1)';
            dotRef.current.style.boxShadow = '0 0 10px rgba(74, 144, 226, 0.6)';
          }
          if (ringRef.current) {
            ringRef.current.style.borderColor = 'rgba(74, 144, 226, 0.6)';
            ringRef.current.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.25), inset 0 0 12px rgba(74, 144, 226, 0.15)';
          }
        }
      }
      if (dotRef.current) dotRef.current.style.transform = translate;
      if (ringRef.current) {
        const scale = isHoveringInteractive.current ? (isDown.current ? 1.05 : 1.15) : (isDown.current ? 0.9 : 1);
        ringRef.current.style.transform = `${translate} scale(${scale})`;
      }
    };

    const onMouseDown = () => {
      isDown.current = true;
      const translate = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `${translate} scale(0.9)`;
    };

    const onMouseUp = () => {
      isDown.current = false;
      const translate = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = translate;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <CursorRing ref={ringRef} />
    </>
  );
};

export default CustomCursor;


