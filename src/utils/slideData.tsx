import React from 'react';
import {Section, SectionType, Slide} from '../types';

// We'll create placeholder slide content now and populate with actual components later
const createSlide = (id: string, titleKey: string, sectionType: SectionType, index: number, content?: React.ReactNode): Slide => ({
    id,
    title: titleKey, // This will now store the translation key instead of the actual text
    content: content || <div>{titleKey}</div>, // Use provided content or placeholder
    section: sectionType,
    index,
});

// Define all sections with updated titles and colors for the metabolism theme
export const sections: Section[] = [
    {
        id: SectionType.INTRODUCTION,
        title: 'sections.introduction', // Translation key
        slides: [],
        color: '#5E35B1'
    },
    {
        id: SectionType.CELLULAR_BIOLOGY,
        title: 'sections.cellular-biology', // Translation key
        slides: [],
        color: '#0097A7'
    },
    {
        id: SectionType.MOLECULAR_PATHWAYS,
        title: 'sections.molecular-pathways', // Translation key
        slides: [],
        color: '#43A047'
    },
    {
        id: SectionType.HALLMARKS,
        title: 'sections.hallmarks', // Translation key
        slides: [],
        color: '#FF9800'
    },
    {
        id: SectionType.TREATMENT,
        title: 'sections.treatment', // Translation key
        slides: [],
        color: '#D32F2F'
    },
    {
        id: SectionType.STATISTICS,
        title: 'sections.statistics', // Translation key
        slides: [],
        color: '#7986CB'
    },
    {
        id: SectionType.FUTURE,
        title: 'sections.future', // Translation key
        slides: [],
        color: '#8E24AA'
    }
];

// Define all slides based on the Cancer Cell Metabolism theme
export const slides: Slide[] = [
    // Introduction Section (3 slides)
    createSlide('intro-1', 'slides.intro-1.title', SectionType.INTRODUCTION, 0),
    createSlide('intro-2', 'slides.intro-2.title', SectionType.INTRODUCTION, 1),
    createSlide('intro-3', 'slides.intro-3.title', SectionType.INTRODUCTION, 2),

    // Cellular Biology Foundations Section (6 slides) - Updated count
    createSlide('cell-1', 'slides.cell-1.title', SectionType.CELLULAR_BIOLOGY, 3),
    createSlide('cell-1-video', 'slides.cell-1.title', SectionType.CELLULAR_BIOLOGY, 4),
    createSlide('cell-2', 'slides.cell-2.title', SectionType.CELLULAR_BIOLOGY, 5),
    createSlide('cell-3', 'slides.cell-3.title', SectionType.CELLULAR_BIOLOGY, 6),
    createSlide('cell-4', 'slides.cell-4.title', SectionType.CELLULAR_BIOLOGY, 7),
    createSlide('cell-5', 'slides.cell-5.title', SectionType.CELLULAR_BIOLOGY, 8),

    // Molecular Pathways Section (2 slides)
    createSlide('mol-1', 'slides.mol-1.title', SectionType.MOLECULAR_PATHWAYS, 9),
    createSlide('mol-2', 'slides.mol-2.title', SectionType.MOLECULAR_PATHWAYS, 10),

    // Clinical Manifestations Section (3 slides)
    createSlide('hall-1', 'slides.hall-1.title', SectionType.HALLMARKS, 11),
    createSlide('hall-2', 'slides.hall-2.title', SectionType.HALLMARKS, 12),
    createSlide('hall-3', 'slides.hall-3.title', SectionType.HALLMARKS, 13),

    // Treatment Approaches Section (3 slides)
    createSlide('treat-1', 'slides.treat-1.title', SectionType.TREATMENT, 14),
    createSlide('treat-3', 'slides.treat-3.title', SectionType.TREATMENT, 15),
    createSlide('treat-5', 'slides.treat-5.title', SectionType.TREATMENT, 16),

    // Statistics & Epidemiology Section (2 slides)
    createSlide('stats-1', 'slides.stats-1.title', SectionType.STATISTICS, 17),
    createSlide('stats-3', 'slides.stats-3.title', SectionType.STATISTICS, 18),

    // Future Directions Section (3 slides)
    createSlide('future-1', 'slides.future-1.title', SectionType.FUTURE, 19),
    createSlide('future-2', 'slides.future-2.title', SectionType.FUTURE, 20),
    createSlide('future-5', 'slides.future-5.title', SectionType.FUTURE, 21),
];

// Update sections with their slides
sections.forEach(section => {
    section.slides = slides.filter(slide => slide.section === section.id);
});

// Debug: Log slides to make sure our new slide is included
console.log('Slides data loaded:', slides.length, 'slides');
console.log('Cell-1-video slide:', slides.find(s => s.id === 'cell-1-video'));
console.log('Cellular Biology section slides:', sections.find(s => s.id === 'cellular-biology')?.slides.length);
