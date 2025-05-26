import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import styled from 'styled-components';

const PathwayWrapper = styled(motion.div)`
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PathwayTitleContainer = styled(motion.div)`
    text-align: center;
    margin-bottom: 32px;
`;

const TitleText = styled.h2`
    font-size: 2.2rem;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const DescriptionText = styled.p`
    font-size: 1.2rem;
    opacity: 0.8;
    margin: 0;
    font-weight: 400;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const PathwayDisplayContainer = styled.div`
    width: 100%;
    min-height: ${props => window.innerWidth > 768 ? '320px' : '260px'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
    padding: ${props => window.innerWidth > 768 ? '25px' : '20px'};
`;

const FlowLayout = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isMobile ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
    gap: ${props => props.$isMobile ? '25px' : '15px'};
  width: 100%;
  height: auto;
  padding: ${props => props.$isMobile ? '20px' : '15px'};
  overflow-x: ${props => props.$isMobile ? 'hidden' : 'auto'};
  overflow-y: ${props => props.$isMobile ? 'auto' : 'hidden'};
`;

const NodeContainer = styled(motion.div)<{ $gradient: string }>`
  background: ${props => props.$gradient};
    padding: ${props => window.innerWidth > 768 ? '20px' : '20px'};
    border-radius: 18px;
  color: white;
    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.15),
    0 8px 8px -5px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12px);
    min-width: ${props => window.innerWidth > 768 ? '200px' : '200px'};
    max-width: ${props => window.innerWidth > 768 ? '230px' : '220px'};
  text-align: center;
  position: relative;
  overflow: hidden;
    cursor: default;

    @media (max-width: 768px) {
        min-width: 200px;
        padding: 25px;
    }
  
  &::before {
    content: '';
    position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.08);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const NodeIcon = styled.div`
    font-size: 2.5rem;
    margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
    width: 70px;
    height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
    margin: 0 auto 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

const NodeTitle = styled.h3`
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    font-weight: 600;
  line-height: 1.2;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
`;

const NodeDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.35;
`;

const StepNumber = styled.div`
  position: absolute;
    top: 8px; /* Positive value to bring it inside */
    right: 8px; /* Positive value to bring it inside */
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.98);
    color: #333;
    border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
    font-size: 0.85rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(200, 200, 200, 0.8);
    z-index: 10;
`;

const ArrowWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const StyledAnimatedArrow = styled(motion.svg)<{ $isMobile?: boolean }>`
    width: ${props => props.$isMobile ? '40px' : '60px'};
    height: ${props => props.$isMobile ? '40px' : '60px'};
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.2));
`;

const pathwaySteps = [
    {
        id: 'rna-packaging',
        title: 'RNA Packaging',
        description: 'Nucleocapsid proteins encapsidate viral genome',
        icon: '🧬',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 'envelope-insertion',
        title: 'Envelope Insertion',
        description: 'Viral proteins integrate into ER/Golgi membranes',
        icon: '🏗️',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        id: 'budding',
        title: 'Budding Process',
        description: 'Viral particles acquire host membrane envelope',
        icon: '🌸',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 'release',
        title: 'Viral Release',
        description: 'Mature virions exit cell to infect new targets',
        icon: '🚀',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
];

const NodeComponent: React.FC<{ step: any; index: number; isVisible: boolean }> = ({step, index, isVisible}) => {
    return (
        <AnimatePresence>
            {isVisible && (
        <NodeContainer
            $gradient={step.gradient}
            key={step.id}
            initial={{opacity: 0, scale: 0.8, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.8, y: -20}}
            transition={{type: "spring", stiffness: 220, damping: 20, delay: 0.1}}
            whileHover={{scale: 1.03, transition: {duration: 0.2}}}
        >
            <StepNumber>{index + 1}</StepNumber>
            <NodeIcon>{step.icon}</NodeIcon>
            <NodeTitle>{step.title}</NodeTitle>
            <NodeDescription>{step.description}</NodeDescription>
        </NodeContainer>
      )}
    </AnimatePresence>
  );
};

const ArrowComponent: React.FC<{
    orientation: 'horizontal' | 'vertical';
    onClick: () => void;
    isVisible: boolean;
}> = ({orientation, onClick, isVisible}) => {
    const pathVariants = {
        hidden: {pathLength: 0, opacity: 0},
        visible: {pathLength: 1, opacity: 1, transition: {duration: 0.8, ease: "easeInOut"}},
    };

    const dHorizontal = "M5 12h14M12 5l7 7-7 7";
    const dVertical = "M12 5v14M5 12l7 7 7-7";

    return (
        <AnimatePresence>
            {isVisible && (
                <ArrowWrapper
                    onClick={onClick}
                    key={`arrow-${orientation}`}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.5}}
                    transition={{type: "spring", stiffness: 200, damping: 15, delay: 0.2}}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <StyledAnimatedArrow
                        viewBox="0 0 24 24"
                        fill="none"
                        $isMobile={orientation === 'vertical'}
                    >
                        <motion.path
                            d={orientation === 'horizontal' ? dHorizontal : dVertical}
                            stroke="rgba(255, 255, 255, 0.95)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={pathVariants}
                            initial="hidden"
                            animate="visible"
                        />
                    </StyledAnimatedArrow>
                </ArrowWrapper>
            )}
        </AnimatePresence>
    );
};

interface ModernViralPathwayProps {
    title?: string;
    description?: string;
}

const ModernViralPathway: React.FC<ModernViralPathwayProps> = ({
                                                                   title = "Viral Assembly Pathway",
                                                                   description = "Sequential steps in viral particle formation"
                                                               }) => {
    const [visibleStepsCount, setVisibleStepsCount] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNextStep = () => {
        setVisibleStepsCount(prev => Math.min(prev + 1, pathwaySteps.length));
    };

    return (
        <PathwayWrapper
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <PathwayTitleContainer
                initial={{opacity: 0, y: -15}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1}}
            >
                <TitleText>{title}</TitleText>
                <DescriptionText>{description}</DescriptionText>
            </PathwayTitleContainer>

            <PathwayDisplayContainer>
                <FlowLayout $isMobile={isMobile}>
                    {pathwaySteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <NodeComponent
                                step={step}
                                index={index}
                                isVisible={index < visibleStepsCount}
                            />
                            {/* Render arrow if it's not the last step AND its corresponding node is visible AND it's the "next" arrow to be clicked */}
                            {index < pathwaySteps.length - 1 && index === visibleStepsCount - 1 && (
                                <ArrowComponent
                                    orientation={isMobile ? 'vertical' : 'horizontal'}
                                    onClick={handleNextStep}
                                    isVisible={true}
                                />
                            )}
                            {/* Render static-looking (already passed) arrows */}
                            {index < pathwaySteps.length - 1 && index < visibleStepsCount - 1 && (
                                <ArrowComponent
                                    orientation={isMobile ? 'vertical' : 'horizontal'}
                                    onClick={() => {
                                    }}
                                    isVisible={true}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </FlowLayout>
            </PathwayDisplayContainer>
        </PathwayWrapper>
  );
};

export default ModernViralPathway;
