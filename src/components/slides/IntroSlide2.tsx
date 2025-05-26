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

const TissueDistribution = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TissueItem = styled(motion.div)`
  background: rgba(94, 53, 177, 0.1);
  padding: ${props => props.theme.spacing.sm};
  border-radius: 8px;
  text-align: center;
  
  h4 {
    color: ${props => props.theme.colors.section.introduction};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: 0.9rem;
  }
  
  p {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text.secondary};
    margin: 0;
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

const FunctionBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 151, 167, 0.1), rgba(0, 151, 167, 0.05));
  border-left: 4px solid #0097A7;
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  margin: ${props => props.theme.spacing.sm} 0;
  
  h3 {
    color: #0097A7;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const IntroSlide2: React.FC = () => {
    const {t} = useTranslation();

    const mockModel = {
        id: 'ace2-receptor',
        name: 'ACE2 Receptor',
        pdbId: '6M0J',
        description: 'ACE2 receptor structure embedded in membrane',
        modelPath: '/models/ace2-receptor.pdb',
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
            title={t('slides.intro-2.title')}
            sectionId={SectionType.INTRODUCTION}
        >
            <ContentGrid>
                <TextContent>
                    <DescriptionText
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {t('slides.intro-2.content')}
                    </DescriptionText>

                    <FunctionBox
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>Normal ACE2 Functions:</h3>
                        <ul>
                            <li>Converts Angiotensin II → Angiotensin 1-7</li>
                            <li>Regulates blood pressure and cardiovascular function</li>
                            <li>Maintains electrolyte balance</li>
                            <li>Anti-inflammatory and anti-fibrotic effects</li>
                        </ul>
                    </FunctionBox>

                    <HighlightBox
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>ACE2 Tissue Distribution:</h3>
                        <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                            <TissueDistribution>
                                <TissueItem variants={fadeInUp}>
                                    <h4>Lungs</h4>
                                    <p>High expression in alveolar epithelial cells</p>
                                </TissueItem>
                                <TissueItem variants={fadeInUp}>
                                    <h4>Heart</h4>
                                    <p>Cardiac myocytes and endothelial cells</p>
                                </TissueItem>
                                <TissueItem variants={fadeInUp}>
                                    <h4>Kidneys</h4>
                                    <p>Tubular epithelial cells</p>
                                </TissueItem>
                                <TissueItem variants={fadeInUp}>
                                    <h4>GI Tract</h4>
                                    <p>Intestinal epithelial cells</p>
                                </TissueItem>
                            </TissueDistribution>
                        </motion.div>
                    </HighlightBox>

                    <TechnicalInfo
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h4>Molecular Details</h4>
                        <p>
                            <strong>Protein:</strong> 805 amino acids, membrane-bound<br/>
                            <strong>Domains:</strong> Extracellular peptidase domain<br/>
                            <strong>Function:</strong> Zinc metalloprotease (EC 3.4.17.23)
                        </p>
                    </TechnicalInfo>
                </TextContent>

                <ModelContainer>
                    <MolecularModel
                        model={mockModel}
                        isInteractive={true}
                        rotationSpeed={0.2}
                    />
                    <TechnicalInfo
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h4>3D Model Information</h4>
                        <p>
                            <strong>PDB IDs:</strong> {t('slides.intro-2.pdbIds')}<br/>
                            <strong>Visualization:</strong> {t('slides.intro-2.visualDescription')}
                        </p>
                    </TechnicalInfo>
                </ModelContainer>
            </ContentGrid>
        </BasicSlide>
    );
};

export default IntroSlide2;
