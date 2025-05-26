import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

interface SketchfabModelProps {
    modelId: string;
    title?: string;
    height?: string;
    width?: string;
    attribution?: boolean;
}

interface CustomIframeAttributes {
    mozallowfullscreen?: string;
    webkitallowfullscreen?: string;
    'xr-spatial-tracking'?: boolean;
    'execution-while-out-of-viewport'?: boolean;
    'execution-while-not-rendered'?: boolean;
    'web-share'?: boolean;
}

const ModelContainer = styled.div<{ height: string, width: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
    margin: 2rem auto;
    border-radius: 8px;
    overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border-radius: 8px;
      border: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: calc(${props => props.height} * 0.9);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
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

const LoadingIndicator = styled(motion.div)`
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
    border-radius: 8px;
`;

const SketchfabModel: React.FC<SketchfabModelProps> = ({
                                                           modelId,
                                                           title = 'Sketchfab 3D Model',
                                                           height = '400px',
                                                           width = '100%',
                                                           attribution = true
                                                       }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <ModelContainer height={height} width={width}>
            {isLoading && (
                <LoadingIndicator
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    Loading 3D model...
                </LoadingIndicator>
            )}
            <iframe
                title={title}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_infos=0&ui_controls=1&ui_inspector=0`}
                onLoad={handleIframeLoad}
                {...{
                    mozallowfullscreen: "true",
                    webkitallowfullscreen: "true",
                    "xr-spatial-tracking": true,
                    "execution-while-out-of-viewport": true,
                    "execution-while-not-rendered": true,
                    "web-share": true
                } as CustomIframeAttributes}
            />
            {attribution && (
                <Attribution>
                    <a
                        href={`https://sketchfab.com/3d-models/${modelId}?utm_medium=embed&utm_campaign=share-popup&utm_content=${modelId}`}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                    >
                        {title}
                    </a> on <a
                    href="https://sketchfab.com"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    Sketchfab
                </a>
                </Attribution>
            )}
        </ModelContainer>
    );
};

export default SketchfabModel;
