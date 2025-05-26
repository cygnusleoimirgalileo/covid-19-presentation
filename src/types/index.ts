export interface Slide {
    id: string;
    title: string;
    content: React.ReactNode;
    section: SectionType;
    index: number;
}

export enum SectionType {
    INTRODUCTION = 'introduction',
    CELLULAR_BIOLOGY = 'cellular-biology',
    MOLECULAR_PATHWAYS = 'molecular-pathways',
    HALLMARKS = 'hallmarks',
    TREATMENT = 'treatment',
    STATISTICS = 'statistics',
    FUTURE = 'future'
}

export interface Section {
    id: SectionType;
    title: string;
    slides: Slide[];
    color: string;
}

export interface PresentationState {
    currentSlideId: string;
    currentSectionId: SectionType;
    presentationMode: boolean;
    isPaused: boolean;
}

export interface InteractiveElement {
    id: string;
    type: 'hotspot' | 'quiz' | 'expandable' | 'timeline' | 'pathway';
    content: React.ReactNode;
    position?: { x: number; y: number };
    size?: { width: number; height: number };
}

export interface MolecularModel {
    id: string;
    name: string;
    description: string;
    modelPath: string;
    type: 'protein' | 'gene' | 'cell' | 'drug';
}