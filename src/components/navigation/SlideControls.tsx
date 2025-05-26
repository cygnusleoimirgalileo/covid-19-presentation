import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../store/LanguageContext';

interface SlideControlsProps {
    onPrev: () => void;
    onNext: () => void;
    currentIndex: number;
    totalSlides: number;
}

const ControlsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.sm};
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    gap: ${props => props.theme.spacing.sm};
  }

  [dir="rtl"] & {
    flex-direction: row-reverse;
  }
`;

const ControlButton = styled(motion.button)<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.tertiary};
  color: ${props => props.disabled ? props.theme.colors.text.secondary : props.theme.colors.text.primary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  border: none;
  outline: none;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.accent.primary};
    color: ${props => props.theme.colors.background.primary};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 42px; /* Slightly larger for touch targets on mobile */
    height: 42px;
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 34px;
    height: 34px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const SlideControls: React.FC<SlideControlsProps> = ({
                                                         onPrev,
                                                         onNext,
                                                         currentIndex,
                                                         totalSlides
                                                     }) => {
    const { t } = useTranslation();
    const { isRtl } = useLanguage();

    // For RTL layout, reverse the previous and next button functionality
    const handlePrev = isRtl ? onNext : onPrev;
    const handleNext = isRtl ? onPrev : onNext;
    const isFirstSlide = isRtl ? currentIndex === totalSlides - 1 : currentIndex === 0;
    const isLastSlide = isRtl ? currentIndex === 0 : currentIndex === totalSlides - 1;

    return (
        <ControlsContainer>
            <ControlButton
                onClick={handlePrev}
                disabled={isFirstSlide}
                whileTap={{ scale: 0.9 }}
                aria-label={t('common.previous')}
                title={t('common.previous')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
            </ControlButton>

            <ControlButton
                onClick={handleNext}
                disabled={isLastSlide}
                whileTap={{ scale: 0.9 }}
                aria-label={t('common.next')}
                title={t('common.next')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </ControlButton>
        </ControlsContainer>
    );
};

export default SlideControls;
