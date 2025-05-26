import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useTheme} from '../../store/ThemeContext';

const SwitchContainer = styled.button`
  width: 64px;
  height: 32px;
  background-color: ${props => props.theme.colors.background.tertiary};
  border: none;
  border-radius: 16px;
  padding: 2px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: ${props => props.theme.transitions.default};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.accent.primary};
  }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 56px;
        height: 28px;
        border-radius: 14px;
    }
`;

const SwitchHandle = styled(motion.div)`
  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 1;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 24px;
        height: 24px;
    }
`;

const SunIcon = styled.div`
  color: #FFC107;
  font-size: 16px;
  position: absolute;
  right: 10px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        font-size: 14px;
        right: 8px;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

const MoonIcon = styled.div`
  color: #5C6BC0;
  font-size: 16px;
  position: absolute;
  left: 10px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        font-size: 14px;
        left: 8px;

        svg {
            width: 14px;
            height: 14px;
        }
    }
`;

const ThemeSwitcher: React.FC = () => {
    const {themeMode, toggleTheme} = useTheme();

    return (
        <SwitchContainer onClick={toggleTheme} aria-label="Toggle theme">
            <MoonIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </MoonIcon>
            <SunIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            </SunIcon>
            <SwitchHandle
                animate={{
                    x: themeMode === 'dark' ? 0 : 32,
                    backgroundColor: themeMode === 'dark' ? '#5C6BC0' : '#FFC107'
                }}
                transition={{type: "spring", stiffness: 700, damping: 30}}
            />
        </SwitchContainer>
    );
};

export default ThemeSwitcher;
