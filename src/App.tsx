import React, {useState} from 'react';
import {HashRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import GlobalStyles from './styles/GlobalStyles';
import PresentationLayout from './components/layout/PresentationLayout';
import WelcomePage from './pages/WelcomePage';
import { PresentationProvider } from './store/PresentationContext';
import { usePresentation } from './store/PresentationContext';
import { useTheme } from './store/ThemeContext';
import { useTranslation } from 'react-i18next';
import BasicSlide from './components/slides/BasicSlide';
import SketchfabViewer from './components/3d/SketchfabViewer';
import DataChart from './components/charts/DataChart';
import ModernViralPathway from './components/interactive/ModernViralPathway';
import {SectionType} from './types';
import ViralEntryImage from './assets/Viral-entry.png';
import HijackImage from './assets/Hijack.png';
import CascadeImage from './assets/Cascade.png';
import CytokinImage from './assets/Cytokin.jpg';
import NeurologicalImage from './assets/neurological.png';
import AntiviralImage from './assets/Antiviral.png';
import VaccinesImage from './assets/vaccines.webp';
import ClickableImage from './components/ui/ClickableImage';
import {motion} from 'framer-motion';

// Import i18n configuration
import './i18n/i18n';
import VirusVideo from './assets/COVID_Video_ACE_Binding.mp4';
import SarsCovVideo from './assets/Sars-cov.mp4';

// Debug: Check if video imports are working
console.log('VirusVideo path:', VirusVideo);
console.log('SarsCovVideo path:', SarsCovVideo);

// Cellular Remodeling Events Stepper Component
const CellularRemodelingEventsStepper: React.FC = () => {
    const {themeMode} = useTheme();
    const {t} = useTranslation();
    const [visibleEventsCount, setVisibleEventsCount] = useState(0);

    const events = [
        {
            title: t('slides.cell-3.events.erModifications.title'),
            description: t('slides.cell-3.events.erModifications.description'),
            icon: '🏭',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: t('slides.cell-3.events.dmvFormation.title'),
            description: t('slides.cell-3.events.dmvFormation.description'),
            icon: '🛡️',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: t('slides.cell-3.events.mitochondrialDysfunction.title'),
            description: t('slides.cell-3.events.mitochondrialDysfunction.description'),
            icon: '⚡',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            title: t('slides.cell-3.events.golgiFragmentation.title'),
            description: t('slides.cell-3.events.golgiFragmentation.description'),
            icon: '📦',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
    ];

    const handleNext = () => {
        setVisibleEventsCount((prev: number) => Math.min(prev + 1, events.length));
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center'}}>
            <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {t('slides.cell-3.content')}
            </p>

            <div style={{
                width: '100%',
                maxWidth: '900px'
            }}>
                <motion.h3
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    style={{
                        fontSize: '1.8rem',
                        marginBottom: '30px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    {t('slides.cell-3.stepperTitle')}
                </motion.h3>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '0 20px'
                }}>
                    {events.map((event, index) => (
                        <React.Fragment key={index}>
                            {index < visibleEventsCount && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.8
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: {duration: 0.2}
                                    }}
                                    style={{
                                        background: `${themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)'}`,
                                        border: `1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                        borderRadius: '16px',
                                        padding: '24px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        width: '100%',
                                        maxWidth: '600px'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: event.gradient
                                    }}/>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: event.gradient
                                        }}>
                                            {event.icon}
                                        </div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            background: event.gradient,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            {event.title}
                                        </h4>
                                    </div>

                                    <p style={{
                                        margin: 0,
                                        fontSize: '1rem',
                                        lineHeight: '1.6',
                                        opacity: 0.8
                                    }}>
                                        {event.description}
                                    </p>
                                </motion.div>
                            )}

                            {/* Arrow between events or after title */}
                            {((index === 0 && visibleEventsCount === 0) || (index < events.length - 1 && index === visibleEventsCount - 1)) && (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.5}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.5, delay: 0.3}}
                                    onClick={handleNext}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {/* Main button */}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                        }}
                                        whileTap={{scale: 0.95}}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid rgba(255, 255, 255, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {/* Animated arrow */}
                                        <motion.svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            animate={{
                                                y: [0, 3, 0]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <motion.path
                                                d="M6 9l6 6 6-6"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{pathLength: 0}}
                                                animate={{pathLength: 1}}
                                                transition={{duration: 0.8, delay: 0.5}}
                                            />
                                        </motion.svg>
                                    </motion.div>

                                    {/* Helper text */}
                                    <motion.span
                                        initial={{opacity: 0}}
                                        animate={{opacity: 0.7}}
                                        transition={{delay: 1}}
                                        style={{
                                            fontSize: '0.85rem',
                                            color: 'rgba(102, 126, 234, 0.8)',
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            marginTop: '4px'
                                        }}
                                    >
                                        {index === 0 && visibleEventsCount === 0 ? t('slides.cell-3.exploreButton') : t('slides.cell-3.nextButton')}
                                    </motion.span>
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main content renderer that maps slide IDs to components
const SlideContentRenderer: React.FC = () => {
    const { currentSlide } = usePresentation();
    const { themeMode } = useTheme();
    const { t } = useTranslation();

    if (!currentSlide) return null;

    // Debug log to see which slide is being rendered
    console.log('Rendering slide:', currentSlide.id, currentSlide.title);

    // Generate translated chart data
    const getTranslatedChartData = () => [
        {name: t('chartData.systems.respiratory'), value: 35, rate: 35, survival: 75},
        {name: t('chartData.systems.cardiovascular'), value: 25, rate: 25, survival: 80},
        {name: t('chartData.systems.neurological'), value: 15, rate: 15, survival: 85},
        {name: t('chartData.systems.gastrointestinal'), value: 12, rate: 12, survival: 90},
        {name: t('chartData.systems.renal'), value: 8, rate: 8, survival: 70}
    ];

    // Render different content based on slide ID
    const renderSlideContent = () => {
        switch (currentSlide.id) {
            case 'intro-1':
                return (
                    <BasicSlide title={t('slides.intro-1.title')} sectionId={SectionType.INTRODUCTION}
                                lottieAnimation={`${process.env.PUBLIC_URL}/assets/covid.json`}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.intro-1.content')}
                            </p>

                            <SketchfabViewer
                                modelId="0848e9c142984bef90145e0e04d03be5"
                                title={t('slides.intro-1.sketchfabTitle')}
                                height="500px"
                                width="100%"
                                autoStart={true}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'intro-2':
                return (
                    <BasicSlide
                        title={t('slides.intro-2.title')}
                        sectionId={SectionType.INTRODUCTION}
                        lottieAnimation={`${process.env.PUBLIC_URL}/assets/slide2.json`}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.intro-2.content')}
                            </p>

                            <div style={{
                                width: '100%',
                                maxWidth: '900px',
                                height: '500px'
                            }}>
                                <DataChart
                                    data={[
                                        {
                                            name: t('chartData.organs.colon'),
                                            [t('chartData.labels.ace2Expression')]: 7.8
                                        },
                                        {
                                            name: t('chartData.organs.gallbladder'),
                                            [t('chartData.labels.ace2Expression')]: 5.8
                                        },
                                        {
                                            name: t('chartData.organs.heartMuscle'),
                                            [t('chartData.labels.ace2Expression')]: 5.2
                                        },
                                        {
                                            name: t('chartData.organs.kidney'),
                                            [t('chartData.labels.ace2Expression')]: 5.0
                                        },
                                        {
                                            name: t('chartData.organs.epididymis'),
                                            [t('chartData.labels.ace2Expression')]: 4.8
                                        },
                                        {
                                            name: t('chartData.organs.breast'),
                                            [t('chartData.labels.ace2Expression')]: 2.3
                                        },
                                        {
                                            name: t('chartData.organs.ovary'),
                                            [t('chartData.labels.ace2Expression')]: 2.0
                                        },
                                        {name: t('chartData.organs.lung'), [t('chartData.labels.ace2Expression')]: 1.2},
                                        {
                                            name: t('chartData.organs.prostate'),
                                            [t('chartData.labels.ace2Expression')]: 1.0
                                        },
                                        {
                                            name: t('chartData.organs.esophagus'),
                                            [t('chartData.labels.ace2Expression')]: 0.8
                                        },
                                        {
                                            name: t('chartData.organs.tongue'),
                                            [t('chartData.labels.ace2Expression')]: 0.6
                                        },
                                        {
                                            name: t('chartData.organs.liver'),
                                            [t('chartData.labels.ace2Expression')]: 0.4
                                        },
                                        {
                                            name: t('chartData.organs.pancreas'),
                                            [t('chartData.labels.ace2Expression')]: 0.2
                                        },
                                        {
                                            name: t('chartData.organs.cerebellum'),
                                            [t('chartData.labels.ace2Expression')]: 0.1
                                        }
                                    ]}
                                    type="bar"
                                    title={t('slides.intro-2.chartTitle')}
                                    dataKeys={[t('chartData.labels.ace2Expression')]}
                                />
                            </div>
                        </div>
                    </BasicSlide>
                );

            case 'intro-3':
                return (
                    <BasicSlide
                        title={t('slides.intro-3.title')}
                        sectionId={SectionType.INTRODUCTION}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.intro-3.content')}
                            </p>

                            <SketchfabViewer
                                modelId="3ac32d486d724b5487508f60c406563c"
                                title={t('slides.intro-3.sketchfabTitle')}
                                height="500px"
                                width="100%"
                                autoStart={true}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'cell-1':
                return (
                    <BasicSlide title={t('slides.cell-1.title')} sectionId={SectionType.CELLULAR_BIOLOGY}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0'
                        }}>
                            <ClickableImage
                                src={ViralEntryImage}
                                alt={t('slides.cell-1.altText')}
                                title={t('slides.cell-1.imageTitle')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%'
                                }}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'cell-1-video':
                return (
                    <BasicSlide title={t('slides.cell-1.title')} sectionId={SectionType.CELLULAR_BIOLOGY}
                                fullWidth={true}>
                        <div style={{
                            width: '100%',
                            height: '70vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0 auto'
                        }}>
                            <video
                                controls
                                autoPlay
                                loop
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                    borderRadius: '8px'
                                }}
                            >
                                <source src={SarsCovVideo} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </BasicSlide>
                );

            case 'cell-2':
                return (
                    <BasicSlide title={t('slides.cell-2.title')} sectionId={SectionType.CELLULAR_BIOLOGY}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0'
                        }}>
                            <ClickableImage
                                src={HijackImage}
                                alt={t('slides.cell-2.altText')}
                                title={t('slides.cell-2.imageTitle')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%'
                                }}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'cell-3':
                return (
                    <BasicSlide title={t('slides.cell-3.title')} sectionId={SectionType.CELLULAR_BIOLOGY}>
                        <CellularRemodelingEventsStepper/>
                    </BasicSlide>
                );

            case 'cell-4':
                return (
                    <BasicSlide title={t('slides.cell-4.title')} sectionId={SectionType.CELLULAR_BIOLOGY}
                                fullWidth={true}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center'}}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.cell-4.content')}
                            </p>

                            <div style={{
                                width: '100%'
                            }}>
                                <ModernViralPathway
                                    title={t('slides.cell-4.pathwayTitle')}
                                    description={t('slides.cell-4.pathwayDescription')}
                                />
                            </div>
                        </div>
                    </BasicSlide>
                );

            case 'cell-5':
                return (
                    <BasicSlide title={t('slides.cell-5.title')} sectionId={SectionType.CELLULAR_BIOLOGY}
                                fullWidth={true}>
                        <div style={{
                            width: '100%',
                            height: '70vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0 auto'
                        }}>
                            <video
                                controls
                                autoPlay
                                loop
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                    borderRadius: '8px'
                                }}
                            >
                                <source src={VirusVideo} type="video/mp4"/>
                                {t('slides.cell-5.videoNotSupported')}
                            </video>
                        </div>
                    </BasicSlide>
                );

            case 'mol-1':
                return (
                    <BasicSlide title={t('slides.mol-1.title')} sectionId={SectionType.MOLECULAR_PATHWAYS}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.mol-1.content')}
                            </p>

                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0',
                                margin: '0'
                            }}>
                                <ClickableImage
                                    src={CascadeImage}
                                    alt={t('slides.mol-1.altText')}
                                    title={t('slides.mol-1.imageTitle')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </BasicSlide>
                );

            case 'mol-2':
                return (
                    <BasicSlide title={t('slides.mol-2.title')} sectionId={SectionType.MOLECULAR_PATHWAYS}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.mol-2.content')}
                            </p>

                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0',
                                margin: '0'
                            }}>
                                <ClickableImage
                                    src={CytokinImage}
                                    alt={t('slides.mol-2.altText')}
                                    title={t('slides.mol-2.imageTitle')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </BasicSlide>
                );

            case 'hall-1':
                return (
                    <BasicSlide title={t('slides.hall-1.title')} sectionId={SectionType.HALLMARKS}
                                lottieAnimation={`${process.env.PUBLIC_URL}/assets/lung.json`}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.hall-1.content')}
                            </p>

                            <SketchfabViewer
                                modelId="6eb72c6a02514f438acb0bc6e3f5fba8"
                                title={t('slides.hall-1.sketchfabTitle')}
                                height="500px"
                                width="100%"
                                autoStart={true}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'hall-2':
                return (
                    <BasicSlide title={t('slides.hall-2.title')} sectionId={SectionType.HALLMARKS}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.hall-2.content')}
                            </p>

                            <SketchfabViewer
                                modelId="168b474fba564f688048212e99b4159d"
                                title={t('slides.hall-2.sketchfabTitle')}
                                height="500px"
                                width="100%"
                                autoStart={true}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'hall-3':
                return (
                    <BasicSlide title={t('slides.hall-3.title')} sectionId={SectionType.HALLMARKS}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0'
                        }}>
                            <ClickableImage
                                src={NeurologicalImage}
                                alt={t('slides.hall-3.altText')}
                                title={t('slides.hall-3.imageTitle')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%'
                                }}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'treat-1':
                return (
                    <BasicSlide title={t('slides.treat-1.title')} sectionId={SectionType.TREATMENT}
                                lottieAnimation={`${process.env.PUBLIC_URL}/assets/pill.json`}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0'
                        }}>
                            <ClickableImage
                                src={AntiviralImage}
                                alt={t('slides.treat-1.altText')}
                                title={t('slides.treat-1.imageTitle')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%'
                                }}
                            />
                        </div>
                    </BasicSlide>
                );

            case 'treat-3':
                return (
                    <BasicSlide
                        title={t('slides.treat-3.title')}
                        sectionId={SectionType.TREATMENT}
                        lottieAnimation={`${process.env.PUBLIC_URL}/assets/vaccine.json`}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            maxWidth: '100%'
                        }}>
                            <p style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.6',
                                textAlign: 'center',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                {t('slides.treat-3.content')}
                            </p>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '0',
                                margin: '0'
                            }}>
                                <ClickableImage
                                    src={VaccinesImage}
                                    alt={t('slides.treat-3.altText')}
                                    title={t('slides.treat-3.imageTitle')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </BasicSlide>
                );

            case 'stats-1':
                return (
                    <BasicSlide title={t('slides.stats-1.title')} sectionId={SectionType.STATISTICS}>
                        <p>
                            {t('slides.stats-1.content')}
                        </p>
                        <DataChart
                            data={getTranslatedChartData()}
                            type="bar"
                            title={t('slides.stats-1.chartTitle')}
                            dataKeys={['value']}
                        />
                    </BasicSlide>
                );

            default:
                return (
                    <BasicSlide title={t(currentSlide.title)} sectionId={currentSlide.section}>
                        <p style={{
                            backgroundColor: `${themeMode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                            border: `1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                            color: 'inherit',
                            padding: '10px',
                            borderRadius: '5px'
                        }}>
                            {t('defaultSlide.underConstruction')} {t(currentSlide.title)} {t('defaultSlide.context')}
                        </p>
                    </BasicSlide>
                );
        }
    };

    return renderSlideContent();
};

// Presentation component wrapper
const PresentationApp: React.FC = () => {
    return (
        <PresentationProvider>
            <PresentationLayout>
                <SlideContentRenderer/>
            </PresentationLayout>
        </PresentationProvider>
    );
};

// Welcome page wrapper with navigation
const WelcomePageWrapper: React.FC = () => {
    const navigate = useNavigate();

    const handleStartPresentation = () => {
        navigate('/presentation');
    };

    return <WelcomePage onStartPresentation={handleStartPresentation} />;
};

function App() {
  return (
      <ThemeProvider>
          <LanguageProvider>
              <GlobalStyles/>
              <Router>
                  <Routes>
                      <Route path="/" element={<WelcomePageWrapper />} />
                      <Route path="/presentation" element={<PresentationApp />} />
                  </Routes>
              </Router>
          </LanguageProvider>
      </ThemeProvider>
  );
}

export default App;
