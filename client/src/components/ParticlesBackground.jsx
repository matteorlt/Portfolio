import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setInit(true));
  }, []);

  const options = {
    preset: 'links',
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false },
    detectRetina: true,
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
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {init && (
      <Particles
        id="tsparticles"
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        options={options}
      />)}
    </div>
  );
};

export default ParticlesBackground;


