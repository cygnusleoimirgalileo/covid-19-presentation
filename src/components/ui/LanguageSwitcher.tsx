import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage, Language } from '../../store/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcherContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LanguageToggle = styled(motion.button)`
  background-color: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.background.tertiary};
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover {
    background-color: ${props => props.theme.colors.background.tertiary};
  }

  svg {
    margin-right: ${props => props.theme.spacing.xs};
  }

  [dir="rtl"] & {
    svg {
      margin-right: 0;
      margin-left: ${props => props.theme.spacing.xs};
    }
  }
`;

const LanguageOptions = styled(motion.div)`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.xs};
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 100;
  min-width: 120px;
  overflow: hidden;

  [dir="rtl"] & {
    right: auto;
    left: 0;
  }
`;

const LanguageOption = styled(motion.button)<{ isActive: boolean; isFarsi?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  border: none;
  background-color: ${props => props.isActive ? props.theme.colors.background.tertiary : 'transparent'};
  color: ${props => props.theme.colors.text.primary};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.isActive ? '600' : '400'};
  text-align: left;
  transition: background-color 0.2s;
  font-family: ${props => props.isFarsi ? props.theme.fonts.farsi : props.theme.fonts.primary};

  &:hover {
    background-color: ${props => props.theme.colors.background.tertiary};
  }

  [dir="rtl"] & {
    text-align: right;
  }

  & + & {
    margin-top: ${props => props.theme.spacing.xs};
  }
`;

const LanguageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, switchLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    switchLanguage(lang);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'فارسی' },
  ];

  return (
    <LanguageSwitcherContainer className={className}>
      <LanguageToggle 
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
      >
        <LanguageIcon />
        {language === 'en' ? 'EN' : 'FA'}
      </LanguageToggle>

      <AnimatePresence>
        {isOpen && (
          <LanguageOptions 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <LanguageOption
                key={lang.code}
                isActive={language === lang.code}
                onClick={() => handleLanguageChange(lang.code as Language)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                isFarsi={lang.code === 'fa'}
              >
                {lang.name}
              </LanguageOption>
            ))}
          </LanguageOptions>
        )}
      </AnimatePresence>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher;
