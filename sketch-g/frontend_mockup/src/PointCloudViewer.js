// src/PointCloudViewer.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function ModelAsPointCloud({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  const convertToPointCloud = (object) => {
    if (object.isMesh) {
      const geometry = new THREE.BufferGeometry();
      const positions = object.geometry.attributes.position.array;
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
      const points = new THREE.Points(geometry, material);

      return points;
    }
    return null;
  };

  const pointClouds = [];
  scene.traverse((child) => {
    const pointCloud = convertToPointCloud(child);
    if (pointCloud) {
      pointClouds.push(pointCloud);
    }
  });

  return <group ref={ref}>{pointClouds.map((pc, index) => <primitive object={pc} key={index} />)}</group>;
}

const PointCloudViewer = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <ModelAsPointCloud url="/model.glb" />
      <OrbitControls />
    </Canvas>
  );
};

export default PointCloudViewer;
