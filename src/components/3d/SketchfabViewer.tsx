import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

interface SketchfabViewerProps {
    modelId: string;
    title?: string;
    height?: string;
    width?: string;
    autoStart?: boolean;
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

const LoadingIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 30, 40, 0.8);
  color: #ffffff;
  z-index: 10;
  border-radius: 8px;
`;

interface CustomIframeAttributes {
    mozallowfullscreen?: string;
    webkitallowfullscreen?: string;
    'xr-spatial-tracking'?: string;
}

declare global {
    interface Window {
        Sketchfab: any;
    }
}

const SketchfabViewer: React.FC<SketchfabViewerProps> = ({
                                                             modelId,
                                                             title = 'Sketchfab 3D Model',
                                                             height = '400px',
                                                             width = '100%',
                                                             autoStart = true
                                                         }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Load Sketchfab API Script
        const script = document.createElement('script');
        script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
        script.async = true;
        script.onload = () => setIsApiLoaded(true);
        script.onerror = () => setIsError(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // Initialize the viewer once the API is loaded and iframe is ready
        if (isApiLoaded && iframeRef.current) {
            try {
                const client = new window.Sketchfab(iframeRef.current);

                client.init(modelId, {
                    success: (api: any) => {
                        if (autoStart) {
                            api.start();
                        }

                        api.addEventListener('viewerready', () => {
                            console.log('Viewer is ready');
                            setIsLoading(false);
                        });
                    },
                    error: () => {
                        console.error('Viewer error');
                        setIsError(true);
                        setIsLoading(false);
                    },
                    ui_stop: 0,
                    ui_animations: 0,
                    ui_inspector: 0,
                    ui_watermark: 1
                });
            } catch (error) {
                console.error('Error initializing Sketchfab viewer:', error);
                setIsError(true);
                setIsLoading(false);
            }
        }
    }, [isApiLoaded, modelId, autoStart]);

    return (
        <ViewerContainer height={height} width={width}>
            {isLoading && (
                <LoadingIndicator>
                    <div>Loading 3D Model...</div>
                    <div style={{fontSize: '0.8em', marginTop: '5px'}}>
                        {isError ? 'Error loading model. Please try again later.' : 'This may take a few moments.'}
                    </div>
                </LoadingIndicator>
            )}

            <iframe
                ref={iframeRef}
                title={title}
                id={`sketchfab-${modelId}`}
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                {...{
                    mozallowfullscreen: "true",
                    webkitallowfullscreen: "true",
                    "xr-spatial-tracking": "true"
                } as CustomIframeAttributes}
            ></iframe>
        </ViewerContainer>
    );
};

export default SketchfabViewer;
