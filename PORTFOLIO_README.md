# Portfolio Page - Tauseef Baksh

## Overview

A minimalist, visually engaging portfolio webpage showcasing achievements, educational journey, and projects with smooth scroll effects and GSAP animations. The portfolio is fully responsive and inspired by modern design trends.

## Features

✨ **Interactive Components**
- Smooth scroll animations using GSAP
- Staggered element animations on scroll
- Hover effects with scale transitions
- Expandable project cards

📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimizations
- Smooth navigation across all screen sizes

🎨 **Modern Aesthetics**
- Minimalist color scheme (Navy + Teal)
- Professional typography
- Clean spacing and layout
- Subtle shadows and borders

🖼️ **Image Gallery**
- Interactive project screenshot gallery
- Hover effects with overlay text
- Easily updatable image paths

## Accessing the Portfolio

The portfolio is available at: `/portfolio`

You can navigate to it via:
- Direct URL: `/portfolio`
- Header navigation menu (Portfolio link)
- Internal scroll links from the hero section

## File Structure

```
client/src/
├── pages/
│   └── PortfolioPage.jsx          # Main portfolio page
├── components/portfolio/
│   ├── PortfolioHero.jsx          # Hero section with intro
│   ├── Achievements.jsx           # Awards & certifications
│   ├── Journey.jsx                # Education & experience timeline
│   └── Projects.jsx               # Featured projects & gallery
└── [other existing components]
```

## Customization Guide

### 1. **Update Personal Information**

**File:** `client/src/components/portfolio/PortfolioHero.jsx`

```javascript
// Update the main heading
<h1>Your Name Here</h1>

// Update the subtitle
<div>Your Professional Title</div>

// Update the description
<p>Your professional summary...</p>

// Update social links
href="https://github.com/yourprofile"
href="https://linkedin.com/in/yourprofile"
href="mailto:your@email.com"
```

### 2. **Modify Projects**

**File:** `client/src/components/portfolio/Projects.jsx`

Update the `projects` array:

```javascript
const projects = [
  {
    title: "Your Project Name",
    subtitle: "Project Category",
    description: "Detailed project description...",
    technologies: ["Tech1", "Tech2", "Tech3"],
    icon: CodeIcon, // Choose from lucide-react icons
    highlights: [
      "Key feature 1",
      "Key feature 2",
    ],
    color: "accent" // or "primary"
  },
  // Add more projects...
]
```

### 3. **Update Achievements**

**File:** `client/src/components/portfolio/Achievements.jsx`

Modify the `achievements` array and `stats` section:

```javascript
const achievements = [
  {
    icon: Trophy,
    title: "Achievement Title",
    description: "Description...",
    category: "Category"
  },
  // Add/remove achievements...
]

// Update stats
{[
  { label: "Certifications", value: "6+" },
  // Modify as needed...
]}
```

### 4. **Edit Education & Experience Timeline**

**File:** `client/src/components/portfolio/Journey.jsx`

Update the `journeyItems` array:

```javascript
const journeyItems = [
  {
    year: "Aug 2023 - Present",
    title: "Degree/Role Title",
    institution: "University/Company Name",
    location: "City, Country",
    description: "Your description...",
    icon: GraduationCap,
    type: "education" // or "experience"
  },
  // Add more timeline items...
]
```

Update skills in the skills section:

```javascript
// Languages & Frameworks
{['JavaScript', 'Python', 'React', 'Node.js'].map(skill => (...))}

// Databases & Tools
{['MySQL', 'MongoDB', 'Git'].map(skill => (...))}

// Soft Skills
{['Leadership', 'Communication'].map(skill => (...))}
```

### 5. **Replace Gallery Images**

**Location:** `client/public/`

Replace these files with your actual screenshots:
- `telegram-bot.jpg` - Project 1 screenshot
- `file-manager.jpg` - Project 2 screenshot
- `negai-design.jpg` - Project 3 screenshot
- `portfolio-overview.jpg` - Portfolio overview

**File:** `client/src/components/portfolio/Projects.jsx`

Update image alt text and labels in the gallery:

```javascript
<img 
  src="/your-image.jpg" 
  alt="Your project description" 
  className="..."
/>
<p className="font-semibold">Your Project Name</p>
<p className="text-sm text-white/80">Category</p>
```

## Animation Customization

### GSAP Animations

All animations use GSAP with ScrollTrigger. To customize timing:

**File:** `client/src/components/portfolio/Achievements.jsx` (and similar files)

```javascript
gsap.from(itemsRef.current, {
  duration: 0.8,        // Animation duration in seconds
  opacity: 0,           // Start opacity
  y: 40,                // Start Y position (pixels)
  stagger: 0.15,        // Delay between items (seconds)
  ease: 'back.out'      // Easing function
})
```

### Hover Effects

CSS hover effects are in `client/src/index.css`:

```css
.gallery-image:hover {
  @apply scale-105 shadow-subtle-lg;
}
```

## Color Scheme

**Primary Colors** (Navy):
- `primary-900`: Main color #1e3a5f
- `primary-700`, `primary-600`, etc. for variations

**Accent Colors** (Teal):
- `accent-500`: Main accent #06b6d4
- `accent-400`, `accent-300`, etc. for variations

**Neutrals**: Grays for backgrounds and text

Update colors in `client/tailwind.config.js` if needed.

## Performance Notes

- GSAP is registered with ScrollTrigger plugin
- Animations trigger on scroll for better performance
- Images are optimized and responsive
- Lazy loading ready (add with intersection observer if needed)

## Dependencies

- **gsap**: "^3.12.2" - Animation library
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

Install new dependencies with:
```bash
npm install
```

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All breakpoints use Tailwind's standard prefixes: `md:`, `lg:`, etc.

## Best Practices

1. ✅ Update images in `public/` folder
2. ✅ Keep project descriptions concise
3. ✅ Use consistent icon choices from lucide-react
4. ✅ Test animations on mobile devices
5. ✅ Verify all external links work
6. ✅ Use actual project descriptions and achievements

## Troubleshooting

**Images not displaying?**
- Check file paths in `src/components/portfolio/Projects.jsx`
- Ensure images are in `client/public/` folder
- Verify image filenames match exactly (case-sensitive)

**Animations not working?**
- Ensure GSAP is installed: `npm install gsap`
- Check browser console for errors
- Verify ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`

**Styling issues?**
- Clear Tailwind cache
- Check for conflicting CSS classes
- Verify Tailwind config is loaded

## Navigation Flow

1. **Hero Section** - Introduction & quick navigation
2. **Achievements** - Awards, certifications, stats
3. **Journey** - Timeline of education & experience
4. **Projects** - Featured projects with expandable details
5. **Gallery** - Project screenshots
6. **CTA** - Call-to-action for GitHub/Contact

## Future Enhancements

- Add blog integration
- Implement case study pages for projects
- Add testimonials section
- Integrate with CMS for content management
- Add dark mode toggle
- Add search functionality

---

**Created for:** Tauseef Baksh | Full Stack Developer
**Last Updated:** 2026
