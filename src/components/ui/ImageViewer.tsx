import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt: string;
    title?: string;
}

const Backdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
`;

const ImageContainer = styled(motion.div)`
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    cursor: default;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const FullScreenImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 8px;
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    z-index: 10000;
    backdrop-filter: blur(10px);
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const ImageTitle = styled(motion.div)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    padding: 30px 20px 20px;
    font-size: 1.2rem;
    text-align: center;
    z-index: 10000;
`;

const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0}
};

const imageVariants = {
    hidden: {
        scale: 0.8,
        opacity: 0,
        y: 50
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.5,
            damping: 25,
            stiffness: 300
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.3
        }
    }
};

const closeButtonVariants = {
    hidden: {scale: 0, rotate: -180},
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 300
        }
    },
    exit: {scale: 0, rotate: 180}
};

const titleVariants = {
    hidden: {y: 30, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.4
        }
    },
    exit: {y: 30, opacity: 0}
};

const ImageViewer: React.FC<ImageViewerProps> = ({isOpen, onClose, src, alt, title}) => {
    const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    const modal = (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Backdrop
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <ImageContainer
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FullScreenImage src={src} alt={alt}/>

                        <CloseButton
                            variants={closeButtonVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={onClose}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            ×
                        </CloseButton>

                        {title && (
                            <ImageTitle
                                variants={titleVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {title}
                            </ImageTitle>
                        )}
                    </ImageContainer>
                </Backdrop>
            )}
        </AnimatePresence>
    );

    return createPortal(modal, document.body);
};

export default ImageViewer;
