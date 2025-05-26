import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import BasicSlide from './BasicSlide';
import {SectionType} from '../../types';
import MolecularModel from '../3d/MolecularModel';
import {useTranslation} from 'react-i18next';

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  height: 100%;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const DescriptionText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const HighlightBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.1), rgba(94, 53, 177, 0.05));
  border-left: 4px solid ${props => props.theme.colors.section.introduction};
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const KeyPoints = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    position: relative;
    padding-left: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text.primary};
    
    &:before {
      content: '•';
      color: ${props => props.theme.colors.section.introduction};
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const ModelContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 400px;
  }
`;

const TechnicalInfo = styled(motion.div)`
  background: rgba(0, 0, 0, 0.05);
  padding: ${props => props.theme.spacing.sm};
  border-radius: 8px;
  margin-top: ${props => props.theme.spacing.sm};
  
  h4 {
    color: ${props => props.theme.colors.section.introduction};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: 0.9rem;
  }
  
  p {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.text.secondary};
    margin: 0;
  }
`;

const IntroSlide1: React.FC = () => {
    const {t} = useTranslation();

    const mockModel = {
        id: 'sars-cov-2-virion',
        name: 'SARS-CoV-2 Virion',
        pdbId: '6VXX',
        description: 'Complete SARS-CoV-2 virion structure',
        modelPath: '/models/sars-cov-2-virion.pdb',
        type: 'protein' as const
    };

    const fadeInUp = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, delay: 0.2}
        }
    };

    const staggerChildren = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    return (
        <BasicSlide
            title={t('slides.intro-1.title')}
            sectionId={SectionType.INTRODUCTION}
        >
            <ContentGrid>
                <TextContent>
                    <DescriptionText
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {t('slides.intro-1.content')}
                    </DescriptionText>

                    <HighlightBox
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>Key Viral Components:</h3>
                        <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                            <KeyPoints>
                                <motion.li variants={fadeInUp}>
                                    <strong>Spike Protein (S):</strong> Receptor binding and membrane fusion
                                </motion.li>
                                <motion.li variants={fadeInUp}>
                                    <strong>Nucleocapsid (N):</strong> RNA packaging and genome organization
                                </motion.li>
                                <motion.li variants={fadeInUp}>
                                    <strong>Envelope (E):</strong> Ion channel and viral assembly
                                </motion.li>
                                <motion.li variants={fadeInUp}>
                                    <strong>Membrane (M):</strong> Virion architecture and budding
                                </motion.li>
                            </KeyPoints>
                        </motion.div>
                    </HighlightBox>

                    <TechnicalInfo
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h4>Molecular Specifications</h4>
                        <p>
                            <strong>Genome:</strong> ~30kb single-stranded RNA<br/>
                            <strong>Virion Size:</strong> 80-120 nm diameter<br/>
                            <strong>Proteins:</strong> 16 non-structural, 4 structural
                        </p>
                    </TechnicalInfo>
                </TextContent>

                <ModelContainer>
                    <MolecularModel
                        model={mockModel}
                        isInteractive={true}
                        rotationSpeed={0.3}
                    />
                    <TechnicalInfo
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h4>3D Model Information</h4>
                        <p>
                            <strong>PDB IDs:</strong> {t('slides.intro-1.pdbIds')}<br/>
                            <strong>Visualization:</strong> {t('slides.intro-1.visualDescription')}
                        </p>
                    </TechnicalInfo>
                </ModelContainer>
            </ContentGrid>
        </BasicSlide>
    );
};

export default IntroSlide1;
