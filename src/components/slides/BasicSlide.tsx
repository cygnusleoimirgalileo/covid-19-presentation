import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {SectionType} from '../../types';
import {theme} from '../../styles/theme';
import {useLanguage} from '../../store/LanguageContext';
import LottiePlayer from '../animations/LottiePlayer';

interface BasicSlideProps {
    title: string;
    sectionId: SectionType;
    children: ReactNode;
    lottieAnimation?: string; // Path to Lottie JSON file
    fullWidth?: boolean; // Allow full width layout
}

const SlideContainer = styled.div<{ hasLottie?: boolean; $fullWidth?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.xl};
    max-width: ${props => props.$fullWidth ? 'none' : '1200px'};
  margin: 0 auto;
  
  p {
    color: ${props => props.theme.colors.text.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
      padding: ${props => props.theme.spacing.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.sm};
      /* Reverted to original simpler padding calculation to avoid overlap with top controls */
      padding-top: calc(${props => props.theme.spacing.xl} + 40px);
    
    p {
      font-size: 0.9rem;
    }
  }

  /* RTL specific styles */
  [dir="rtl"] & {
    p, h1, h2, h3, h4, h5, h6, span {
      font-family: ${props => props.theme.fonts.farsi};
    }
  }
`;

const SlideHeader = styled.div<{ color: string }>`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.color};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing.sm};
      /* Ensure header content doesn't overlap with top controls */
      margin-top: ${props => props.theme.spacing.sm};
  }
`;

const SlideTitleContainer = styled.div<{ isRtl: boolean }>`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};

    /* Updated: Both RTL and LTR now use row-reverse to put Lottie on the right */
    flex-direction: row-reverse;

    /* Text alignment based on direction - keep language-appropriate alignment */
    text-align: ${props => props.isRtl ? 'right' : 'left'};

    /* Keep elements together, don't stretch across full width */
    justify-content: flex-start;

    /* Limit container width to prevent overlap with top buttons */
    max-width: calc(100% - 200px); /* Reserve space for top control buttons */

    /* Ensure proper width but not full width */
    width: fit-content;
    min-width: 60%; /* Ensure reasonable minimum width */

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        gap: ${props => props.theme.spacing.sm};
        max-width: calc(100% - 150px); /* Less reserved space on tablets */
        min-width: 70%;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        /* Keep horizontal layout with Lottie on right for both languages */
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-start; /* Keep elements together on mobile too */
        gap: ${props => props.theme.spacing.sm};
        width: 100%;
        max-width: calc(100% - 40px); /* Reduced reserved space for mobile menu button */
        min-width: auto;

        /* Explicit direction and text-align for the content within this container */
        direction: ${props => props.isRtl ? 'rtl' : 'ltr'};
        text-align: ${props => props.isRtl ? 'right' : 'left'};

        /* Ensure proper text flow */
        * {
            direction: ${props => props.isRtl ? 'rtl' : 'ltr'};
            text-align: ${props => props.isRtl ? 'right' : 'left'};
        }
    }

    /* Very small screens - maintain RTL behavior */
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
        flex-direction: row-reverse;
        gap: ${props => props.theme.spacing.xs};
        align-items: center;
        justify-content: flex-start;
        max-width: calc(100% - 30px); /* Further reduced reserved space on very small screens */
    }
`;

const SlideTitle = styled(motion.h2)<{ color: string }>`
    font-size: 2.0rem; /* Reduced from 2.5rem */
    /* Apply section color to the entire title */
    color: ${props => props.color};
  margin-bottom: ${props => props.theme.spacing.xs};
  position: relative;
  z-index: 5;
  flex: 1; /* Take remaining space */

    direction: inherit;
    text-align: inherit;
    
    [dir="rtl"] & {
        text-align: right;
        direction: rtl;
    }
    
    [dir="ltr"] & {
        text-align: left;
        direction: ltr;
    }

    /* Span styling is now harmonized as parent h2 has the section color */
    span {
        /* No specific color needed here anymore, inherits from h2 */
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
      font-size: 1.8rem; /* Reduced from 2.1rem */
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.4rem; /* Reduced from 1.7rem */
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.0rem; /* Reduced from 1.2rem */
      margin-bottom: ${props => props.theme.spacing.xs};
      line-height: 1.3; /* Slightly increased line height for better spacing */
      white-space: nowrap; /* Prevent line breaks for shorter titles */
      overflow: hidden;
      text-overflow: ellipsis; /* Add ellipsis for very long titles */

      [dir="rtl"] & {
          text-align: right;
          direction: rtl;
      }
      
      [dir="ltr"] & {
          text-align: left;
          direction: ltr;
      }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
      font-size: 0.9rem; /* Reduced from 1.1rem */
      line-height: 1.2;
      white-space: normal; /* Allow wrapping on very small screens if needed */
  }
`;

const SlideContent = styled.div<{ $fullWidth?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;

  /* Hide scrollbar but allow scrolling */
  &::-webkit-scrollbar {
      display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row; /* Arrange children in a row for desktop */
    gap: ${props => props.theme.spacing.lg}; /* Add space between columns */
    
    > * {
      flex: 1; /* Each child (column) takes equal space */
        max-width: ${props => props.$fullWidth ? '100%' : '50%'}; /* Adjust based on fullWidth */
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
      justify-content: flex-start;
  }

  /* For mixed language content support */
  .en {
    font-family: ${props => props.theme.fonts.primary};
    direction: ltr;
    display: inline-block;
  }

  .fa {
    font-family: ${props => props.theme.fonts.farsi};
    direction: rtl;
    display: inline-block;
  }
`;

const LottieContainer = styled.div`
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    z-index: 1; /* Low but positive z-index to stay visible but behind mobile menu */
    position: relative;

    /* Ensure proper spacing and alignment */
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 70px;
        height: 70px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 60px;
        height: 60px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 45px;
        height: 45px;

        /* Ensure proper RTL positioning */
        [dir="rtl"] & {
            margin-left: ${props => props.theme.spacing.sm};
            margin-right: 0;
        }

        [dir="ltr"] & {
            margin-right: ${props => props.theme.spacing.sm};
            margin-left: 0;
        }
    }

    /* Extra small screens - make even smaller */
    @media (max-width: ${props => props.theme.breakpoints.xs}) {
        width: 35px;
        height: 35px;

        /* Tighter spacing on very small screens */
        [dir="rtl"] & {
            margin-left: ${props => props.theme.spacing.xs};
            margin-right: 0;
        }

        [dir="ltr"] & {
            margin-right: ${props => props.theme.spacing.xs};
            margin-left: 0;
        }
    }
`;

const BasicSlide: React.FC<BasicSlideProps> = ({title, sectionId, children, lottieAnimation, fullWidth = false}) => {
    const sectionColor = theme.colors.section[sectionId];
    const {isRtl} = useLanguage();

    // Animation variants
    const titleAnimation = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2
            }
        }
    };

    // For RTL, don't split the title to highlight first word (not applicable to Farsi)
    const renderTitle = () => {
        if (isRtl) {
            return <span>{title}</span>;
        } else {
            const words = title.split(' ');
            return (
                <>
                    <span>{words[0]}</span> {words.slice(1).join(' ')}
                </>
            );
        }
    };

    return (
        <SlideContainer $fullWidth={fullWidth}>
            <SlideHeader color={sectionColor}>
                <SlideTitleContainer isRtl={isRtl}>
                    {lottieAnimation && (
                        <LottieContainer>
                            <LottiePlayer src={lottieAnimation} width="100%" height="100%"/>
                        </LottieContainer>
                    )}
                    <SlideTitle
                        color={sectionColor}
                        initial="hidden"
                        animate="visible"
                        variants={titleAnimation}
                    >
                        {renderTitle()}
                    </SlideTitle>
                </SlideTitleContainer>
            </SlideHeader>
            <SlideContent $fullWidth={fullWidth}>
                {children}
            </SlideContent>
        </SlideContainer>
    );
};

export default BasicSlide;
