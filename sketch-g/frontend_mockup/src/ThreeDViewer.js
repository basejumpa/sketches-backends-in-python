// src/ThreeDViewer.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/model.glb');
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = true;
        }
      });
    }
  });

  return <primitive object={scene} ref={ref} />;
}

function ThreeDViewer() {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDViewer;
