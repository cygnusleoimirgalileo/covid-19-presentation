import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'fa';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextProps {
  language: Language;
  direction: Direction;
  switchLanguage: (lang: Language) => void;
  isRtl: boolean;
}

const initialState: LanguageContextProps = {
  language: 'en',
  direction: 'ltr',
  switchLanguage: () => {},
  isRtl: false,
};

const LanguageContext = createContext<LanguageContextProps>(initialState);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'en'
  );
  const [direction, setDirection] = useState<Direction>(
    language === 'fa' ? 'rtl' : 'ltr'
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial language and direction from localStorage or default
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
      setDirection(savedLanguage === 'fa' ? 'rtl' : 'ltr');
    }
  }, [i18n]);

  useEffect(() => {
    // Apply direction to document
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Add a class to the body for additional styling when needed
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [direction, language]);

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setDirection(lang === 'fa' ? 'rtl' : 'ltr');
  }, [i18n]);

  const value = {
    language,
    direction,
    switchLanguage,
    isRtl: direction === 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};