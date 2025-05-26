# Portfolio Website

A modern, responsive portfolio website for a Frontend Developer & UI Designer, featuring a multi-section layout with
animations, dark/light theme support, and multilingual capabilities.

## Features

- Responsive design for all screen sizes
- Dark/light theme toggle with smooth transitions
- Multi-language support (English and Persian)
- Modern animations and transitions
- Interactive portfolio gallery with lightbox
- Skills showcase section with animated icons
- Design process timeline
- Testimonial slider
- Modular CSS and JavaScript architecture

## File Structure

```
portfolio-website/
├── css/                  # CSS files
│   ├── main.css          # Main CSS file importing all others
│   ├── variables.css     # CSS variables and custom properties
│   ├── layout.css        # Overall layout structure
│   ├── header.css        # Header styles
│   └── ...               # Other CSS modules
├── js/                   # JavaScript files
│   ├── main.js           # Main JavaScript functionality
│   ├── portfolio.js      # Portfolio functionality
│   ├── language.js       # Language switching
│   └── ...               # Other JS modules
├── images/               # Image assets
│   ├── hero/             # Hero section images
│   ├── portfolio/        # Portfolio project images
│   └── icons/            # Skill and UI icons
├── fonts/                # Custom fonts (if any)
└── index.html            # Main HTML file
```

## Development

For detailed information on the CSS organization, refer to [CSS Structure](css/readme.md).

## Browser Support

This site is optimized for modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- CSS is modularized and prioritized (critical CSS first)
- Images use WebP format for better compression
- JavaScript is deferred to avoid blocking page rendering
- Intersection Observer API for lazy loading animations

# Hero Section Background Effects Guide

This guide explains how to implement the animated blob background effects seen in the hero section
of this portfolio website.

The effect is achieved using HTML and CSS, primarily through the use of:

- Absolutely positioned `div` elements.
- `border-radius` for shaping (circular or organic blob shapes).
- `filter: blur()` for the soft, glowing effect.
- RGBA background colors for transparency and color blending.
- CSS animations (`@keyframes`) for dynamic movement, scaling, and morphing.

## 1. HTML Structure

First, you need a container for your background elements within your hero section. Then, add
individual `div` elements for each blob, pattern, or outline you want.

```html

<section class="hero">
    <!-- Other hero content (text, images, CTAs) will go here -->

    <div class="blob-container">
        <!-- Filled, Blurred Blobs (Shiny Lights) -->
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="blob blob-4"></div>

        <!-- Optional: Additional decorative elements -->
        <div class="dot-pattern"></div>
        <div class="circle-outline"></div>

        <!-- Optional: Animated Outlined Blobs -->
        <div class="blob-outline blob-outline-1"></div>
        <div class="blob-outline blob-outline-2"></div>
    </div>

    <!-- ... rest of the hero content -->
</section>
```

## 2. CSS Styling

### 2.1. Hero Section and Blob Container

```css
.hero {
    position: relative; /* Or fixed, depending on desired scroll behavior */
    overflow: hidden;
    height: 100vh; /* Or any desired height */
    /* Add other hero styles like display, padding, etc. */
}

.blob-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* Place behind other hero content */
    overflow: hidden; /* Clip overflowing parts of blobs */
}
```

### 2.2. Styling the Blobs (Shiny Lights)

Each blob will have common styles and specific styles for its appearance and animation.

```css
.blob {
    position: absolute;
    border-radius: 50%; /* Makes them circular */
    opacity: 0.7; /* Adjust for desired transparency */
    /* filter: blur(VALUE); is critical - applied per blob for variance */
}

/* Example for one blob: */
.blob-1 {
    width: 500px;  /* Adjust size */
    height: 500px; /* Adjust size */
    background-color: rgba(108, 99, 255, 0.35); /* Base color and alpha */
    top: -250px;   /* Position it (can be partially off-screen) */
    left: -100px;  /* Position it */
    filter: blur(40px); /* THE KEY BLUR EFFECT */
    animation: blob-move-1 25s infinite alternate ease-in-out;
}

/* Add similar styles for .blob-2, .blob-3, .blob-4, varying:
   - width, height
   - background-color
   - top, left, right, bottom positioning
   - filter: blur() amount
   - animation-name and duration/timing
*/
```

### 2.3. Styling Optional Decorative Elements

**Dot Pattern:**

```css
.dot-pattern {
    position: absolute;
    width: 300px; /* Adjust size */
    height: 300px;/* Adjust size */
    top: 10%;     /* Adjust position */
    right: 5%;    /* Adjust position */
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 15px 15px; /* Adjust dot size and spacing */
    opacity: 0.5;
}
```

**Circle Outline:**

```css
.circle-outline {
    position: absolute;
    width: 400px;   /* Adjust size */
    height: 400px;  /* Adjust size */
    border: 2px solid rgba(0, 0, 0, 0.05); /* Adjust color and thickness */
    border-radius: 50%;
    right: -200px;  /* Adjust position */
    bottom: 15%;    /* Adjust position */
    animation: rotate 40s linear infinite;
}
```

**Blob Outlines (Irregular Shapes):**

```css
.blob-outline {
    position: absolute;
    border: 2px solid transparent; /* Base, color set by specific classes */
    pointer-events: none; /* Usually not interactive */
}

.blob-outline-1 {
    width: 350px;
    height: 350px;
    top: 35%;
    left: -5%;
    border-color: rgba(108, 99, 255, 0.3); /* Outline color */
    /* Irregular border-radius for blob shape */
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    animation: blob-morph-1 15s linear infinite alternate,
               blob-float-1 20s ease-in-out infinite;
    opacity: 0.85;
}

/* Add similar for .blob-outline-2 with different parameters */
```

## 3. CSS Animations (`@keyframes`)

Define the animations used by the blobs and outlines.

**Example Blob Movement Animation:**

```css
@keyframes blob-move-1 {
    0% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(50px, 20px) scale(1.05); /* Move and slightly grow */
    }
    100% {
        transform: translate(10px, 40px) scale(0.95); /* Move to another spot and shrink */
    }
}
/* Create blob-move-2, blob-move-3, blob-move-4 with different transform values */
```

**Example Circle Rotation Animation:**

```css
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

**Example Blob Morphing Animation (for Outlines):**

```css
@keyframes blob-morph-1 {
    0% {
        border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    }
    25% {
        border-radius: 45% 55% 65% 35% / 40% 50% 50% 60%;
    }
    50% {
        border-radius: 50% 50% 55% 45% / 45% 55% 45% 55%;
    }
    /* ... more steps for smoother morphing ... */
    100% {
        border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    }
}
```

**Example Blob Floating Animation (for Outlines):**

```css
@keyframes blob-float-1 {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(5deg); /* Float up and slightly rotate */
    }
    100% {
        transform: translateY(0) rotate(0deg);
    }
}
/* Create blob-morph-2 and blob-float-2 for the other outline */
```

## 4. Customization and Considerations

* **Performance:** Using many large, blurred, and animated elements can be performance-intensive.
  * Test thoroughly on different devices.
  * Consider reducing the number of blobs, the complexity of animations, or the blur radius for
    smaller screens/less powerful devices (as done in the original `hero.css` with media queries).
  * Using `will-change: transform, opacity;` on animated elements *can* sometimes help browsers
    optimize, but use it judiciously.
* **Colors and Opacity:** Experiment with `background-color` (especially the alpha value) and
  `opacity` to achieve the desired blending and intensity of the lights.
* **Positioning:** Adjust `top`, `left`, `right`, `bottom` values to position the blobs. Using
  negative values or percentages can place them partially off-screen for a more organic feel.
* **Animation Timing:** Play with the `duration`, `timing-function` (e.g., `ease-in-out`, `linear`),
  and `alternate` / `infinite` properties of your animations.
* **Dark Mode:** If your site has a dark mode, provide alternative styles for the blobs (e.g.,
  slightly different colors or opacities) to ensure they look good in both themes, as shown in the
  original `hero.css` (e.g., `body.dark-mode .blob-1 { ... }`).
* **Browser Compatibility:** `filter: blur()` and CSS animations are widely supported in modern
  browsers. Check caniuse.com for specifics if targeting older browsers.

## 5. Mobile Optimization for Blob Animations

Heavy animations, especially those involving blur and transforms, can be performance-intensive on
mobile devices, leading to janky animations or increased battery drain. It's crucial to optimize
these effects for smaller screens.

This project's `css/hero.css` uses CSS media queries to adjust the blob effects on mobile. Here's
how you can apply similar principles:

**Key Strategies:**

1. **Reduce or Disable Animations:** For smaller screens, especially portrait mode, consider
   removing animations entirely or replacing them with much simpler ones.
2. **Decrease Blur Radius:** The `filter: blur()` effect is costly. Reduce the blur amount
   significantly on mobile.
3. **Hide Some Blobs:** Not all blobs might be necessary on a smaller screen. Use `display: none;`
   to hide less critical ones.
4. **Adjust Opacity and Size:** Making blobs smaller or more transparent can also help.

**Example Media Queries (add to your CSS):**

```css
/* Base styles for blobs (as defined in previous sections) */

/* --- Mobile Optimizations --- */

/* For tablets and smaller (e.g., max-width: 768px) */
@media (max-width: 768px) {
    .blob {
        /* Example: Reduce blur and slow down animation */
        filter: blur(25px); /* Lower blur */
        /* animation-duration: 30s; /* Optionally make animations slower */ */
    }

    /* Example: Hide non-essential decorative elements */
    .dot-pattern,
    .circle-outline,
    .blob-outline {
        display: none;
    }
}

/* For small mobile devices in portrait orientation (most restrictive) */
@media (max-width: 768px) and (orientation: portrait) { /* Or a smaller max-width like 480px */
    /* Hide more demanding blobs */
    .blob-3,
    .blob-4 { /* Assuming these are more complex or larger */
        display: none;
    }

    .blob-1,
    .blob-2 { /* For remaining blobs */
        animation: none;          /* COMPLETELY DISABLE animation */
        transform: none !important; /* Reset any lingering animation transforms */
        filter: blur(20px);       /* Further reduce blur */
        opacity: 0.5;           /* Adjust opacity if needed */
        /* Optionally reduce size */
        /* width: 200px; */
        /* height: 200px; */
    }

    .blob-container {
        pointer-events: none; /* Can sometimes help if elements interfere with touch */
    }
}
```

**Implementation Steps:**

1. **Identify Breakpoints:** Choose appropriate screen widths (e.g., `768px`, `480px`) where
   optimizations should apply.
2. **Inspect Performance:** Use browser developer tools (Performance tab, rendering paints/layouts)
   to see how the animations impact performance on emulated mobile devices and, more importantly, on
   real devices.
3. **Iterate:** Apply optimizations gradually. You might start by reducing blur and animation
   complexity, and if issues persist, move to disabling animations or hiding elements.
4. **Test on Real Devices:** Emulators are good, but testing on a range of actual mobile devices is
   crucial for understanding the real-world user experience.

By using these techniques, you can provide a visually rich experience on desktops while ensuring a
smooth and responsible experience on mobile devices.
