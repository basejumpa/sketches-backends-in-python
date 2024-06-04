import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
    const gltf = useGLTF('model.glb');

    return <primitive object={gltf.scene}
                rotation={[ -Math.PI/2, 0, Math.PI/2 ]}
                position={[ 0, -1, 0 ]}
                scale={[ 2, 2, 2 ]}
            />;
}

function ThreeDViewer() {
    return (
        <div>
            <Canvas style={{ height: '100vh' }}>
                <Model/>
                <OrbitControls
                    minAzimuthAngle={ -Math.PI }
                    maxAzimuthAngle={ Math.PI }
                />
            </Canvas>
        </div>
    );
}

export default ThreeDViewer;
