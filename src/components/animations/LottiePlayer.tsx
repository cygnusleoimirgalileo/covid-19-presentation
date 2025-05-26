import React, {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import {Player} from '@lottiefiles/react-lottie-player';

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
    width?: number | string;
    height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const DNAContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;

const DNASymbol = styled.div<{ delay?: number }>`
  animation: 
    ${spin} ${props => 4 + (props.delay || 0)}s linear infinite,
    ${pulse} ${props => 2 + (props.delay || 0) * 0.5}s ease-in-out infinite,
    ${float} ${props => 3 + (props.delay || 0) * 0.3}s ease-in-out infinite;
  animation-delay: ${props => (props.delay || 0) * 0.5}s;
  color: ${props => props.theme?.colors?.accent?.primary || '#61DAFB'};
  position: absolute;
  opacity: 0.7;
  
  &:nth-child(1) {
    color: ${props => props.theme?.colors?.accent?.primary || '#61DAFB'};
  }
  
  &:nth-child(2) {
    color: ${props => props.theme?.colors?.accent?.secondary || '#FF5252'};
    transform: scale(0.8);
  }
  
  &:nth-child(3) {
    color: ${props => props.theme?.colors?.accent?.tertiary || '#FFD740'};
    transform: scale(0.6);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const LottieContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  loop = true,
  autoplay = true,
                                                       width = '100%',
                                                       height = '100%',
  style,
  className,
}) => {
    const [showFallback, setShowFallback] = useState(false);

    // Simple error boundary - if src is empty or invalid, show fallback
    useEffect(() => {
        if (!src || src.trim() === '') {
            setShowFallback(true);
        } else {
            setShowFallback(false);
        }
    }, [src]);

    return (
        <Container className={className} style={{...style, width, height}}>
            {!showFallback ? (
                <LottieContainer>
                    <Player
                        autoplay={autoplay}
                        loop={loop}
                        src={src}
                        style={{
                            width: typeof width === 'number' ? `${width}px` : width,
                            height: typeof height === 'number' ? `${height}px` : height,
                        }}
                    />
                </LottieContainer>
            ) : (
                // Fallback animation when Lottie fails to load
                <DNAContainer>
                    <DNASymbol delay={0} style={{fontSize: '1.5rem'}}>🧬</DNASymbol>
                    <DNASymbol delay={1} style={{fontSize: '1.125rem'}}>🧬</DNASymbol>
                    <DNASymbol delay={2} style={{fontSize: '0.9375rem'}}>🧬</DNASymbol>
        </DNAContainer>
      )}
    </Container>
  );
};

export default LottiePlayer;
