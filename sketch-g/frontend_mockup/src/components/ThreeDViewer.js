import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
    const gltf = useGLTF('model.glb');
    return <primitive object={gltf.scene} />;
}

function ThreeDViewer() {
    return (
        <div>
            <Canvas style={{ height: '100vh' }}>
                <Model />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default ThreeDViewer;
