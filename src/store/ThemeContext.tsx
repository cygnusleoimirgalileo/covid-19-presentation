import React, {createContext, useContext, useState, useEffect} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {themes, ThemeMode} from '../styles/theme';

interface ThemeContextProps {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Get initial theme from local storage or default to dark
const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    // Check for system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return 'dark'; // Default theme
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); // Initial value before effect runs

    // Set the theme from localStorage or system preferences once mounted
    useEffect(() => {
        setThemeMode(getInitialTheme());
    }, []);

    // Save theme to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const value = {
        themeMode,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            <StyledThemeProvider theme={themes[themeMode]}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};