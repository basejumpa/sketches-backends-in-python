// src/WireframeViewer.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function ModelAsWireframe({ url }) {
  const { scene } = useGLTF(url);
  const [highlightedVertex, setHighlightedVertex] = useState(new THREE.Vector3());
  const [sphere, setSphere] = useState();
  const { mouse, camera, raycaster, size, scene: fiberScene } = useThree();
  const ref = useRef();

  useEffect(() => {
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const highlightSphere = new THREE.Mesh(sphereGeometry, highlightMaterial);
    fiberScene.add(highlightSphere);
    setSphere(highlightSphere);
  }, [fiberScene]);

  useFrame(() => {
    if (ref.current) {
      //ref.current.rotation.y += 0.005;
    }

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const geometry = intersect.object.geometry;
      const vertices = geometry.attributes.position;
      let minDist = Infinity;
      let closestVertex = new THREE.Vector3();

      for (let i = 0; i < vertices.count; i++) {
        const vertex = new THREE.Vector3(
          vertices.getX(i),
          vertices.getY(i),
          vertices.getZ(i)
        );
        const distance = intersect.point.distanceTo(vertex);

        if (distance < minDist) {
          minDist = distance;
          closestVertex.copy(vertex);
        }
      }

      if (sphere) {
        sphere.position.copy(closestVertex);
        sphere.visible = true;
      }
    } else if (sphere) {
      sphere.visible = false;
    }
  });

  return <primitive ref={ref} object={scene} />;
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
