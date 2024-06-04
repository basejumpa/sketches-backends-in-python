import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
    const gltf = useGLTF('model.glb');
    return <primitive object={gltf.scene} />;
}

function ThreeDViewer() {
    return (
        <div>
            <Canvas>
                <Model />
            </Canvas>
        </div>
    );
}

export default ThreeDViewer;
