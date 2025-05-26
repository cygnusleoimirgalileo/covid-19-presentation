import React from 'react';
import styled from 'styled-components';
import {SectionType} from '../../types';
import {theme} from '../../styles/theme';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../store/LanguageContext';

interface ProgressBarProps {
    currentIndex: number;
    totalSlides: number;
    sectionId: SectionType;
    isMobile?: boolean;
}

const ProgressContainer = styled.div<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.xs}; /* Use smaller gap for very small screens */
    flex-direction: row; /* Ensure horizontal layout */
    align-items: center; /* Align items vertically centered */
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    flex-direction: row;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }

  /* RTL specific styles */
  [dir="rtl"] & {
    flex-direction: row-reverse;
  }
`;

const BarContainer = styled.div<{ isMobile?: boolean }>`
  width: 200px;
  height: 8px;
  background-color: ${props => props.theme.colors.background.tertiary};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 150px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 80px; /* Adjusted width for small portrait screens */
    height: 6px; /* Slightly smaller height */
    order: initial; /* Remove order reliance from isMobile */
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    width: 120px;
    height: 6px;
    order: initial;
  }
`;

const Progress = styled.div<{ width: string; color: string; isRtl: boolean }>`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color};
  border-radius: 4px;
  transition: width 0.3s ease;
  transform-origin: ${props => props.isRtl ? 'right' : 'left'};
  
  /* RTL specific styles */
  ${props => props.isRtl && `
    margin-left: auto;
  `}
`;

const SlideCounter = styled.div<{ isMobile?: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem; /* Smaller font for small screens */
    order: initial; /* Remove order reliance from isMobile */
    margin-top: 0; /* Remove margin for column layout */
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: 0.8rem;
    order: initial;
    margin-top: 0;
  }

  /* RTL specific styles */
  [dir="rtl"] & {
    font-family: ${props => props.theme.fonts.farsi};
  }
`;

const SectionIndicator = styled.div<{ color: string; isMobile?: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  font-weight: 500;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: ${props => props.theme.spacing.xs};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem; /* Smaller font for small screens */
    order: initial; /* Remove order reliance from isMobile */
    margin-bottom: 0; /* Remove margin for column layout */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px; /* Adjusted max-width for small portrait screens */
    
    &::before {
      width: 6px; /* Smaller indicator dot */
      height: 6px;
    }
  }
  
  /* Special handling for landscape mode */
  @media (max-height: 500px) and (orientation: landscape) {
    font-size: 0.8rem;
    order: initial;
    margin-bottom: 0;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &::before {
      width: 6px;
      height: 6px;
    }
  }

  /* RTL specific styles */
  [dir="rtl"] & {
    font-family: ${props => props.theme.fonts.farsi};
    
    &::before {
      margin-right: 0;
      margin-left: ${props => props.theme.spacing.xs};
    }
  }
`;

const ProgressBar: React.FC<ProgressBarProps> = ({currentIndex, totalSlides, sectionId, isMobile}) => {
    const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
    const sectionColor = theme.colors.section[sectionId];
    const { t } = useTranslation();
    const { isRtl } = useLanguage();

    // Get translated section name
    const getSectionName = (sectionId: SectionType) => {
        const sectionKey = sectionId.toLowerCase().replace('_', '');
        return t(`sections.${sectionKey}`) || sectionId.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <ProgressContainer isMobile={isMobile}>
            <SectionIndicator color={sectionColor} isMobile={isMobile}>
                {getSectionName(sectionId)}
            </SectionIndicator>
            <BarContainer isMobile={isMobile}>
                <Progress 
                    width={`${progressPercentage}%`} 
                    color={sectionColor}
                    isRtl={isRtl}
                />
            </BarContainer>
            <SlideCounter isMobile={isMobile}>
                {isRtl 
                    ? `${totalSlides} ${t('common.of')} ${currentIndex + 1}`
                    : `${currentIndex + 1} ${t('common.of')} ${totalSlides}`
                }
            </SlideCounter>
        </ProgressContainer>
    );
};

export default ProgressBar;
