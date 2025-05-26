import React from 'react';
import styled from 'styled-components';

interface SketchfabEmbedProps {
    modelId: string;
    title?: string;
    height?: string;
}

const EmbedContainer = styled.div<{ height: string }>`
  width: 100%;
  height: ${props => props.height};
  margin: 2rem auto;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
  
  p {
    font-size: 13px;
    font-weight: normal;
    margin: 5px;
    color: #4A4A4A;
    text-align: center;
  }
  
  a {
    font-weight: bold;
    color: #1CAAD9;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    height: calc(${props => props.height} * 0.9);
  }
  
  @media (max-width: 480px) {
    height: calc(${props => props.height} * 0.8);
  }
`;

const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({
                                                           modelId,
                                                           title = 'Sketchfab 3D Model',
                                                           height = '400px'
                                                       }) => {
    // Generate the HTML string for the embed code
    const generateEmbedHTML = () => {
        return `
      <div class="sketchfab-embed-wrapper">
        <iframe title="${title}" frameborder="0" allowfullscreen mozallowfullscreen="true" 
          webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered 
          web-share src="https://sketchfab.com/models/${modelId}/embed">
        </iframe>
        <p>
          <a href="https://sketchfab.com/3d-models/${modelId}?utm_medium=embed&utm_campaign=share-popup&utm_content=${modelId}" 
            target="_blank" rel="nofollow noopener noreferrer">${title}</a>
          on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=${modelId}" 
            target="_blank" rel="nofollow noopener noreferrer">Sketchfab</a>
        </p>
      </div>
    `;
    };

    return (
        <EmbedContainer height={height} dangerouslySetInnerHTML={{__html: generateEmbedHTML()}}/>
    );
};

export default SketchfabEmbed;