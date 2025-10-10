import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Sparkles, ContactShadows, useGLTF } from '@react-three/drei';
import THREE from '../utils/threeConfig';

// Chargeur de modèle générique (compatible avec des modèles issus de pmndrs market)
const MarketModel = ({ url = '/models/hero.glb', scale = 1, position = [0, 0, 0] }) => {
  const gltf = useGLTF(url, true);
  return (
    <group dispose={null} scale={scale} position={position}>
      <primitive object={gltf.scene} />
    </group>
  );
};

// Décor interactif de repli si aucun modèle n'est fourni
const DecorativeFallback = () => {
  return (
    <group>

      <Sparkles count={80} scale={[8, 3, 6]} size={2} speed={0.6} />
      <Stars radius={80} depth={30} count={2000} factor={3} saturation={0} fade />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={10} blur={2.5} far={3} />
    </group>
  );
};

const Scene = ({ modelUrl }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
      <Environment preset="city" background={false} />

      <group position={[0, 0, 0]}>
        <Suspense fallback={<DecorativeFallback />}> 
          {modelUrl ? (
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.6}>
              <MarketModel url={modelUrl} scale={1} position={[0, -0.6, 0]} />
            </Float>
          ) : (
            <DecorativeFallback />
          )}
        </Suspense>
      </group>
    </>
  );
};

const ThreeScene = () => {
  // Pour charger un modèle depuis pmndrs market, placez le fichier sous public/models et
  // changez la valeur ci-dessous, par ex: '/models/robot.glb'.
  const modelUrl = '/3d_models/knowledge_network.glb';

  return (
    <Canvas camera={{ position: [2.5, 2.2, 3.6], fov: 60 }} shadows style={{ background: 'transparent' }}>
      <Suspense fallback={null}>
        <Scene modelUrl={modelUrl} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.7} panSpeed={0.7} rotateSpeed={0.7} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;