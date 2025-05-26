import {SectionType} from '../types';

// Dark theme
const darkTheme = {
    colors: {
        background: {
            primary: '#121212',
            secondary: '#1E1E1E',
            tertiary: '#2D2D2D'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
            accent: '#61DAFB'
        },
        accent: {
            primary: '#61DAFB',
            secondary: '#FF5252',
            tertiary: '#FFD740'
        },
        section: {
            [SectionType.INTRODUCTION]: '#5E35B1',
            [SectionType.CELLULAR_BIOLOGY]: '#0097A7',
            [SectionType.MOLECULAR_PATHWAYS]: '#43A047',
            [SectionType.HALLMARKS]: '#FF9800',
            [SectionType.TREATMENT]: '#D32F2F',
            [SectionType.STATISTICS]: '#7986CB',
            [SectionType.FUTURE]: '#8E24AA',
        },
        molecular: {
            protein: '#FFD54F',
            gene: '#66BB6A',
            cell: '#42A5F5',
            drug: '#EF5350'
        },
        chart: {
            base: '#61DAFB',
            accent1: '#FF4081',
            accent2: '#FFD740',
            accent3: '#00E676',
            accent4: '#7C4DFF',
            grid: 'rgba(255, 255, 255, 0.1)'
        }
    },
    fonts: {
        primary: '"Roboto", sans-serif',
        secondary: '"Montserrat", sans-serif',
        mono: '"Roboto Mono", monospace',
        farsi: '"Vazirmatn", "Roboto", sans-serif'
    },
    shadows: {
        small: '0 2px 4px rgba(0, 0, 0, 0.2)',
        medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
        large: '0 8px 16px rgba(0, 0, 0, 0.4)',
        text: '0 2px 4px rgba(0, 0, 0, 0.5)'
    },
    transitions: {
        default: 'all 0.3s ease',
        fast: 'all 0.15s ease',
        slow: 'all 0.5s ease'
    },
    breakpoints: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '3rem'
    }
};

// Light theme
const lightTheme = {
    colors: {
        background: {
            primary: '#FFFFFF',
            secondary: '#F5F5F5',
            tertiary: '#E0E0E0'
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
            accent: '#0277BD'
        },
        accent: {
            primary: '#0277BD',
            secondary: '#D32F2F',
            tertiary: '#FFA000'
        },
        section: {
            [SectionType.INTRODUCTION]: '#7E57C2',
            [SectionType.CELLULAR_BIOLOGY]: '#00ACC1',
            [SectionType.MOLECULAR_PATHWAYS]: '#66BB6A',
            [SectionType.HALLMARKS]: '#FFA726',
            [SectionType.TREATMENT]: '#EF5350',
            [SectionType.STATISTICS]: '#5C6BC0',
            [SectionType.FUTURE]: '#AB47BC',
        },
        molecular: {
            protein: '#FFB300',
            gene: '#4CAF50',
            cell: '#2196F3',
            drug: '#F44336'
        },
        chart: {
            base: '#0277BD',
            accent1: '#E91E63',
            accent2: '#FFC107',
            accent3: '#00C853',
            accent4: '#673AB7',
            grid: 'rgba(0, 0, 0, 0.1)'
        }
    },
    fonts: {
        ...darkTheme.fonts
    },
    shadows: {
        small: '0 2px 4px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
        large: '0 8px 16px rgba(0, 0, 0, 0.2)',
        text: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    transitions: darkTheme.transitions,
    breakpoints: darkTheme.breakpoints,
    spacing: darkTheme.spacing
};

export type ThemeMode = 'light' | 'dark';
export const themes = {
    light: lightTheme,
    dark: darkTheme
};

export const theme = darkTheme;
