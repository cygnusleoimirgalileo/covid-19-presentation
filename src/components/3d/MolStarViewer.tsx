import React from 'react';
import styled from 'styled-components';

interface MolStarViewerProps {
    pdbId: string;
    title?: string;
    height?: string;
    width?: string;
}

const ViewerContainer = styled.div<{ height: string, width: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
  margin: 2rem auto;
  border-radius: 8px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    height: calc(${props => props.height} * 0.9);
  }
  
  @media (max-width: 480px) {
    height: calc(${props => props.height} * 0.8);
  }
`;

const Attribution = styled.p`
  font-size: 13px;
  font-weight: normal;
  margin: 8px 0;
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
  
  a {
    font-weight: bold;
    color: #1CAAD9;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MolStarViewer: React.FC<MolStarViewerProps> = ({
                                                         pdbId,
                                                         title = 'Molecular Structure',
                                                         height = '400px',
                                                         width = '100%',
                                                     }) => {
    return (
        <>
            <ViewerContainer height={height} width={width}>
                <iframe
                    src={`https://molstar.org/viewer/?pdb=${pdbId}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title={title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </ViewerContainer>
            <Attribution>
                <a
                    href={`https://www.rcsb.org/structure/${pdbId}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    {title}
                </a> visualized with <a
                href="https://molstar.org"
                target="_blank"
                rel="nofollow noopener noreferrer"
            >
                Mol*
            </a>
            </Attribution>
        </>
    );
};

export default MolStarViewer;