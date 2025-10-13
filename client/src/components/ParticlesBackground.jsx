import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateShouldRender = () => {
      setShouldRender(!isMobile() && !prefersReduced());
    };

    updateShouldRender();
    window.addEventListener('resize', updateShouldRender);

    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setInit(true));

    return () => {
      window.removeEventListener('resize', updateShouldRender);
    };
  }, []);

  const options = {
    preset: 'links',
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false },
    detectRetina: true,
    fpsLimit: 45,
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      move: { enable: true, speed: 1.2 }
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5
          }
        },
        repulse: {
          distance: 120,
          duration: 0.4
        },
        push: {
          quantity: 2
        }
      }
    },
    // Ajustements responsives selon la largeur de l'écran
    responsive: [
      {
        // Petits écrans (≤ 1024px)
        maxWidth: 1024,
        options: {
          fpsLimit: 45,
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            move: { speed: 1.0 }
          },
          interactivity: {
            modes: {
              grab: { distance: 120 },
              repulse: { distance: 100 }
            }
          }
        }
      },
      {
        // Très petits écrans (≤ 768px) — en pratique nous ne rendons pas sur mobile,
        // mais si activé ponctuellement, on réduit fortement la charge.
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 15, density: { enable: true, value_area: 700 } },
            move: { speed: 0.8 }
          },
          interactivity: {
            modes: {
              grab: { distance: 90 },
              repulse: { distance: 80 }
            }
          }
        }
      },
      {
        // Grands écrans (≥ 1440px)
        maxWidth: 99999,
        options: {
          particles: {
            number: { value: 55, density: { enable: true, value_area: 1000 } },
            move: { speed: 1.4 }
          },
          interactivity: {
            modes: {
              grab: { distance: 160 },
              repulse: { distance: 140 }
            }
          }
        }
      }
    ]
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {init && shouldRender && (
      <Particles
        id="tsparticles"
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        options={options}
      />)}
    </div>
  );
};

export default ParticlesBackground;


