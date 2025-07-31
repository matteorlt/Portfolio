// Configuration pour résoudre les conflits Three.js
import * as THREE from 'three';

// Patch pour BatchedMesh si nécessaire
if (!THREE.BatchedMesh) {
  THREE.BatchedMesh = THREE.InstancedMesh;
}

export default THREE; 