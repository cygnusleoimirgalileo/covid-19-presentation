import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {PresentationState, SectionType, Slide} from '../types';
import {slides as slideData} from '../utils/slideData';

interface PresentationContextProps {
    state: PresentationState;
    allSlides: Slide[];
    goToNextSlide: () => void;
    goToPrevSlide: () => void;
    goToSlide: (slideId: string) => void;
    goToSection: (sectionId: SectionType) => void;
    togglePresentationMode: () => void;
    togglePause: () => void;
    currentSlide: Slide | undefined;
    slideIndex: number;
    totalSlides: number;
}

// Default state for presentation
const initialState: PresentationState = {
    currentSlideId: 'intro-1',
    currentSectionId: SectionType.INTRODUCTION,
    presentationMode: false,
    isPaused: false
};

// Create context
const PresentationContext = createContext<PresentationContextProps | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, setState] = useState<PresentationState>(initialState);
    const [allSlides] = useState<Slide[]>(slideData);

    // Debug: log all slides when component mounts
    React.useEffect(() => {
        console.log('All slides loaded:', allSlides.map(s => ({id: s.id, title: s.title, index: s.index})));
        console.log('Cellular Biology slides:', allSlides.filter(s => s.section === SectionType.CELLULAR_BIOLOGY).map(s => ({
            id: s.id,
            title: s.title,
            index: s.index
        })));
    }, [allSlides]);

    // Find the current slide
    const currentSlide = allSlides.find(slide => slide.id === state.currentSlideId);
    const slideIndex = currentSlide ? allSlides.findIndex(slide => slide.id === currentSlide.id) : 0;
    const totalSlides = allSlides.length;

    // Navigation functions using useCallback to prevent unnecessary re-renders
    const goToNextSlide = useCallback(() => {
        const nextIndex = slideIndex + 1;
        if (nextIndex < totalSlides) {
            const nextSlide = allSlides[nextIndex];
            setState(prev => ({
                ...prev,
                currentSlideId: nextSlide.id,
                currentSectionId: nextSlide.section
            }));
        }
    }, [slideIndex, totalSlides, allSlides]);

    const goToPrevSlide = useCallback(() => {
        const prevIndex = slideIndex - 1;
        if (prevIndex >= 0) {
            const prevSlide = allSlides[prevIndex];
            setState(prev => ({
                ...prev,
                currentSlideId: prevSlide.id,
                currentSectionId: prevSlide.section
            }));
        }
    }, [slideIndex, allSlides]);

    const goToSlide = useCallback((slideId: string) => {
        const targetSlide = allSlides.find(slide => slide.id === slideId);
        if (targetSlide) {
            setState(prev => ({
                ...prev,
                currentSlideId: targetSlide.id,
                currentSectionId: targetSlide.section
            }));
        }
    }, [allSlides]);

    const goToSection = useCallback((sectionId: SectionType) => {
        const firstSlideInSection = allSlides.find(slide => slide.section === sectionId);
        if (firstSlideInSection) {
            setState(prev => ({
                ...prev,
                currentSlideId: firstSlideInSection.id,
                currentSectionId: sectionId
            }));
        }
    }, [allSlides]);

    const togglePresentationMode = useCallback(() => {
        setState(prev => ({
            ...prev,
            presentationMode: !prev.presentationMode
        }));
    }, []);

    const togglePause = useCallback(() => {
        setState(prev => ({
            ...prev,
            isPaused: !prev.isPaused
        }));
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                    goToNextSlide();
                    break;
                case 'ArrowLeft':
                    goToPrevSlide();
                    break;
                case 'f':
                    togglePresentationMode();
                    break;
                case 'Escape':
                    if (state.presentationMode) togglePresentationMode();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.presentationMode, goToNextSlide, goToPrevSlide, togglePresentationMode]);

    const value = {
        state,
        allSlides,
        goToNextSlide,
        goToPrevSlide,
        goToSlide,
        goToSection,
        togglePresentationMode,
        togglePause,
        currentSlide,
        slideIndex,
        totalSlides
    };

    return (
        <PresentationContext.Provider value={value}>
            {children}
        </PresentationContext.Provider>
    );
};

export const usePresentation = (): PresentationContextProps => {
    const context = useContext(PresentationContext);
    if (context === undefined) {
        throw new Error('usePresentation must be used within a PresentationProvider');
    }
    return context;
};
