import React, {useState} from 'react';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import ImageViewer from './ImageViewer';

interface ClickableImageProps {
    src: string;
    alt: string;
    title?: string;
    style?: React.CSSProperties;
    className?: string;
}

const ImageWrapper = styled(motion.div)`
    position: relative;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    border-radius: 8px;
    
    &:hover::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        pointer-events: none;
    }

    &:hover .zoom-icon {
        opacity: 1;
        scale: 1;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    transition: transform 0.3s ease;
`;

const ZoomIcon = styled(motion.div)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    opacity: 0;
    scale: 0.8;
    pointer-events: none;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
`;

const ClickableImage: React.FC<ClickableImageProps> = ({src, alt, title, style, className}) => {
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const handleImageClick = () => {
        setIsViewerOpen(true);
    };

    const handleCloseViewer = () => {
        setIsViewerOpen(false);
    };

    return (
        <>
            <ImageWrapper
                className={className}
                style={style}
                onClick={handleImageClick}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
            >
                <Image src={src} alt={alt}/>
                <ZoomIcon className="zoom-icon">
                    🔍
                </ZoomIcon>
            </ImageWrapper>

            <ImageViewer
                isOpen={isViewerOpen}
                onClose={handleCloseViewer}
                src={src}
                alt={alt}
                title={title}
            />
        </>
    );
};

export default ClickableImage;
