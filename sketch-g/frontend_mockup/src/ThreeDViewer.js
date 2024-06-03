import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ onVertexSelect, selectedVertex, setModelCenter }) {
  const { scene } = useGLTF('/model.glb');
  const ref = useRef();

  const [vertices, setVertices] = useState([]);

  useEffect(() => {
    if (ref.current) {
      const tempVertices = [];
      const box = new THREE.Box3().setFromObject(ref.current);
      const center = box.getCenter(new THREE.Vector3());

      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = true;
          child.material.opacity = 0.3;
          child.material.transparent = false;

          const position = child.geometry.attributes.position;
          for (let i = 0; i < position.count; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(position, i);
            tempVertices.push(vertex);
          }
        }
      });
      setVertices(tempVertices);
      setModelCenter(center);
    }
  }, [ref, setModelCenter]);

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
    <>
      <primitive object={scene} ref={ref} onPointerDown={handlePointerDown} />
      {vertices.map((vertex, index) => (
        <mesh key={index} position={vertex}>
          <sphereGeometry args={[0.005, 16, 16]} />
          <meshBasicMaterial color={selectedVertex && selectedVertex.equals(vertex) ? 'red' : 'black'} />
        </mesh>
      ))}
    </>
  );
}

function ThreeDViewer() {
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [modelCenter, setModelCenter] = useState(new THREE.Vector3(0, 0, 0));
  const controlsRef = useRef();

  const handleVertexSelect = (vertex) => {
    setSelectedVertex(vertex);
    console.log('Selected Vertex:', vertex);
  };

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(modelCenter.x, modelCenter.y, modelCenter.z);
    }
  }, [modelCenter]);

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model onVertexSelect={handleVertexSelect} selectedVertex={selectedVertex} setModelCenter={setModelCenter} />
      <OrbitControls ref={controlsRef} />
    </Canvas>
  );
}

export default ThreeDViewer;
