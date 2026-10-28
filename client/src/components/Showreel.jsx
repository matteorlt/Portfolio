import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiVolume1, FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi';

const Frame = styled(motion.figure)`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--ink);
  box-shadow:
    0 0 0 1px rgba(15, 15, 13, 0.9),
    0 40px 90px -30px rgba(15, 15, 13, 0.55);
  aspect-ratio: 16 / 9;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

/* Lecture/pause à gauche, son à droite. */
const Controls = styled.div`
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: 0.85rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 600px) {
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
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
  color: var(--paper);
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: var(--lime);
    color: var(--lime);
  }

  @media (max-width: 600px) {
    height: 34px;
    min-width: 34px;
    padding: 0;
  }
`;

/* Son : icône muet/actif + barre de volume qui se déplie au survol (souris uniquement). */
const Volume = styled.div`
  display: inline-flex;
  align-items: center;
  height: 42px;
  border-radius: 999px;
  background: rgba(7, 7, 6, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(242, 238, 230, 0.16);
  transition: border-color 0.2s ease;

  ${ControlBtn} {
    height: 40px;
    min-width: 40px;
    padding: 0;
    background: none;
    border: none;
    backdrop-filter: none;
  }

  input {
    width: 0;
    opacity: 0;
    margin: 0;
    transition: width 0.35s var(--ease-out), opacity 0.25s ease, margin 0.35s var(--ease-out);
  }

  &:hover,
  &:focus-within {
    border-color: rgba(242, 238, 230, 0.32);

    input {
      width: 84px;
      opacity: 1;
      margin-left: 0.85rem;
    }
  }

  @media (max-width: 600px) {
    height: 34px;

    ${ControlBtn} {
      height: 32px;
      min-width: 32px;
    }
  }

  /* Sur écran tactile, le volume se règle avec les boutons du téléphone : icône seule. */
  @media (hover: none) {
    input {
      display: none;
    }
  }
`;

const VolumeRange = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 99px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--lime) 0%,
    var(--lime) var(--val),
    rgba(243, 241, 236, 0.28) var(--val),
    rgba(243, 241, 236, 0.28) 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--paper);
    border: none;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--paper);
    border: none;
  }

  &:focus-visible {
    outline: 2px solid var(--lime);
    outline-offset: 4px;
  }
`;

const flash = keyframes`
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
  25% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
`;

/** Icône lecture/pause qui apparaît puis s’efface au centre, comme sur YouTube. */
const Flash = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(15, 15, 13, 0.6);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: var(--paper);
  pointer-events: none;
  opacity: 0;
  animation: ${flash} 0.7s var(--ease-out) forwards;

  svg {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;

    svg {
      width: 26px;
      height: 26px;
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
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);
  // `key` change à chaque clic pour rejouer l’animation.
  const [flashState, setFlashState] = useState(null);
  const userPaused = useRef(false);
  // Le son n’est jamais activé sans action explicite de l’utilisateur.
  const userWantsSound = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // React ne pose pas toujours l’attribut `muted` sur le HTML pré-rendu : on le force au montage.
    video.defaultMuted = true;
    video.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let inView = false;
    const tryPlay = () => {
      if (inView && !userPaused.current && video.paused) {
        video.muted = !userWantsSound.current;
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
    const willPlay = video.paused;
    if (willPlay) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
    setFlashState((prev) => ({ icon: willPlay ? 'play' : 'pause', key: (prev?.key || 0) + 1 }));
  };

  const applySound = (nextMuted, nextVolume = volume) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = nextVolume;
    video.muted = nextMuted;
    userWantsSound.current = !nextMuted;
    setMuted(nextMuted);
    setVolume(nextVolume);
    if (!nextMuted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  };

  // Réactiver le son à volume nul n’aurait aucun effet : on repart à un niveau audible.
  const toggleSound = () => applySound(!muted, muted && volume === 0 ? 0.6 : volume);

  const onVolumeChange = (e) => {
    const v = Number(e.target.value);
    applySound(v === 0, v);
  };

  const silent = muted || volume === 0;
  const VolumeIcon = silent ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2;

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
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {flashState ? (
        <Flash key={flashState.key} aria-hidden>
          {flashState.icon === 'play' ? <FiPlay style={{ marginLeft: 4 }} /> : <FiPause />}
        </Flash>
      ) : null}
      <Controls>
        <ControlBtn type="button" onClick={togglePlay} aria-label={playing ? 'Mettre en pause' : 'Lire la vidéo'}>
          {playing ? <FiPause aria-hidden size={17} /> : <FiPlay aria-hidden size={17} />}
        </ControlBtn>
        <Volume>
          <VolumeRange
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={silent ? 0 : volume}
            onChange={onVolumeChange}
            aria-label="Volume"
            style={{ '--val': `${(silent ? 0 : volume) * 100}%` }}
          />
          <ControlBtn type="button" onClick={toggleSound} aria-label={silent ? 'Activer le son' : 'Couper le son'}>
            <VolumeIcon aria-hidden size={18} />
          </ControlBtn>
        </Volume>
      </Controls>
    </Frame>
  );
}
