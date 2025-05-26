import {createGlobalStyle} from 'styled-components';
import {theme} from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.primary};
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* RTL specific styles */
  html[dir="rtl"], body[dir="rtl"] {
    font-family: ${props => props.theme.fonts.farsi};
  }

  #root {
    height: 100%;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: 500;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.2;
    transition: color 0.3s ease;
  }

  /* RTL specific styles for headers */
  [dir="rtl"] h1, 
  [dir="rtl"] h2, 
  [dir="rtl"] h3, 
  [dir="rtl"] h4, 
  [dir="rtl"] h5, 
  [dir="rtl"] h6 {
    font-family: ${props => props.theme.fonts.farsi};
  }

  h1 {
    font-size: 3rem;
    text-shadow: ${props => props.theme.shadows.text};
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1rem;
    color: ${props => props.theme.colors.text.primary};
    transition: color 0.3s ease;
  }

  /* RTL specific styles for paragraphs */
  [dir="rtl"] p {
    font-family: ${props => props.theme.fonts.farsi};
    line-height: 1.8; /* Slightly increased line height for better Farsi readability */
  }

  a {
    color: ${props => props.theme.colors.accent.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.default};
    
    &:hover {
      color: ${props => props.theme.colors.accent.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.primary};
    border: none;
    background-color: transparent;
    color: inherit;
    transition: ${props => props.theme.transitions.default};
    outline: none;
  }

  /* RTL specific styles for buttons */
  [dir="rtl"] button {
    font-family: ${props => props.theme.fonts.farsi};
  }

  ul, ol {
    margin-left: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text.primary};
  }

  /* RTL specific styles for lists */
  [dir="rtl"] ul, [dir="rtl"] ol {
    margin-left: 0;
    margin-right: ${props => props.theme.spacing.lg};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text.primary};
  }

  /* RTL specific styles for list items */
  [dir="rtl"] li {
    font-family: ${props => props.theme.fonts.farsi};
  }

  code {
    font-family: ${props => props.theme.fonts.mono};
    background-color: ${props => props.theme.colors.background.tertiary};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: 4px;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text.primary};
  }

  /* RTL doesn't change code font */

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.background.tertiary};
    border-radius: 4px;
    
    &:hover {
      background-color: ${theme.colors.accent.primary};
    }
  }

  /* Animation classes for LTR */
  [dir="ltr"] .fade-enter {
    opacity: 0;
  }

  [dir="ltr"] .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  [dir="ltr"] .fade-exit {
    opacity: 1;
  }

  [dir="ltr"] .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }

  [dir="ltr"] .slide-enter {
    transform: translateX(100%);
  }

  [dir="ltr"] .slide-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in;
  }

  [dir="ltr"] .slide-exit {
    transform: translateX(0);
  }

  [dir="ltr"] .slide-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-out;
  }

  /* Animation classes for RTL - reverse directions */
  [dir="rtl"] .fade-enter {
    opacity: 0;
  }

  [dir="rtl"] .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  [dir="rtl"] .fade-exit {
    opacity: 1;
  }

  [dir="rtl"] .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }

  [dir="rtl"] .slide-enter {
    transform: translateX(-100%);
  }

  [dir="rtl"] .slide-enter-active {
    transform: translateX(0);
    transition: transform 300ms ease-in;
  }

  [dir="rtl"] .slide-exit {
    transform: translateX(0);
  }

  [dir="rtl"] .slide-exit-active {
    transform: translateX(100%);
    transition: transform 300ms ease-out;
  }

  /* Transition for language switch */
  .lang-transition {
    transition: all 0.5s ease;
  }

  /* Performance optimizations for animations */
  .animated-element {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Mobile-specific optimizations */
  @media (max-width: 768px) and (orientation: portrait) {
    /* Reduce animation complexity on mobile */
    * {
      animation-duration: 0.3s !important;
      transition-duration: 0.3s !important;
    }
    
    /* Disable expensive filters on mobile */
    .blob {
      filter: blur(20px) !important;
      opacity: 0.3 !important;
    }
    
    /* Simplify particle effects */
    canvas {
      opacity: 0.2 !important;
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    /* Hide particle systems for users who prefer reduced motion */
    canvas,
    .particle-lines,
    .blob-container {
      display: none !important;
    }
  }

  /* GPU acceleration for better performance */
  .motion-safe {
    transform: translateZ(0);
    will-change: transform;
  }
`;

export default GlobalStyles;
