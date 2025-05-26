import React, {useState, useEffect, useMemo, useCallback} from 'react';
import styled, {keyframes, css} from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../store/LanguageContext';
import { useTheme } from '../store/ThemeContext';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import heroImage from '../assets/hero.png';

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Safe check for server-side rendering
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Keyframes for star animation - significantly slowed down for mobile
const animStar = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
`;

// Styled component for a single layer of stars with mobile optimizations
const StyledStarLayer = styled.div<{
  size: string;
  animationDuration: string;
  boxShadowString: string;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => props.size};
  height: ${props => props.size};
  background: transparent;
  box-shadow: ${props => props.boxShadowString};

  /* Default desktop animation */
  animation: ${animStar} ${props => props.animationDuration} linear infinite;
  will-change: transform;
  pointer-events: none;
  transform: translateZ(0);

  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    left: 0;
    width: inherit;
    height: inherit;
    background: transparent;
    box-shadow: ${props => props.boxShadowString};
  }

  /* Tablet and mobile - 6x slower */
  @media (max-width: 768px) {
    animation-duration: ${props => `${parseInt(props.animationDuration.replace('s', '')) * 6}s`};
    will-change: auto;
    transform: translate3d(0, 0, 0);
  }

  /* Small mobile - 10x slower */
  @media (max-width: 576px) {
    animation-duration: ${props => `${parseInt(props.animationDuration.replace('s', '')) * 10}s`};
  }

  /* Force disable animations on very small screens */
  @media (max-width: 320px) and (max-height: 600px) {
    animation: none !important;
    will-change: auto;
  }

  /* Force disable for reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    will-change: auto;
  }
`;

// React component to generate and manage star layers with mobile optimization
const StarrySky: React.FC = () => {
  const {themeMode} = useTheme();
  const [shadowsSmall, setShadowsSmall] = useState('');
  const [shadowsMedium, setShadowsMedium] = useState('');
  const [shadowsBig, setShadowsBig] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const starColor = useMemo(() => {
    return themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.2)';
  }, [themeMode]);

  const generateMultipleBoxShadows = useCallback((count: number, color: string) => {
    let value = '';
    const starAreaSize = 2000;

    // Hide stars completely on mobile
    if (isMobile) {
      return '';
    }

    for (let i = 0; i < count; i++) {
      value += `${Math.floor(Math.random() * starAreaSize)}px ${Math.floor(Math.random() * starAreaSize)}px ${color}`;
      if (i < count - 1) {
        value += ', ';
      }
    }
    return value;
  }, [isMobile]);

  useEffect(() => {
    // Don't generate stars if user prefers reduced motion or on mobile
    if (prefersReducedMotion || isMobile) {
      setShadowsSmall('');
      setShadowsMedium('');
      setShadowsBig('');
      return;
    }

    setShadowsSmall(generateMultipleBoxShadows(700, starColor));
    setShadowsMedium(generateMultipleBoxShadows(200, starColor));
    setShadowsBig(generateMultipleBoxShadows(100, starColor));
  }, [starColor, generateMultipleBoxShadows, prefersReducedMotion, isMobile]);

  // Don't render stars if reduced motion is preferred, on mobile, or if no shadows generated
  if (prefersReducedMotion || isMobile || (!shadowsSmall && !shadowsMedium && !shadowsBig)) {
    return null;
  }

  return (
      <>
        <StyledStarLayer
            size="1px"
            animationDuration="50s"
            boxShadowString={shadowsSmall}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
        />
        <StyledStarLayer
            size="2px"
            animationDuration="100s"
            boxShadowString={shadowsMedium}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
        />
        <StyledStarLayer
            size="3px"
            animationDuration="150s"
            boxShadowString={shadowsBig}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
        />
      </>
  );
};

// Essential animations for background elements
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.02);
  }
`;

// Gradient shimmer animation for title - REMOVING THIS
// const titleShimmer = keyframes`
//   0%, 100% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
// `;

// Background decoration animation
const subtleMorph = keyframes`
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 40% 60% 70% 30% / 50% 70% 30% 60%;
  }
`;

// Main image morphing animation - updated with more complex morphing
const blobMorph = keyframes`
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  16.66% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  33.33% {
    border-radius: 70% 30% 50% 50% / 40% 40% 60% 60%;
  }
  50% {
    border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
  }
  66.66% {
    border-radius: 50% 50% 30% 70% / 30% 50% 60% 70%;
  }
  83.33% {
    border-radius: 50% 60% 30% 40% / 40% 50% 60% 50%;
  }
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
`;

// Shimmer effect for image
const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%) skewX(-20deg); }
  100% { transform: translateX(200%) skewX(-20deg); }
`;

// Background blob animations - enhanced based on HTML example
const blobMove1 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(50px, 20px) scale(1.05); }
  100% { transform: translate(10px, 40px) scale(0.95); }
`;

const blobMove2 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -20px) scale(1.1); }
  100% { transform: translate(-15px, -40px) scale(0.9); }
`;

const blobMove3 = keyframes`
  0% { transform: translate(20px, -30px) scale(1.05); }
  100% { transform: translate(40px, 0) scale(0.95); }
`;

const blobMove4 = keyframes`
  0%, 100% {
    transform: translateX(-50%) scale(1);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  33% {
    transform: translateX(-50%) translateY(15px) scale(1.05);
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
  66% {
    transform: translateX(-50%) translateY(30px) scale(1.1);
    border-radius: 30% 70% 70% 30% / 70% 30% 70% 30%;
  }
  100% {
    transform: translateX(-50%) translateY(-20px) scale(0.95);
    border-radius: 70% 30% 30% 70% / 30% 60% 40% 70%;
  }
`;

const blobMove5 = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
  50% {
    transform: translate3d(15px, 10px, 0) scale(1.05) rotate(5deg);
  }
`;

const rotateAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const blobMorphOutline1 = keyframes`
  0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
  25% { border-radius: 45% 55% 65% 35% / 40% 50% 50% 60%; }
  50% { border-radius: 50% 50% 55% 45% / 45% 55% 45% 55%; }
  75% { border-radius: 55% 45% 45% 55% / 50% 40% 60% 40%; }
  100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
`;

const blobMorphOutline2 = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 55% 45% 35% 65% / 50% 45% 55% 50%; }
  50% { border-radius: 40% 60% 60% 40% / 40% 60% 40% 60%; }
  75% { border-radius: 50% 50% 40% 60% / 55% 40% 60% 45%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const blobFloat1 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const blobFloat2 = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-3deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

// Z-index system constants for better management
const Z_INDEX = {
  BACKGROUND_EFFECTS: 1,
  BACKGROUND_DECORATIONS: 2,
  FLOATING_ICONS: 3,
  MAIN_CONTENT: 10,
  BLOB_SHADOW: -1,
  HERO_IMAGE: 5,
  SHIMMER_EFFECT: 6,
  HEADER: 50
} as const;

// WelcomeContainer with mobile improvements
const WelcomeContainer = styled.div`
  min-height: 100vh;
  min-height: 100svh; /* Small viewport height fallback */
  min-height: 100dvh; /* Dynamic viewport height for modern browsers */
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; // Default behavior

  // For tablets and smaller (mobile)
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    min-height: 100vh;     /* Fallback for older browsers */
    min-height: 100svh;    /* Small viewport height */
    min-height: 100dvh;    /* Dynamic viewport height for better mobile fit */
    /* Scrolling will be handled by MainContent now */
  }

  // Additional fallback for very old browsers
  @supports not (height: 100dvh) {
    min-height: 100vh;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      min-height: calc(100vh - 60px); /* Account for mobile browser UI */
    }
  }
`;

// Container for the new background effects
const EffectsLayerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.BACKGROUND_EFFECTS};
  overflow: hidden;
  pointer-events: none;

  /* Enable some effects on mobile with reduced intensity */
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    /* Disable all effects on extra small screens */
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

// Base Blob (Shiny Light) - Enhanced with styles from HTML example
const EffectBlobBase = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.75;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  transition: all 0.3s ease;
  filter: blur(30px);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    opacity: 0.6;
    will-change: auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    opacity: 0.5 !important;
    animation: none !important;
    transform: none !important;
    will-change: auto;
    transition: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    will-change: auto;
    transition: none !important;
  }
`;

const EffectBlob1 = styled(EffectBlobBase)`
  width: 500px;
  height: 500px;
  background-color: ${props => props.theme.colors.accent.primary}50;
  top: -250px;
  left: -100px;
  animation: ${blobMove1} 25s infinite alternate ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 400px; 
    height: 400px; 
    top: -150px; 
    left: -150px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 300px; 
    height: 300px; 
    top: -120px; 
    left: -100px;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 250px; 
    height: 250px; 
    top: -100px; 
    left: -80px;
  }
`;

const EffectBlob2 = styled(EffectBlobBase)`
  width: 300px;
  height: 300px;
  background-color: ${props => props.theme.colors.section.introduction}60;
  bottom: -100px;
  right: -50px;
  filter: blur(40px);
  animation: ${blobMove2} 20s infinite alternate ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 250px; 
    height: 250px; 
    right: -80px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 200px; 
    height: 200px; 
    right: -60px; 
    bottom: -80px;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 180px; 
    height: 180px; 
    right: -50px; 
    bottom: -60px;
  }
`;

const EffectBlob3 = styled(EffectBlobBase)`
  width: 400px;
  height: 400px;
  background-color: ${props => props.theme.colors.section['cellular-biology']}50; /* UPDATED from accent.secondary */
  bottom: -200px;
  left: 30%;
  filter: blur(70px);
  animation: ${blobMove3} 30s infinite alternate ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 350px; height: 350px; bottom: -150px;
    animation: ${blobMove3} 50s infinite alternate ease-in-out;
    display: none;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) and (orientation: portrait) {
    display: none;
  }
  @media (max-width: ${props => props.theme.breakpoints.md}) and (orientation: landscape) {
    display: none;
  }
`;

const EffectBlob4 = styled(EffectBlobBase)`
  width: 450px;
  height: 450px;
  background-color: ${props => props.theme.colors.section['cellular-biology']}40; /* UPDATED from section.hallmarks */
  top: -250px;
  left: 75%;
  transform: translateX(-50%);
  filter: blur(35px);
  box-shadow: 0 0 40px ${props => props.theme.colors.accent.primary}40;
  z-index: 0;
  animation: ${blobMove4} 28s infinite alternate ease-in-out 2s;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const EffectBlob5 = styled(EffectBlobBase)`
  width: 380px;
  height: 380px;
  background-color: ${props => props.theme.colors.section.statistics}30; /* UPDATED from section.treatment */
  top: 5%;
  right: -80px;
  filter: blur(75px);
  animation: ${blobMove5} 23s infinite alternate ease-in-out 2s;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const EffectDotPattern = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 10%;
  right: 5%;
  background-image: radial-gradient(${props => props.theme.colors.text.primary}0D 1px, transparent 1px);
  background-size: 15px 15px;
  opacity: 0.5;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 200px; height: 200px; opacity: 0.25;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 150px; 
    height: 150px; 
    opacity: 0.15; // Re-enabled with very low opacity
    background-size: 20px 20px; // Larger dots, fewer of them
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none; // Still disable on very small screens
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    will-change: auto;
    transition: none !important;
  }
`;

const EffectCircleOutline = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px solid ${props => props.theme.colors.text.primary}1A;
  border-radius: 50%;
  right: -200px;
  bottom: 15%;
  animation: ${rotateAnim} 40s linear infinite;
  opacity: 0.8;
  will-change: transform;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 280px; height: 280px; opacity: 0.5;
    border-width: 1px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 200px; 
    height: 200px; 
    opacity: 0.2; // Re-enabled with very low opacity
    animation: ${rotateAnim} 80s linear infinite; // Much slower rotation
    border-width: 1px;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none; // Still disable on very small screens
  }
`;

const EffectBlobOutline1 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  border: 2px solid ${props => props.theme.colors.accent.primary}33;
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  animation: ${blobMorphOutline1} 15s linear infinite, ${blobFloat1} 20s ease-in-out infinite;
  top: 35%;
  left: -5%;
  opacity: 0.85;
  will-change: border-radius, transform;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 250px; height: 250px; opacity: 0.4; 
    border-width: 1px;
    left: -80px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 180px;
    height: 180px;
    opacity: 0.15; // Re-enabled with very low opacity
    border-width: 1px;
    left: -90px;
    animation: ${blobMorphOutline1} 30s linear infinite, ${blobFloat1} 40s ease-in-out infinite; // Much slower animations
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none; // Still disable on very small screens
  }
`;

const EffectBlobOutline2 = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  border: 2px solid ${props => props.theme.colors.section.introduction}33;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: ${blobMorphOutline2} 18s linear infinite alternate, ${blobFloat2} 25s ease-in-out infinite;
  bottom: -35%;
  right: 15%;
  opacity: 0.8;
  will-change: border-radius, transform;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 300px; height: 300px; opacity: 0.4; 
    border-width: 1px;
    bottom: -20%;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

// Single subtle background decoration
const BackgroundDecoration = styled.div`
  position: absolute;
  top: -10%;
  right: -5%;
  width: 40%;
  height: 60%;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.accent.primary}08,
    ${props => props.theme.colors.section.introduction}12
  );
  border-radius: 50%;
  filter: blur(60px);
  animation: ${subtleMorph} 20s ease-in-out infinite;
  z-index: ${Z_INDEX.BACKGROUND_DECORATIONS};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 60%;
    height: 40%;
    top: -5%;
    right: -10%;
    filter: blur(40px);
    opacity: 0.7;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 80%;
    height: 30%;
    top: -2%;
    right: -15%;
    filter: blur(30px);
    opacity: 0.5;
  }
`;

// Floating DNA/molecule icons (subtle)
const FloatingIcon = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0.1;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  z-index: ${Z_INDEX.FLOATING_ICONS};
  
  &::before {
    content: '🧬';
    font-size: 24px;
    display: block;
  }
  
  &.molecule::before {
    content: '⚛️';
  }
  
  &.dna-1 {
    top: 15%;
    left: 5%;
    animation-delay: 0s;
  }
  
  &.molecule-1 {
    top: 70%;
    left: 8%;
    animation-delay: 2s;
  }
  
  &.dna-2 {
    top: 40%;
    right: 8%;
    animation-delay: 4s;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 20px;
    height: 20px;
    opacity: 0.05;
    
    &::before {
      font-size: 20px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};
  z-index: ${Z_INDEX.HEADER};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    left: 0;
    right: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.lg};
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(8px);
  }
`;

const MobileStartButton = styled(motion.button)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg,
      ${props => props.theme.colors.accent.primary} 0%,
      ${props => props.theme.colors.section.introduction} 100%
    );
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 20px;
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    white-space: nowrap;
    min-width: 120px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 10px 16px;
    font-size: 0.85rem;
    min-width: 100px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 8px 12px;
    font-size: 0.8rem;
    min-width: 80px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const MainContent = styled.main<{ headerHeight: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  z-index: ${Z_INDEX.MAIN_CONTENT};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-left: ${props => props.theme.spacing.md};
    padding-right: ${props => props.theme.spacing.md};
    padding-top: calc(${props => props.headerHeight}px + ${props => props.theme.spacing.lg});
    padding-bottom: calc(${props => props.theme.spacing.xl} + 60px); // Extra space for button visibility

    align-items: flex-start;
    overflow-y: auto; 
    min-height: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
    padding-top: calc(${props => props.headerHeight}px + ${props => props.theme.spacing.md});
    padding-bottom: calc(${props => props.theme.spacing.lg} + 80px); // More space for smaller screens
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xs};
    padding-top: calc(${props => props.headerHeight}px + ${props => props.theme.spacing.sm});
    padding-bottom: calc(${props => props.theme.spacing.md} + 100px); // Even more space for very small screens
  }

  @media (max-height: 600px) and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm};
    padding-top: calc(${props => props.headerHeight}px + ${props => props.theme.spacing.sm});
    padding-bottom: calc(${props => props.theme.spacing.sm} + 60px);
  }
`;

const ContentLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  width: 100%;
  transition: grid-template-columns 0.3s ease, gap 0.3s ease, text-align 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.md}; // Default for sm (landscape)

    @media (orientation: portrait) {
      gap: ${props => props.theme.spacing.sm}; // Tighter for sm portrait
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: ${props => props.theme.spacing.sm}; // Default for xs (landscape)
    
    @media (orientation: portrait) {
      gap: ${props => props.theme.spacing.xs}; // Tighter for xs portrait
    }
  }

  @media (max-height: 600px) and (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const TextSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    /* Remove the nested structure on mobile - let children be direct flex items */
    display: contents;
  }
`;

const TitleSubtitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    order: 1;
  }
`;

const InfoAndActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    order: 3;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

// Styled span for the wave effect on "Biochemistry" - REMOVING THIS
// const WaveText = styled.span`
//   display: inline-block; /* Ensures background is clipped correctly */
//   background: ${props => props.theme.colors.background.primary === '#121212' ?
//     `linear-gradient(90deg, 
//       #38bdf8 0%,    /* Light Blue */
//       #F0F0F0 48%,  /* Light Gray shoulder */
//       #FFFFFF 50%,  /* Superwhite center */
//       #F0F0F0 52%,  /* Light Gray shoulder */
//       #38bdf8 100%   /* Light Blue */
//     )` :
//     `linear-gradient(90deg, 
//       #1e40af 0%,    /* Dark Blue */
//       #181818 48%,  /* Dark Gray shoulder */
//       #000000 50%,  /* Superblack center */
//       #181818 52%,  /* Dark Gray shoulder */
//       #1e40af 100%   /* Dark Blue */
//     )`
//   };
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   background-size: 200% 100%; /* Correct for horizontal shimmer */
//   animation: ${titleShimmer} 12s ease-in-out infinite;
// `;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary}; /* Base color for "Cellular" */
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(2rem, 8vw, 2.5rem);
    line-height: 1.1;
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(1.8rem, 9vw, 2.2rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 400;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 90%;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: clamp(1rem, 4vw, 1.2rem);
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.5;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: clamp(0.9rem, 4.5vw, 1.1rem);
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const InfoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  transition: grid-template-columns 0.3s ease, gap 0.3s ease, margin-bottom 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const InfoCard = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
      'rgba(0, 0, 0, 0.03)' : // Light mode background
    'rgba(255, 255, 255, 0.03)' // Dark mode background
  };
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.background.primary === '#FFFFFF' ?
    'rgba(0, 0, 0, 0.08)' : // Light mode border
    'rgba(255, 255, 255, 0.08)' // Dark mode border
  };
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
        'rgba(0, 0, 0, 0.05)' : // Light mode hover background
        'rgba(255, 255, 255, 0.05)' // Dark mode hover background
    };
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
        'rgba(0, 0, 0, 0.12)' : // Light mode hover border
        'rgba(255, 255, 255, 0.12)' // Dark mode hover border
    };
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: ${props => props.theme.spacing.sm};
    border-radius: 8px;
    
    &:hover {
      transform: none; // Disable hover transform on very small screens
    }
  }
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// InfoValue styling
const InfoValue = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.accent.primary};
  white-space: pre-line;
`;

// Modern Glowing Glass Button with advanced effects
const ModernGlassButton = styled(motion.button)`
  position: relative;
  background: ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
    `linear-gradient(145deg, 
      rgba(230, 240, 250, 0.8) 0%,
      rgba(210, 225, 245, 0.7) 50%,
      rgba(200, 215, 240, 0.6) 100%
    )` : 
    `linear-gradient(145deg, 
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.05) 100%
    )`
  };
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
    'rgba(200, 215, 240, 0.8)' : 
    'rgba(255, 255, 255, 0.2)'
  };
  border-radius: 16px;
  padding: 16px 32px;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
      props.theme.colors.text.primary : // Light mode text color (black)
      'white' // Dark mode text color
  };
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
    `0 8px 20px rgba(0, 0, 0, 0.07),
     0 2px 8px rgba(0, 0, 0, 0.04),
     inset 0 1px 0 rgba(255, 255, 255, 0.6)` :
    `0 8px 32px rgba(0, 0, 0, 0.12),
     0 2px 8px rgba(0, 0, 0, 0.08),
     inset 0 1px 0 rgba(255, 255, 255, 0.15)`
  };
  align-self: flex-start;
  min-width: 220px;
  transform: translateZ(0);
  
  // Add subtle glow before hover
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg,
      ${props => props.theme.colors.accent.primary}${props => props.theme.colors.background.primary === '#FFFFFF' ? '30' : '40'} 0%,
      ${props => props.theme.colors.section.introduction}${props => props.theme.colors.background.primary === '#FFFFFF' ? '20' : '30'} 50%,
      ${props => props.theme.colors.accent.secondary}${props => props.theme.colors.background.primary === '#FFFFFF' ? '30' : '40'} 100%
    );
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  // Shimmer effect
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
        'rgba(255, 255, 255, 0.7)' : 
        'rgba(255, 255, 255, 0.4)'
      },
      transparent
    );
    transition: left 0.6s ease;
    z-index: 1; 
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${props => props.theme.colors.background.primary === '#FFFFFF' ?
      `0 15px 30px rgba(0, 0, 0, 0.08),
       0 6px 12px rgba(0, 0, 0, 0.05),
       inset 0 1px 0 rgba(255, 255, 255, 0.8),
       0 0 20px ${props.theme.colors.accent.primary}30` :
      `0 20px 40px rgba(0, 0, 0, 0.15),
       0 8px 16px rgba(0, 0, 0, 0.1),
       inset 0 1px 0 rgba(255, 255, 255, 0.25),
       0 0 30px ${props.theme.colors.accent.primary}40`
    };
    border-color: ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
      `rgba(180, 200, 240, 0.9)` : 
      `rgba(255, 255, 255, 0.4)`
    };
    background: ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
      `linear-gradient(145deg, 
        rgba(230, 240, 255, 0.9) 0%,
        rgba(210, 230, 250, 0.8) 50%,
        rgba(200, 220, 245, 0.7) 100%
      )` : 
      `linear-gradient(145deg, 
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.1) 100%
      )`
    };
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
    transition: all 0.1s ease;
  }
  
  // Add pulsing glow animation on focus
  &:focus {
    outline: none;
    animation: ${props => props.theme.colors.background.primary === '#FFFFFF' ? 
      'pulse-glow-light' : 
      'pulse-glow-dark'} 2s infinite;
  }
  
  @keyframes pulse-glow-dark {
    0%, 100% {
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        0 0 20px ${props => props.theme.colors.accent.primary}30;
    }
    50% {
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.25),
        0 0 40px ${props => props.theme.colors.accent.primary}60;
    }
  }
  
  @keyframes pulse-glow-light {
    0%, 100% {
      box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.08),
        0 6px 12px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        0 0 15px ${props => props.theme.colors.accent.primary}20;
    }
    50% {
      box-shadow: 
        0 15px 30px rgba(0, 0, 0, 0.08),
        0 6px 12px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        0 0 30px ${props => props.theme.colors.accent.primary}40;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-self: center;
    padding: 16px 40px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 300px;
    padding: 16px 24px;
    font-size: 1rem;
    min-width: auto;
  }
`;

// Adding a subtle floating animation container
const FloatingButtonContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
  align-self: flex-start;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-self: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

// Original ActionButton (keeping for reference)
const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg,
    ${props => props.theme.colors.accent.primary} 0%,
    ${props => props.theme.colors.section.introduction} 100%
  );
  color: white;
  border: none;
  border-radius: 12px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-self: center;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: 1rem;
  }
`;

// Old button, keeping the definition for reference but we'll use the new button
const ActionButtonOld = styled(motion.button)`
  background: linear-gradient(135deg,
    ${props => props.theme.colors.accent.primary} 0%,
    ${props => props.theme.colors.section.introduction} 100%
  );
  color: white;
  border: none;
  border-radius: 8px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(108, 99, 255, 0.25);
  align-self: flex-start;
  position: relative;
  overflow: hidden;
  min-width: 180px;
  min-height: 60px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.05)
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(108, 99, 255, 0.35);
  }

  &:hover::before {
    opacity: 1;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-self: center;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: 1rem;
  }
`;

// Glass button overlay
const GlassLayerOld = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(60, 60, 100, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  transform: translate(-6px, -7px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;

  ${ActionButtonOld}:hover & {
    transform: translate(0, 0);
    background: rgba(60, 60, 100, 0.25);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  }

  ${ActionButtonOld}:active & {
    transform: translateY(1px);
    transition: all 0.1s ease;
  }
`;

// New wrapper for mobile layout reordering
const MobileImageWrapper = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    order: 2;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  @media (min-width: calc(${props => props.theme.breakpoints.md} + 1px)) {
    /* On desktop, this is positioned as the second grid item */
  }
`;

// New wrapper for the morphing image, glow, and shimmer
const MorphingImageWrapper = styled(motion.div)`
  position: relative;
  width: min(380px, 100%);
  max-width: 380px;
  aspect-ratio: 1;
  margin: auto;
  overflow: hidden;
  animation: ${blobMorph} 18s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  will-change: border-radius, transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 1s ease-in-out;

  // Glow effect
  box-shadow: 
    0 0 15px 3px ${props => props.theme.colors.accent.primary}40, 
    0 0 30px 10px ${props => props.theme.colors.section.introduction}30;

  // Shimmer effect pseudo-element
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0; 
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.08),
      transparent
    );
    animation: ${shimmerAnimation} 3.5s ease-in-out infinite;
    z-index: ${Z_INDEX.SHIMMER_EFFECT};
    border-radius: inherit;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: min(350px, 45vw);
    max-width: 350px;
    animation: none; /* Disable animation on mobile */
    border-radius: 42% 56% 72% 28% / 42% 42% 56% 48%;
    box-shadow: 
      0 0 10px 2px ${props => props.theme.colors.accent.primary}30, 
      0 0 20px 7px ${props => props.theme.colors.section.introduction}20;
    margin: ${props => props.theme.spacing.lg} auto;
    
    &::before {
      animation-duration: 5s;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: min(300px, 55vw);
    max-width: 300px;
    box-shadow: 
      0 0 8px 2px ${props => props.theme.colors.accent.primary}25, 
      0 0 16px 6px ${props => props.theme.colors.section.introduction}15;
    margin: ${props => props.theme.spacing.md} auto; // Default for sm (e.g., landscape)

    @media (orientation: portrait) {
      margin: ${props => props.theme.spacing.xs} auto; // Tighter for sm portrait
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: min(250px, 60vw);
    max-width: 250px;
    margin: ${props => props.theme.spacing.sm} auto; // Default for xs (landscape)
    box-shadow: 
      0 0 6px 1px ${props => props.theme.colors.accent.primary}20, 
      0 0 12px 4px ${props => props.theme.colors.section.introduction}10;

    @media (orientation: portrait) {
      margin: ${props => props.theme.spacing.xs} auto; // Tighter for xs portrait
    }
  }

  @media (max-height: 600px) and (max-width: ${props => props.theme.breakpoints.sm}) {
    // Special case for landscape mobile or short screens
    width: min(200px, 30vw);
    max-width: 200px;
    margin: ${props => props.theme.spacing.xs} auto;
  }

  @media (max-height: 500px) and (max-width: ${props => props.theme.breakpoints.sm}) {
    // Very short screens
    width: min(150px, 25vw);
    max-width: 150px;
  }
`;

// BlobShadow now lives inside MorphingImageWrapper and fills it
const BlobShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.accent.primary}10, 
    ${props => props.theme.colors.section.introduction}08,
    ${props => props.theme.colors.section['cellular-biology']}10
  );
  z-index: ${Z_INDEX.BLOB_SHADOW};
  filter: blur(15px);
  opacity: 0.7;
`;

// New blob overlay from HTML example
const BlobOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.accent.primary}30,
    rgba(0, 0, 0, 0)
  );
  z-index: ${Z_INDEX.BLOB_SHADOW + 1};
  mix-blend-mode: overlay;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  ${MorphingImageWrapper}:hover & {
    opacity: 0.8;
  }
`;

// HeroImage now lives inside MorphingImageWrapper and fills it
const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
  transition: opacity 0.4s ease, filter 0.4s ease, transform 0.8s ease;
  filter: contrast(1.05) brightness(1.0);
  position: relative;
  z-index: ${Z_INDEX.HERO_IMAGE};

  ${MorphingImageWrapper}:hover & {
    opacity: 1;
    filter: contrast(1.1) brightness(1.05);
    transform: scale(1.05);
  }
`;

// ImagePlaceholderContent for when image fails or is loading (inside MorphingImageWrapper)
const ImagePlaceholderContent = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.section.introduction}15,
    ${props => props.theme.colors.accent.primary}10,
    ${props => props.theme.colors.section['cellular-biology']}15
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: ${Z_INDEX.HERO_IMAGE};

  .placeholder-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 0.9rem;
    .placeholder-icon {
      font-size: 2rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.8rem;
    padding: 15px;
    .placeholder-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
  }
`;

interface WelcomePageProps {
  onStartPresentation: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartPresentation }) => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(60);

  // Use our custom hooks
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to highlight "Cellular" in the title
  const renderTitleWithHighlight = (titleText: string): React.ReactNode => {
    let currentTitle = titleText;

    // Ensure titleText is a string to prevent errors if i18n key is missing/wrong
    if (typeof titleText !== 'string') {
      console.error("WelcomePage: titleText is not a string, received:", titleText);
      return titleText; // Return as is or some fallback
    }

    // Normalize title from "Cancer Biochemistry" to "Cellular Biochemistry"
    if (currentTitle.includes("Cancer Biochemistry")) {
        currentTitle = currentTitle.replace("Cancer Biochemistry", "Cellular Biochemistry");
    } else if (currentTitle.includes("بیوشیمی سرطان")) { // Farsi for "Cancer Biochemistry"
        // Assuming Farsi for "Cellular Biochemistry" is "بیوشیمی سلولی" (Biochemistry Cellular)
        // or "سلولی بیوشیمی" (Cellular Biochemistry). Let's assume "بیوشیمی سلولی" for this replacement.
        // The key is that "بیوشیمی" maps to Biochemistry and "سلولی" maps to Cellular.
        currentTitle = currentTitle.replace("بیوشیمی سرطان", "بیوشیمی سلولی"); 
    }

    // return currentTitle; // UPDATED: Return the normalized title string directly
    return currentTitle;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
    }
  };

  const handleImageLoad = () => { setImageLoaded(true); setImageError(false); };
  const handleImageError = () => { setImageError(true); setImageLoaded(false); };

  return (
    <WelcomeContainer>
      <EffectsLayerContainer>
        <StarrySky/>
        <EffectBlob1/>
        <EffectBlob2/>
        <EffectBlob3/>
        <EffectBlob4/>
        <EffectBlob5/>
        <EffectDotPattern />
        <EffectCircleOutline />
        <EffectBlobOutline1 />
        <EffectBlobOutline2 />
      </EffectsLayerContainer>

      <Header>
        <HeaderControls>
          <ThemeSwitcher/>
          <LanguageSwitcher/>
        </HeaderControls>
        <MobileStartButton onClick={onStartPresentation}>
          {t('welcome.startPresentation')}
        </MobileStartButton>
      </Header>

      <MainContent headerHeight={headerHeight}>
        <ContentLayout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TextSection> 
            <TitleSubtitleSection>
              <Title variants={itemVariants}>
                {renderTitleWithHighlight(t('welcome.title'))}
              </Title>
              <Subtitle variants={itemVariants}>{t('welcome.subtitle')}</Subtitle>
            </TitleSubtitleSection>
            
            <InfoAndActionSection>
              <InfoGrid variants={itemVariants}>
                <InfoCard>
                  <InfoLabel>{t('welcome.presentedBy')}</InfoLabel>
                  <InfoValue>
                    {t('welcome.presenter.name')}
                    <br />
                    {t('welcome.presenter.name2')}
                  </InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>{t('welcome.supervisedBy')}</InfoLabel>
                  <InfoValue>
                    {t('welcome.supervisor.name')}
                    <br />
                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      {t('welcome.supervisor.title')}
                    </span>
                  </InfoValue>
                </InfoCard>
              </InfoGrid>
              
              {/* Use new modern glass button */}
              <FloatingButtonContainer
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ModernGlassButton
                  onClick={onStartPresentation}
                >
                  {t('welcome.startPresentation')}
                </ModernGlassButton>
              </FloatingButtonContainer>
            </InfoAndActionSection>
          </TextSection>

          <MobileImageWrapper>
            <MorphingImageWrapper
              variants={visualVariants} 
              initial="hidden"
              animate="visible"
              whileHover={isMobile ? {} : { scale: 1.03 }}
            >
              <BlobShadow />
              <BlobOverlay />
              {!imageError && (
                <HeroImage
                  src={heroImage}
                  alt="Cellular Biochemistry Molecular Illustration"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
              )}
              {(imageError || !imageLoaded) && (
                <ImagePlaceholderContent>
                  <span className="placeholder-icon" role="img" aria-label="science icons">🧬⚛️🔬</span>
                  <div>
                    <div>Cellular Biochemistry</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                      Molecular Pathways & Cellular Biology
                    </div>
                  </div>
                </ImagePlaceholderContent>
              )}
            </MorphingImageWrapper>
          </MobileImageWrapper>
        </ContentLayout>
      </MainContent>
    </WelcomeContainer>
  );
};

export default WelcomePage;
