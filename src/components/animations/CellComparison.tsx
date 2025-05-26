import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {theme} from '../../styles/theme';

interface CellComparisonProps {
    showLabels?: boolean;
}

interface HotspotProps {
    x: number;
    y: number;
    label: string;
    description: string;
    color: string;
}

const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const CellsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const CellWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const CellLabel = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const CellBase = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 250px;
        height: 250px;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 200px;
        height: 200px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 150px;
        height: 150px;
    }
`;

const NormalCell = styled(CellBase)`
  background-color: #2d6a9f;
  border: 2px solid #68a2d5;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
`;

const ViralInfectedCell = styled(CellBase)`
  background-color: #a14848;
  border: 2px solid #d57c7c;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 0 10px rgba(200, 0, 0, 0.4));
`;

const Nucleus = styled(motion.div)<{ isCancer: boolean }>`
  position: absolute;
  width: ${props => props.isCancer ? '45%' : '35%'};
  height: ${props => props.isCancer ? '45%' : '35%'};
  border-radius: 50%;
  background-color: ${props => props.isCancer ? '#600606' : '#19395d'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
`;

const Organelle = styled(motion.div)<{ size: number; color: string; x: number; y: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 0.7}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
`;

const Hotspot = styled(motion.div)<{ x: number; y: number; color: string }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 0 0 2px white;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 18px;
        height: 18px;
        font-size: 10px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 16px;
        height: 16px;
        font-size: 9px;
    }
`;

const HotspotInfo = styled(motion.div)`
  position: absolute;
    background-color: rgba(30, 30, 40, 0.9);
    color: #ffffff;
  padding: 0.75rem;
  border-radius: 5px;
  width: 200px;
  z-index: 20;
  top: -10px;
  left: 30px;
  border: 1px solid rgba(60, 60, 70, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #61DAFB;
  }
  
  p {
    font-size: 0.9rem;
    color: #ffffff;
  }

    @media (max-width: 768px) {
        width: 180px;
        padding: 0.5rem;

        h4 {
            font-size: 0.9rem;
        }

        p {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 480px) {
        width: 160px;
        left: 20px;

        h4 {
            font-size: 0.85rem;
        }

        p {
            font-size: 0.75rem;
        }
    }
`;

// Hotspot data
const normalCellHotspots: HotspotProps[] = [
    {
        x: 50,
        y: 50,
        label: '1',
        description: 'Normal nucleus with controlled transcription and DNA replication.',
        color: theme.colors.accent.primary
    },
    {
        x: 30,
        y: 30,
        label: '2',
        description: 'Healthy mitochondria maintaining normal ATP production and cellular respiration.',
        color: theme.colors.accent.secondary
    },
    {
        x: 70,
        y: 35,
        label: '3',
        description: 'ACE2 receptors at normal expression levels on cell membrane.',
        color: theme.colors.accent.tertiary
    },
    {
        x: 25,
        y: 65,
        label: '4',
        description: 'Intact endoplasmic reticulum for normal protein synthesis and folding.',
        color: '#4CAF50'
    }
];

const viralInfectedHotspots: HotspotProps[] = [
    {
        x: 50,
        y: 50,
        label: '1',
        description: 'Hijacked nucleus with viral RNA replication and host gene suppression.',
        color: theme.colors.accent.primary
    },
    {
        x: 25,
        y: 40,
        label: '2',
        description: 'Double-membrane vesicles (DMVs) - viral replication factories in modified ER.',
        color: theme.colors.accent.secondary
    },
    {
        x: 75,
        y: 30,
        label: '3',
        description: 'Viral spike proteins binding to ACE2 receptors for entry.',
        color: theme.colors.accent.tertiary
    },
    {
        x: 65,
        y: 70,
        label: '4',
        description: 'Ribosomes commandeered for viral polyprotein translation.',
        color: '#FF6D00'
    },
    {
        x: 35,
        y: 75,
        label: '5',
        description: 'Mitochondrial dysfunction and altered cellular metabolism.',
        color: '#E91E63'
    },
    {
        x: 80,
        y: 60,
        label: '6',
        description: 'Viral assembly sites and budding of new viral particles.',
        color: '#9C27B0'
    }
];

const CellComparison: React.FC<CellComparisonProps> = ({showLabels = true}) => {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    // Organelle animation variants
    const organelleAnimation = {
        initial: {scale: 0},
        animate: (i: number) => ({
            scale: 1,
            transition: {
                delay: 0.2 + (i * 0.1),
                duration: 0.4,
                type: 'spring',
                stiffness: 200
            }
        })
    };

    // Cell pulsing animation
    const cellPulse = {
        animate: {
            scale: [1, 1.02, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse' as const
            }
        }
    };

    return (
        <ComparisonContainer>
            <CellsContainer>
                {/* Normal Cell */}
                <CellWrapper>
                    {showLabels && <CellLabel>Normal Cell</CellLabel>}
                    <NormalCell
                        variants={cellPulse}
                        animate="animate"
                    >
                        <Nucleus
                            isCancer={false}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{delay: 0.1, duration: 0.5}}
                        />

                        {/* Organelles */}
                        {Array.from({length: 8}).map((_, i) => (
                            <Organelle
                                key={`normal-organelle-${i}`}
                                size={15 + Math.random() * 15}
                                color={i % 2 === 0 ? '#68a2d5' : '#4c87bd'}
                                x={30 + Math.random() * 40}
                                y={20 + Math.random() * 60}
                                variants={organelleAnimation}
                                initial="initial"
                                animate="animate"
                                custom={i}
                            />
                        ))}

                        {/* Hotspots */}
                        {normalCellHotspots.map((hotspot, i) => (
                            <React.Fragment key={`normal-hotspot-${i}`}>
                                <Hotspot
                                    x={hotspot.x}
                                    y={hotspot.y}
                                    color={hotspot.color}
                                    animate={{scale: [1, 1.2, 1]}}
                                    transition={{duration: 1.5, repeat: Infinity}}
                                    onClick={() => setActiveHotspot(activeHotspot === `normal-${i}` ? null : `normal-${i}`)}
                                >
                                    {hotspot.label}
                                </Hotspot>

                                {activeHotspot === `normal-${i}` && (
                                    <HotspotInfo
                                        initial={{opacity: 0, x: -5}}
                                        animate={{opacity: 1, x: 0}}
                                    >
                                        <h4>{hotspot.label}</h4>
                                        <p>{hotspot.description}</p>
                                    </HotspotInfo>
                                )}
                            </React.Fragment>
                        ))}
                    </NormalCell>
                </CellWrapper>

                {/* Viral Infected Cell */}
                <CellWrapper>
                    {showLabels && <CellLabel>Viral Infected Cell</CellLabel>}
                    <ViralInfectedCell
                        variants={cellPulse}
                        animate="animate"
                    >
                        <Nucleus
                            isCancer={true}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{delay: 0.1, duration: 0.5}}
                        />

                        {/* Organelles - more chaotic for viral infected cell */}
                        {Array.from({length: 12}).map((_, i) => (
                            <Organelle
                                key={`viral-infected-organelle-${i}`}
                                size={10 + Math.random() * 25}
                                color={i % 2 === 0 ? '#d57c7c' : '#b25555'}
                                x={20 + Math.random() * 60}
                                y={15 + Math.random() * 70}
                                variants={organelleAnimation}
                                initial="initial"
                                animate="animate"
                                custom={i}
                            />
                        ))}

                        {/* Hotspots */}
                        {viralInfectedHotspots.map((hotspot, i) => (
                            <React.Fragment key={`viral-infected-hotspot-${i}`}>
                                <Hotspot
                                    x={hotspot.x}
                                    y={hotspot.y}
                                    color={hotspot.color}
                                    animate={{scale: [1, 1.2, 1]}}
                                    transition={{duration: 1.5, repeat: Infinity}}
                                    onClick={() => setActiveHotspot(activeHotspot === `viral-infected-${i}` ? null : `viral-infected-${i}`)}
                                >
                                    {hotspot.label}
                                </Hotspot>

                                {activeHotspot === `viral-infected-${i}` && (
                                    <HotspotInfo
                                        initial={{opacity: 0, x: -5}}
                                        animate={{opacity: 1, x: 0}}
                                    >
                                        <h4>{hotspot.label}</h4>
                                        <p>{hotspot.description}</p>
                                    </HotspotInfo>
                                )}
                            </React.Fragment>
                        ))}
                    </ViralInfectedCell>
                </CellWrapper>
            </CellsContainer>
        </ComparisonContainer>
    );
};

export default CellComparison;
