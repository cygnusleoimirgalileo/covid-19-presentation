# COVID-19 Viral Mechanisms Interactive Presentation

An interactive web-based presentation on SARS-CoV-2 viral mechanisms and ACE2 receptor interactions built using React,
Three.js, and modern web technologies.

## Features

- **Welcome Page** - Modern, animated landing page with presentation overview
- **Dynamic Slide System** - Smooth transitions between slides and sections
- **Interactive 3D Molecular Models** - Using Three.js to visualize viral protein structures
- **Animated Cell Comparisons** - Visual representation of healthy vs infected cells
- **Interactive Pathway Diagrams** - Click-to-explore viral entry mechanisms
- **Data Visualization** - Charts and graphs for COVID-19 statistics and molecular data
- **Multi-language Support** - Available in English and Persian (Farsi)
- **Theme System** - Light and dark mode support
- **Navigation System** - Sidebar outline, progress tracking, and keyboard controls
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Application Structure

### Routes

- **/** - Welcome/Landing page with presentation overview
- **/presentation** - Main presentation with slides and navigation

### Welcome Page Features

- Animated Lottie background with viral/molecular biology theme
- Presentation overview and feature highlights
- Presenter and supervisor information
- Smooth animations and transitions
- Theme and language switchers
- Modern, responsive design

## Content Sections

1. **Introduction** - SARS-CoV-2 as a molecular machine and ACE2 receptor gateway
2. **Cellular Biology** - Viral entry mechanisms, cellular hijacking, organelle remodeling, and viral assembly
3. **Molecular Pathways** - ACE2-angiotensin disruption, inflammatory cascades, coagulation activation, and immune
   evasion
4. **Clinical Manifestations** - Multi-organ system involvement and molecular damage patterns
5. **Treatment Approaches** - Antiviral drugs, monoclonal antibodies, vaccines, and host-directed therapies
6. **Statistics & Data** - Epidemiological data, ACE2 expression correlations, and treatment efficacy
7. **Future Directions** - Variant evolution, next-generation vaccines, and pandemic preparedness

## Technologies Used

- React 19 with TypeScript
- React Router DOM for navigation
- Styled-Components for styling
- Three.js and React Three Fiber for 3D visualizations
- Framer Motion for animations
- GSAP for advanced animations
- Lottie animations (@lottiefiles/react-lottie-player)
- Recharts for data visualization
- i18next for internationalization

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository

```
git clone <repository-url>
cd cancer-biochemistry-presentation
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm start
```

The application should now be running at `http://localhost:3000`

## Usage

- Use **arrow keys** to navigate between slides
- Press **spacebar** to advance to the next slide
- Press **F** to toggle presentation mode
- Click on **interactive elements** to reveal more information

## Project Structure

```
src/
  ├── components/         # Reusable UI components
  │    ├── 3d/           # Three.js components
  │    ├── animations/    # Animated components
  │    ├── charts/        # Data visualization 
  │    ├── interactive/   # Interactive elements
  │    ├── layout/        # Layout components
  │    ├── navigation/    # Navigation controls
  │    └── slides/        # Slide templates
  ├── pages/              # Page components
  │    └── slides/        # Individual slide content
  ├── store/              # State management
  ├── styles/             # Global styles and theme
  ├── types/              # TypeScript type definitions
  └── utils/              # Utility functions and data
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SARS-CoV-2 and ACE2 receptor research references
- The React and Three.js communities for their excellent tools
- [Add any other relevant acknowledgments]

<!-- Updated for Cloudflare Pages deployment fix -->
<!-- GitHub Actions deployment configured -->

