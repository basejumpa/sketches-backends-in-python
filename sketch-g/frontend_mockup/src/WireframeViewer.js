// src/WireframeViewer.js
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function ModelAsWireframe({ url }) {
  const { scene } = useGLTF(url);
  const [highlightedVertex, setHighlightedVertex] = useState(null);
  const { mouse, camera, raycaster, size } = useThree();
  const ref = useRef();

  const convertToWireframe = (object) => {
    if (object.isMesh) {
      object.material.wireframe = true;
      return object;
    }
    return null;
  };

  scene.traverse((child) => {
    convertToWireframe(child);
  });

  useFrame(() => {
    if (ref.current) {
      //ref.current.rotation.y += 0.005;
    }

    if (highlightedVertex) {
      highlightedVertex.material.color.set('red');
    }

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const geometry = intersect.object.geometry;
      const vertices = geometry.attributes.position;
      let minDist = Infinity;
      let closestVertex = null;

      for (let i = 0; i < vertices.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(vertices, i);
        const distance = intersect.point.distanceTo(vertex);

        if (distance < minDist) {
          minDist = distance;
          closestVertex = vertex;
        }
      }

      if (closestVertex) {
        const highlightMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
        const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
        const highlightSphere = new THREE.Mesh(sphereGeometry, highlightMaterial);

        highlightSphere.position.copy(closestVertex);
        setHighlightedVertex(highlightSphere);
      }
    }
  });

  return (
    <group ref={ref}>
      {highlightedVertex && <primitive object={highlightedVertex} />}
      <primitive object={scene} />
    </group>
  );
}

const WireframeViewer = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <ModelAsWireframe url="/model.glb" />
      <OrbitControls />
    </Canvas>
  );
};

export default WireframeViewer;
