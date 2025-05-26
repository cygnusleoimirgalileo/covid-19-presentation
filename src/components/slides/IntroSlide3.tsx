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

const InteractionBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.1), rgba(94, 53, 177, 0.05));
  border-left: 4px solid ${props => props.theme.colors.section.introduction};
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const BindingForces = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ForceType = styled(motion.div)`
  background: rgba(67, 160, 71, 0.1);
  padding: ${props => props.theme.spacing.sm};
  border-radius: 8px;
  border-left: 3px solid #43A047;
  
  h4 {
    color: #43A047;
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: 0.9rem;
  }
  
  p {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.text.primary};
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

const KeyResidues = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05));
  border-left: 4px solid #FF9800;
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  margin: ${props => props.theme.spacing.sm} 0;
  
  h3 {
    color: #FF9800;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  .residue-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.xs};
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      grid-template-columns: 1fr;
    }
  }
  
  .residue-item {
    font-size: 0.85rem;
    padding: ${props => props.theme.spacing.xs};
    background: rgba(255, 152, 0, 0.1);
    border-radius: 4px;
  }
`;

const BindingAffinity = styled(motion.div)`
  text-align: center;
  background: linear-gradient(135deg, rgba(211, 47, 47, 0.1), rgba(211, 47, 47, 0.05));
  border: 2px solid #D32F2F;
  padding: ${props => props.theme.spacing.md};
  border-radius: 12px;
  margin: ${props => props.theme.spacing.md} 0;
  
  h3 {
    color: #D32F2F;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  .kd-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #D32F2F;
  }
  
  .kd-label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const IntroSlide3: React.FC = () => {
    const {t} = useTranslation();

    const mockModel = {
        id: 'spike-ace2-complex',
        name: 'Spike-ACE2 Complex',
        pdbId: '6M0J',
        description: 'SARS-CoV-2 Spike RBD bound to ACE2 receptor',
        modelPath: '/models/spike-ace2-complex.pdb',
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
            title={t('slides.intro-3.title')}
            sectionId={SectionType.INTRODUCTION}
        >
            <ContentGrid>
                <TextContent>
                    <DescriptionText
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {t('slides.intro-3.content')}
                    </DescriptionText>

                    <BindingAffinity
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>Binding Affinity</h3>
                        <div className="kd-value">Kd ≈ 14.7 nM</div>
                        <div className="kd-label">High-affinity interaction</div>
                    </BindingAffinity>

                    <InteractionBox
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>Molecular Interactions:</h3>
                        <motion.div variants={staggerChildren} initial="hidden" animate="visible">
                            <BindingForces>
                                <ForceType variants={fadeInUp}>
                                    <h4>Hydrogen Bonds</h4>
                                    <p>14 direct hydrogen bonds between RBD and ACE2</p>
                                </ForceType>
                                <ForceType variants={fadeInUp}>
                                    <h4>Salt Bridges</h4>
                                    <p>Electrostatic interactions (K417-D30, K453-H34)</p>
                                </ForceType>
                                <ForceType variants={fadeInUp}>
                                    <h4>Hydrophobic Contacts</h4>
                                    <p>Van der Waals forces and hydrophobic patches</p>
                                </ForceType>
                                <ForceType variants={fadeInUp}>
                                    <h4>Shape Complementarity</h4>
                                    <p>Geometric fit between binding surfaces</p>
                                </ForceType>
                            </BindingForces>
                        </motion.div>
                    </InteractionBox>

                    <KeyResidues
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h3>Key Binding Residues:</h3>
                        <div className="residue-list">
                            <div className="residue-item"><strong>RBD:</strong> K417, Y449, Y453, L455, F456, A475,
                                F486, N487, Y489, Q493, G496, Q498, T500, N501, G502, Y505
                            </div>
                            <div className="residue-item"><strong>ACE2:</strong> Q24, T27, F28, D30, K31, H34, E35, E37,
                                D38, Y41, Q42, L45, L79, M82, Y83, N90, Q325, E329, N330, K353, R357
                            </div>
                        </div>
                    </KeyResidues>
                </TextContent>

                <ModelContainer>
                    <MolecularModel
                        model={mockModel}
                        isInteractive={true}
                        rotationSpeed={0.15}
                    />
                    <TechnicalInfo
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h4>3D Model Information</h4>
                        <p>
                            <strong>PDB IDs:</strong> {t('slides.intro-3.pdbIds')}<br/>
                            <strong>Visualization:</strong> {t('slides.intro-3.visualDescription')}
                        </p>
                    </TechnicalInfo>
                </ModelContainer>
            </ContentGrid>
        </BasicSlide>
    );
};

export default IntroSlide3;
