import React, {useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Html} from '@react-three/drei';
import styled from 'styled-components';
import {MolecularModel as MolecularModelType} from '../../types';
import * as THREE from 'three';
import {useTheme} from '../../store/ThemeContext';

interface MolecularModelProps {
    model: MolecularModelType;
    isInteractive?: boolean;
    rotationSpeed?: number;
}

const ModelContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        height: 350px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        height: 300px;
    }
`;

// Move these styled components outside of the component render
const InfoPanel = styled.div`
  background-color: rgba(30, 30, 40, 0.9);
  padding: 0.75rem;
  border-radius: 5px;
  color: #ffffff;
  border: 1px solid rgba(60, 60, 70, 0.8);
  max-width: 200px;
  pointer-events: none;
  
  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #61DAFB;
  }
  
  p {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    max-width: 180px;
    padding: 0.5rem;

    h3 {
        font-size: 0.9rem;
    }

    p {
        font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    max-width: 150px;

    h3 {
        font-size: 0.85rem;
    }

    p {
        font-size: 0.75rem;
    }
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 30, 40, 0.8);
  color: #ffffff;
  z-index: 10;
`;

// Mock model for development - in production, we'd use real 3D models
const DefaultModel = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[1, 32, 32]}/>
            <meshStandardMaterial
                color={hovered ? '#61DAFB' : '#FFFFFF'}
                wireframe={true}
            />
            {hovered && (
                <Html position={[0, 0, 0]} center>
                    <InfoPanel>
                        <h3>Molecule Info</h3>
                        <p>Hover over parts of the molecule for more information.</p>
                    </InfoPanel>
                </Html>
            )}
        </mesh>
    );
};

const MolecularModel: React.FC<MolecularModelProps> = ({
                                                           model,
                                                           isInteractive = true,
                                                           rotationSpeed = 0.5
                                                       }) => {
    const [isLoading, setIsLoading] = useState(true);

    // In a real application, we would load the actual model
    // For now, we'll simulate loading and use our default model
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ModelContainer>
            {isLoading && (
                <LoadingIndicator>
                    Loading molecular model...
                </LoadingIndicator>
            )}
            <Canvas>
                <ambientLight intensity={0.5}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                <pointLight position={[-10, -10, -10]}/>

                <DefaultModel/>

                {isInteractive && <OrbitControls/>}
            </Canvas>
        </ModelContainer>
    );
};

export default MolecularModel;
