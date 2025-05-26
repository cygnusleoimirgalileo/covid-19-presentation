import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

interface PathwayNode {
    id: string;
    name: string;
    description: string;
    x: number;
    y: number;
    connections: string[];
    color?: string;
    isActive?: boolean;
    hidden?: boolean;
}

interface PathwayDiagramProps {
    title: string;
    description?: string;
    nodes: PathwayNode[];
    initialActiveNode?: string;
}

const DiagramContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: ${props => props.theme.spacing.md};
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        padding: ${props => props.theme.spacing.sm};
    }
`;

const DiagramTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
`;

const DiagramDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PathwayCanvas = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 10px;
  overflow: hidden;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        height: 400px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        height: 350px;
    }
`;

const Node = styled(motion.div)<{ x: number; y: number; color: string; active: boolean }>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
    box-shadow: ${props => props.active
            ? `0 0 0 3px white, 0 0 20px ${props.color}`
            : `0 0 0 1px rgba(255,255,255,0.3)`
  };
  z-index: 2;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 0 2px white, 0 0 10px ${props => props.color};
  }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 40px;
        height: 40px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 35px;
        height: 35px;
    }
`;

const NodeName = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: 0.7rem;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        font-size: 0.65rem;
    }
`;

const Connection = styled(motion.div)<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    active: boolean;
    color: string;
}>`
  position: absolute;
  height: 2px;
  background-color: ${props => props.active ? props.color : 'rgba(255,255,255,0.3)'};
  opacity: ${props => props.active ? 1 : 0.5};
  transform-origin: left center;
  left: ${props => props.startX}%;
  top: ${props => props.startY}%;
  width: ${props => Math.sqrt(
    Math.pow(props.endX - props.startX, 2) +
    Math.pow(props.endY - props.startY, 2)
)}%;
  transform: rotate(${props =>
    Math.atan2(props.endY - props.startY, props.endX - props.startX) * 180 / Math.PI
}deg);
  z-index: 1;
  box-shadow: ${props => props.active ? `0 0 8px ${props.color}` : 'none'};
`;

const InfoPanel = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  padding: 16px;
  background-color: rgba(30, 30, 40, 0.9);
  border-radius: 5px;
  color: #ffffff;
  border: 1px solid rgba(60, 60, 70, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 3;
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: #61DAFB;
  }
  
  p {
    font-size: 0.9rem;
    color: #ffffff;
  }

    @media (max-width: 768px) {
        padding: 12px;

        h4 {
            font-size: 1rem;
        }

        p {
            font-size: 0.85rem;
        }
    }

    @media (max-width: 480px) {
        bottom: 10px;
        left: 10px;
        width: calc(100% - 20px);

        h4 {
            font-size: 0.9rem;
            margin-bottom: 8px;
        }

        p {
            font-size: 0.8rem;
        }
    }
`;

const PathwayDiagram: React.FC<PathwayDiagramProps> = ({
                                                           title,
                                                           description,
                                                           nodes,
                                                           initialActiveNode
                                                       }) => {
    const [activeNode, setActiveNode] = useState<string | null>(initialActiveNode || null);

    // Find the active node object
    const activeNodeObj = nodes.find(node => node.id === activeNode);

    // Check if a connection is active
    const isConnectionActive = (source: string, target: string) => {
        if (!activeNode) return false;
        if (activeNode === source || activeNode === target) return true;

        // Check if source and target are connected to active node
        const sourceNode = nodes.find(node => node.id === source);
        const targetNode = nodes.find(node => node.id === target);

        return (sourceNode?.connections.includes(activeNode) ||
            targetNode?.connections.includes(activeNode));
    };

    return (
        <DiagramContainer>
            <DiagramTitle>{title}</DiagramTitle>
            {description && <DiagramDescription>{description}</DiagramDescription>}

            <PathwayCanvas>
                {/* Draw connections first so they appear under nodes */}
                {nodes.map(sourceNode => (
                    sourceNode.connections.map(targetId => {
                        const targetNode = nodes.find(node => node.id === targetId);
                        if (!targetNode) return null;

                        const isActive = isConnectionActive(sourceNode.id, targetId);

                        return (
                            <Connection
                                key={`${sourceNode.id}-${targetId}`}
                                startX={sourceNode.x}
                                startY={sourceNode.y}
                                endX={targetNode.x}
                                endY={targetNode.y}
                                active={isActive || false}
                                color={sourceNode.color || '#61DAFB'}
                                initial={{opacity: 0}}
                                animate={{opacity: isActive ? 1 : 0.5}}
                                transition={{duration: 0.4}}
                            />
                        );
                    })
                ))}

                {/* Draw nodes */}
                {nodes.filter(node => !node.hidden).map(node => (
                    <Node
                        key={node.id}
                        x={node.x}
                        y={node.y}
                        color={node.color || '#61DAFB'}
                        active={activeNode === node.id}
                        onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                    >
                        <NodeName>{node.name}</NodeName>
                    </Node>
                ))}

                {/* Show info panel for active node */}
                {activeNodeObj && (
                    <InfoPanel
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                    >
                        <h4>{activeNodeObj.name}</h4>
                        <p>{activeNodeObj.description}</p>
                    </InfoPanel>
                )}
            </PathwayCanvas>
        </DiagramContainer>
    );
};

export default PathwayDiagram;
