import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi';

const Frame = styled(motion.figure)`
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--color-line);
  background: #070706;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  aspect-ratio: 16 / 9;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Controls = styled.div`
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 600px) {
    right: 0.5rem;
    bottom: 0.5rem;
    gap: 0.35rem;
  }
`;

const ControlBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  height: 42px;
  min-width: 42px;
  padding: 0 0.85rem;
  border-radius: 999px;
  background: rgba(7, 7, 6, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(242, 238, 230, 0.16);
  color: var(--color-text);
  font-size: 0.82rem;
  font-weight: 600;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  @media (max-width: 600px) {
    height: 34px;
    min-width: 34px;
    padding: 0;

    span {
      display: none;
    }
  }
`;

/**
 * Motion design de présentation : lecture automatique en muet quand la vidéo est visible
 * (pause hors écran), bouton pour activer le son. Pas d’autoplay si l’utilisateur limite les animations.
 */
export default function Showreel() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let inView = false;
    const tryPlay = () => {
      if (inView && !userPaused.current && video.paused) {
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) tryPlay();
        else video.pause();
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    // Au chargement (vidéo dans le hero), le premier play() peut partir avant que le média soit prêt.
    video.addEventListener('canplay', tryPlay);
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', tryPlay);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  };

  return (
    <Frame
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        src="/videos/motion-design.mp4"
        poster="/videos/motion-design-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
        width={1600}
        height={900}
        aria-label="Présentation en motion design : du brief à la mise en ligne de votre site"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <Controls>
        <ControlBtn type="button" onClick={togglePlay} aria-label={playing ? 'Mettre en pause' : 'Lire la vidéo'}>
          {playing ? <FiPause aria-hidden size={17} /> : <FiPlay aria-hidden size={17} />}
        </ControlBtn>
        <ControlBtn
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
        >
          {muted ? <FiVolumeX aria-hidden size={17} /> : <FiVolume2 aria-hidden size={17} />}
          <span aria-hidden>{muted ? 'Activer le son' : 'Couper le son'}</span>
        </ControlBtn>
      </Controls>
    </Frame>
  );
}
