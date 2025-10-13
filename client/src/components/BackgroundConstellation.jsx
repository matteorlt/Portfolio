import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';

// Génère des points aléatoires dans un cube [-range, range]
function useRandomPoints(count, range) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() * 2 - 1) * range;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * range;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * range;
    }
    return positions;
  }, [count, range]);
}

function Constellation({ count = 180, range = 6, linkDistance = 2.6, mouse, scroll, resolution }) {
  const positions = useRandomPoints(count, range);
  const pointsRef = useRef();
  const groupRef = useRef();

  // Lignes entre points proches
  const linesRef = useRef();
  const lineGeomRef = useRef();
  const frameRef = useRef(0);
  const [hasSegments, setHasSegments] = useState(false);

  // Initialiser une géométrie vide pour les segments
  useEffect(() => {
    if (lineGeomRef.current) {
      lineGeomRef.current.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
      setHasSegments(false);
    }
  }, []);

  const updateSegments = () => {
    if (!lineGeomRef.current || !pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const maxPairs = 3000;
    const segments = [];
    let pairs = 0;
    for (let i = 0; i < count && pairs < maxPairs; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < count && pairs < maxPairs; j++) {
        const jx = j * 3;
        const dx = posArr[ix] - posArr[jx];
        const dy = posArr[ix + 1] - posArr[jx + 1];
        const dz = posArr[ix + 2] - posArr[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < linkDistance * linkDistance) {
          segments.push(posArr[ix], posArr[ix + 1], posArr[ix + 2]);
          segments.push(posArr[jx], posArr[jx + 1], posArr[jx + 2]);
          pairs++;
        }
      }
    }
    const segArray = new Float32Array(segments);
    if (lineGeomRef.current) {
      lineGeomRef.current.setAttribute('position', new THREE.BufferAttribute(segArray, 3));
      lineGeomRef.current.computeBoundingSphere();
    }
    setHasSegments(segArray.length > 0);
  };

  // Premier calcul des segments après montage
  useEffect(() => {
    const id = setTimeout(updateSegments, 0);
    return () => clearTimeout(id);
  }, []);

  // Animation douce au survol via un léger mouvement sinus
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const arr = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        const baseX = positions[i + 0];
        const baseY = positions[i + 1];
        const baseZ = positions[i + 2];
        arr[i + 0] = baseX + Math.sin(t * 0.15 + baseY) * 0.03;
        arr[i + 1] = baseY + Math.cos(t * 0.12 + baseZ) * 0.03;
        arr[i + 2] = baseZ + Math.sin(t * 0.1 + baseX) * 0.03;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Réagir au survol (souris) et au scroll par une légère rotation/translation du groupe
    if (groupRef.current && mouse && scroll) {
      const targetRotY = mouse.x * 0.12;
      const targetRotX = mouse.y * 0.1;
      const targetPosY = -scroll.value * 0.5;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
    }

    // Recalcule dynamiquement quelques segments proches à cadence réduite (perf)
    frameRef.current = (frameRef.current + 1) % 5; // 1/5 frames
    if (frameRef.current !== 0) return;
    updateSegments();
  });

  // Dégradé bleu → cyan
  const colorStart = '#4a90e2';
  const colorEnd = '#35e0ff';

  return (
    <group ref={groupRef}>
      {/* Points */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          vertexColors={false}
          color={colorEnd}
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>

      {/* Lignes entre points proches (simple LineSegments basique, compatible Vite) */}
      {hasSegments && (
        <lineSegments ref={linesRef}>
          <bufferGeometry ref={lineGeomRef} />
          <lineBasicMaterial color={colorStart} transparent opacity={0.35} depthWrite={false} />
        </lineSegments>
      )}
    </group>
  );
}

export default function BackgroundConstellation() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [resolutionArr, setResolutionArr] = useState([window.innerWidth, window.innerHeight]);
  const resVec = useMemo(() => new THREE.Vector2(resolutionArr[0], resolutionArr[1]), [resolutionArr]);

  // Souris globale (car pointer-events: none sur le canvas)
  useEffect(() => {
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // [-1,1]
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.x = nx;
      mouse.current.y = -ny;
    };
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll.current = window.scrollY / max; // [0,1]
    };
    const onResize = () => {
      setResolutionArr([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Légère caméra orbit contrôlée si besoin (désactivée aux interactions) */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        <Constellation mouse={mouse.current} scroll={{ value: scroll.current }} resolution={resVec} />
      </Canvas>
    </div>
  );
}


