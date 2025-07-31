import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import THREE from '../utils/threeConfig';

const Planet = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#4a90e2"
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  );
};

const PlanetRings = () => {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.5, 64]} />
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const Satellites = () => {
  return (
    <group>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * (Math.PI * 2) / 3) * 3,
            Math.sin(i * (Math.PI * 2) / 3) * 3,
            0
          ]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

const FloatingParticles = () => {
  return (
    <group>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Planet />
      <PlanetRings />
      <Satellites />
      <FloatingParticles />
      <Stars radius={80} depth={30} count={2000} factor={3} saturation={0} fade />
    </>
  );
};

const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [2, 3, 4], fov: 75 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.6}
          rotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene; 