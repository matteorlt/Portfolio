// Configuration pour résoudre les conflits Three.js
import * as THREE from 'three';

// Patch pour BatchedMesh si nécessaire
const THREEWithPatch = { ...THREE };
if (!THREEWithPatch.BatchedMesh) {
  THREEWithPatch.BatchedMesh = THREEWithPatch.InstancedMesh;
}

export default THREEWithPatch; 