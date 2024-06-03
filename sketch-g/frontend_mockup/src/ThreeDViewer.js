// src/ThreeDViewer.js
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ onVertexSelect }) {
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

  const handlePointerDown = (event) => {
    const mesh = event.object;
    const point = event.point;

    const vertices = mesh.geometry.attributes.position.array;
    let closestVertex = null;
    let closestDistance = Infinity;

    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
      const distance = vertex.distanceTo(point);
      if (distance < closestDistance) {
        closestVertex = vertex;
        closestDistance = distance;
      }
    }

    if (closestVertex) {
      onVertexSelect(closestVertex);
    }
  };

  return (
    <primitive object={scene} ref={ref} onPointerDown={handlePointerDown} />
  );
}

function ThreeDViewer() {
  const [selectedVertex, setSelectedVertex] = useState(null);

  const handleVertexSelect = (vertex) => {
    setSelectedVertex(vertex);
    console.log('Selected Vertex:', vertex);
  };

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model onVertexSelect={handleVertexSelect} />
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDViewer;
