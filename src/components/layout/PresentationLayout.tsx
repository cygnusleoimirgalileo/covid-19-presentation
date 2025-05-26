import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {usePresentation} from '../../store/PresentationContext';
import Sidebar from '../navigation/Sidebar';
import ProgressBar from '../navigation/ProgressBar';
import SlideControls from '../navigation/SlideControls';
import {motion, AnimatePresence} from 'framer-motion';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../store/LanguageContext';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background.primary};
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0); /* Handle notches on mobile */
`;

const SlideContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
  }
  
  /* Ensure content doesn't touch the footer */
  @media (max-height: 600px) {
    padding-bottom: 1.5rem;
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    padding-top: 3rem; /* Add more space at the top for mobile navigation buttons */
    padding-bottom: 1rem; /* Add space above footer */
  }
`;

const SlideWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterContainer = styled.footer`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: ${props => props.theme.colors.background.secondary};
  position: relative;
  z-index: 5;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 15px;
    height: min(60px, 8vh);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 10px;
    height: min(60px, 10vh);
  }

  /* Landscape orientation specific styles */
  @media (max-height: 500px) and (orientation: landscape) {
    height: min(45px, 15vh);
    padding: 0 15px;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    top: 20px;
    right: 20px;
    gap: ${props => props.theme.spacing.sm};
  }

  [dir="rtl"] & {
    right: auto;
    left: 24px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      left: 20px;
    }
  }
`;

const MenuButton = styled.button`
    position: absolute;
    top: 24px;
    /* Position adjusted by RTL logic below */
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.background.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.theme.shadows.small};
    display: none; /* Hidden by default, shown in media query */

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        display: flex;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        top: 20px;
        width: 36px;
        height: 36px;
    }

    /* Default LTR positioning */
    left: 24px;
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        left: 20px;
    }

    /* RTL positioning */
    [dir="rtl"] & {
        left: auto;
        right: 24px;
        @media (max-width: ${props => props.theme.breakpoints.sm}) {
            right: 20px;
        }
    }

    svg {
        width: 20px;
        height: 20px;
        color: ${props => props.theme.colors.text.primary};

        @media (max-width: ${props => props.theme.breakpoints.sm}) {
            width: 18px;
            height: 18px;
    }
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

const PresentationLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {
        state,
        slideIndex,
        totalSlides,
        goToNextSlide,
        goToPrevSlide
    } = usePresentation();
    const { direction } = useLanguage();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile based on screen width
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, [isMobileMenuOpen]);

    // Handle swipe navigation for mobile
    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            const minSwipeDistance = 50;
            
            // Adjust swipe direction based on language direction (RTL/LTR)
            if (direction === 'rtl') {
                // In RTL, swap the direction of swipe actions
                if (swipeDistance > minSwipeDistance) {
                    goToNextSlide(); // Swipe right -> go to next slide in RTL
                } else if (swipeDistance < -minSwipeDistance) {
                    goToPrevSlide(); // Swipe left -> go to previous slide in RTL
                }
            } else {
                // Original LTR behavior
                if (swipeDistance > minSwipeDistance) {
                    goToPrevSlide(); // Swipe right -> go to previous slide
                } else if (swipeDistance < -minSwipeDistance) {
                    goToNextSlide(); // Swipe left -> go to next slide
                }
            }
        };

        if (isMobile) {
            document.addEventListener('touchstart', handleTouchStart);
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, goToNextSlide, goToPrevSlide, direction]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <LayoutContainer>
            <ControlsContainer>
                <LanguageSwitcher />
                <ThemeSwitcher />
            </ControlsContainer>

            {isMobile && (
                <MenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </MenuButton>
            )}

            {/* Mobile menu overlay */}
            {isMobile && isMobileMenuOpen && (
                <MobileOverlay
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar with conditional rendering for mobile */}
            <AnimatePresence>
                {(!isMobile || (isMobile && isMobileMenuOpen)) && !state.presentationMode && (
                    <Sidebar mobile={isMobile} closeMobileMenu={() => setIsMobileMenuOpen(false)}/>
                )}
            </AnimatePresence>

            <MainContent>
                <SlideContainer>
                    <AnimatePresence mode='wait'>
                        <SlideWrapper
                            key={state.currentSlideId}
                            initial={{opacity: 0, x: direction === 'rtl' ? -100 : 100}} 
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: direction === 'rtl' ? 100 : -100}}
                            transition={{duration: 0.3}}
                        >
                            {children}
                        </SlideWrapper>
                    </AnimatePresence>
                </SlideContainer>
                <FooterContainer>
                    <ProgressBar
                        currentIndex={slideIndex}
                        totalSlides={totalSlides}
                        sectionId={state.currentSectionId}
                        isMobile={isMobile}
                    />
                    <SlideControls
                        onNext={goToNextSlide}
                        onPrev={goToPrevSlide}
                        currentIndex={slideIndex}
                        totalSlides={totalSlides}
                    />
                </FooterContainer>
            </MainContent>
        </LayoutContainer>
    );
};

export default PresentationLayout;
