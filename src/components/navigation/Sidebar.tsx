import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {usePresentation} from '../../store/PresentationContext';
import {sections as sectionsData} from '../../utils/slideData'; // Renamed import to avoid conflict
import {SectionType} from '../../types';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../store/LanguageContext';

interface SidebarProps {
    mobile?: boolean;
    closeMobileMenu?: () => void;
}

const SidebarContainer = styled(motion.aside)<{ isMobile?: boolean }>`
    width: 250px;
    height: 100%;
    background-color: ${props => props.theme.colors.background.secondary};
    border-right: 1px solid ${props => props.theme.colors.background.tertiary};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 10;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        position: fixed;
        top: 0;
        left: 0;
        width: ${props => props.isMobile ? '270px' : '250px'};
        box-shadow: ${props => props.isMobile ? props.theme.shadows.large : 'none'};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: ${props => props.isMobile ? '85vw' : '250px'};
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        border-right: none;
        border-left: 1px solid ${props => props.theme.colors.background.tertiary};
        
        @media (max-width: ${props => props.theme.breakpoints.md}) {
            left: auto;
            right: 0;
        }
    }
`;

const SidebarHeader = styled.div`
    padding: ${props => props.theme.spacing.lg};
    border-bottom: 1px solid ${props => props.theme.colors.background.tertiary};
    
    h2 {
        font-size: 1.5rem;
        margin-bottom: ${props => props.theme.spacing.xs};
        color: ${props => props.theme.colors.text.primary};
    }
    
    p {
        font-size: 0.9rem;
        color: ${props => props.theme.colors.text.secondary};
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        h2, p {
            font-family: ${props => props.theme.fonts.farsi};
        }
    }
`;

const SectionList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
`;

const SectionItem = styled.li<{ isActive: boolean; color: string }>`
    border-left: 4px solid ${props => props.isActive ? props.color : 'transparent'};
    background-color: ${props => props.isActive ? props.theme.colors.background.tertiary : 'transparent'};
    
    &:hover {
        background-color: ${props => props.theme.colors.background.tertiary};
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        border-left: none;
        border-right: 4px solid ${props => props.isActive ? props.color : 'transparent'};
    }
`;

const SectionButton = styled.button<{ color: string }>`
    width: 100%;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    text-align: left;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.text.primary};
    
    &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${props => props.color};
        margin-right: ${props => props.theme.spacing.sm};
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        text-align: right;
        font-family: ${props => props.theme.fonts.farsi};
        
        &::before {
            margin-right: 0;
            margin-left: ${props => props.theme.spacing.sm};
        }
    }
`;

const SlideList = styled.ul`
    list-style: none;
    margin: 0;
    padding-left: ${props => props.theme.spacing.lg};
    padding-right: 0;
    overflow: hidden;

    /* RTL specific styles */
    [dir="rtl"] & {
        padding-left: 0;
        padding-right: ${props => props.theme.spacing.lg};
    }
`;

const SlideItem = styled.li<{ isActive: boolean }>`
    background-color: ${props => props.isActive ? props.theme.colors.background.tertiary : 'transparent'};
    
    &:hover {
        background-color: ${props => props.theme.colors.background.tertiary};
    }
`;

const SlideButton = styled.button`
    width: 100%;
    padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
    text-align: left;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text.secondary};
    
    &:hover {
        color: ${props => props.theme.colors.text.primary};
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        text-align: right;
        font-family: ${props => props.theme.fonts.farsi};
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background.tertiary};
    color: ${props => props.theme.colors.text.primary};

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background-color: ${props => props.theme.colors.accent.secondary};
        color: white;
    }

    /* RTL specific styles */
    [dir="rtl"] & {
        right: auto;
        left: 15px;
    }
`;

const Sidebar: React.FC<SidebarProps> = ({mobile = false, closeMobileMenu}) => {
    const {state, goToSlide, goToSection} = usePresentation();
    const {t} = useTranslation(); // Removed unused i18n import
    const { direction } = useLanguage();

    const handleSectionClick = (sectionId: SectionType) => {
        goToSection(sectionId);
        if (mobile && closeMobileMenu) {
            closeMobileMenu();
        }
    };

    const handleSlideClick = (slideId: string) => {
        goToSlide(slideId);
        if (mobile && closeMobileMenu) {
            closeMobileMenu();
        }
    };

    // Animation variants
    const sidebarAnimation = {
        hidden: {x: direction === 'rtl' ? '100%' : '-100%'},
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 250
            }
        },
        exit: {
            x: direction === 'rtl' ? '100%' : '-100%',
            transition: {
                duration: 0.25
            }
        }
    };

    return (
        <SidebarContainer
            isMobile={mobile}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarAnimation}
        >
            {mobile && closeMobileMenu && (
                <CloseButton onClick={closeMobileMenu} aria-label={t('common.close')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </CloseButton>
            )}

            <SidebarHeader>
                <h2>{t('common.presentationTitle') || 'Cancer Biochemistry'}</h2>
                <p>{t('common.presentationSubtitle') || 'Interactive Presentation'}</p>
            </SidebarHeader>

            <SectionList>
                {sectionsData.map(section => (
                    <React.Fragment key={section.id}>
                        <SectionItem
                            isActive={state.currentSectionId === section.id}
                            color={section.color}
                        >
                            <SectionButton
                                color={section.color}
                                onClick={() => handleSectionClick(section.id as SectionType)}
                            >
                                {t(section.title)}
                            </SectionButton>
                        </SectionItem>

                        {state.currentSectionId === section.id && (
                            <SlideList>
                                {section.slides.map(slide => (
                                    <SlideItem
                                        key={slide.id}
                                        isActive={state.currentSlideId === slide.id}
                                    >
                                        <SlideButton
                                            onClick={() => handleSlideClick(slide.id)}
                                        >
                                            {t(slide.title)}
                                        </SlideButton>
                                    </SlideItem>
                                ))}
                            </SlideList>
                        )}
                    </React.Fragment>
                ))}
            </SectionList>
        </SidebarContainer>
    );
};

export default Sidebar;

