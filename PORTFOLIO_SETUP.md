# Portfolio Setup & Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies
The project automatically installs dependencies when you start the dev server. GSAP has been added to `package.json`.

```bash
cd client
npm install  # Only if needed
npm run dev  # Start development server
```

### 2. Access Your Portfolio
Once the dev server is running, navigate to:
```
http://localhost:5173/portfolio
```

Or click "Portfolio" in the header navigation menu.

## 📝 Essential Updates Needed

Before deploying, update these files with your actual information:

### Step 1: Update Hero Section
**File:** `src/config/portfolioData.js` (RECOMMENDED)

Update the hero object:
```javascript
export const portfolioData = {
  hero: {
    name: "Your Name",
    title: "Your Title",
    description: "Your professional summary...",
    github: "https://github.com/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "your@email.com",
    phone: "+1-234-567-8900"
  },
  // ... rest of config
}
```

**Alternative Method** - Edit directly in components:
- `src/components/portfolio/PortfolioHero.jsx` - Change name, title, bio, links

### Step 2: Update Projects
**File:** `src/config/portfolioData.js`

Replace the projects array with your projects:
```javascript
projects: [
  {
    title: "Your Project Name",
    subtitle: "Your tagline",
    description: "What you built and why it matters...",
    technologies: ["React", "Node.js", "MongoDB"],
    highlights: ["Feature 1", "Feature 2"],
    color: "accent", // or "primary"
    image: "/project-screenshot.jpg",
  },
  // Add more projects...
]
```

### Step 3: Update Achievements
**File:** `src/config/portfolioData.js`

Replace the achievements array with your certifications and awards:
```javascript
achievements: [
  {
    title: "Your Award/Certification",
    description: "Description of achievement...",
    category: "Certification" // or "Competition", "Training", "Award"
  },
  // Add more achievements...
]
```

### Step 4: Update Education & Experience Timeline
**File:** `src/config/portfolioData.js`

Update the journey array:
```javascript
journey: [
  {
    year: "2023 - Present",
    title: "Your Degree/Job Title",
    institution: "University/Company Name",
    location: "City, Country",
    description: "What you learned/did...",
    type: "education" // or "experience"
  },
  // Add timeline items...
]
```

### Step 5: Add Your Project Screenshots
**Location:** `client/public/`

Replace these image files with your actual project screenshots:
1. `telegram-bot.jpg` - Screenshot of Project 1
2. `file-manager.jpg` - Screenshot of Project 2
3. `negai-design.jpg` - Screenshot of Project 3
4. `portfolio-overview.jpg` - Project overview/portfolio screenshot

Alternatively, upload new images and update the paths in the gallery section.

### Step 6: Update Skills
**File:** `src/config/portfolioData.js`

Update the skills object:
```javascript
skills: {
  languages: ["JavaScript", "Python", "React", "Node.js"],
  databases: ["MongoDB", "PostgreSQL", "MySQL"],
  soft: ["Leadership", "Problem Solving", "Communication"]
}
```

## 📊 Component Structure

```
Portfolio Page (/portfolio)
├── PortfolioHero
│   ├── Name & introduction
│   ├── Quick navigation links
│   └── Social media links
├── Achievements
│   ├── Awards & certifications grid
│   └── Statistics
├── Journey
│   ├── Timeline of education
│   ├── Work experience
│   └── Skills showcase
├── Projects
│   ├── Featured projects cards
│   ├── Expandable project details
│   └── Interactive image gallery
└── Footer
```

## 🎨 Design Customization

### Colors
**File:** `tailwind.config.js`

Current color scheme:
- **Primary (Navy):** `#1e3a5f`
- **Accent (Teal):** `#06b6d4`
- **Neutrals:** Grays for text/backgrounds

To change colors, update the color objects:
```javascript
colors: {
  primary: {
    900: '#1e3a5f', // Main navy - change this
    // ... other shades
  },
  accent: {
    500: '#06b6d4', // Main teal - change this
    // ... other shades
  }
}
```

### Fonts
The portfolio uses:
- **Headings:** Poppins (bold, impact)
- **Body:** Inter (clean, readable)

To change fonts, update `tailwind.config.js` and `index.css`.

### Animation Speed
**File:** `src/components/portfolio/` (each component)

Adjust animation duration:
```javascript
gsap.from(items, {
  duration: 0.8,  // Change this (in seconds)
  // ... other props
})
```

## 🔧 Advanced Customization

### Add New Sections
1. Create a new component in `src/components/portfolio/`
2. Import it in `src/pages/PortfolioPage.jsx`
3. Add to the JSX structure

### Add Smooth Scroll Sections
Each section has an `id` attribute. Create internal links:
```javascript
<button onClick={() => scrollToSection('projects')}>
  View Projects
</button>
```

### Custom Icons
Replace Lucide React icons with others from the library:
```javascript
import { Star, Code, Zap } from 'lucide-react'

// Use in component:
<Icon size={24} />
```

## 📱 Responsive Testing

The portfolio is fully responsive. Test on:
- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

Use browser DevTools to test responsiveness.

## 🚀 Deployment

### To Vercel
```bash
# From project root
git add .
git commit -m "Update portfolio"
git push
# Vercel auto-deploys from git
```

### To Other Platforms
```bash
cd client
npm run build  # Creates dist/ folder
# Deploy the dist folder to your hosting
```

## 🐛 Troubleshooting

**Images not showing?**
- Check file names in `public/` folder match paths in code
- Ensure images are in `client/public/` directory
- Use relative paths like `/image-name.jpg`

**Animations not smooth?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser supports GSAP
- Verify ScrollTrigger plugin is registered

**Layout breaking on mobile?**
- Check responsive classes (md:, lg: prefixes)
- Test in mobile viewport (DevTools)
- Ensure Tailwind is properly configured

**Colors not updating?**
- Clear Tailwind cache
- Verify Tailwind config is saved
- Use correct color class names (primary-900, accent-500, etc.)

## 📚 Dependencies

Pre-installed:
- `react` - UI framework
- `react-router-dom` - Navigation
- `gsap` - Animations (newly added)
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `react-helmet-async` - Meta tags

Install more if needed:
```bash
npm install package-name
```

## 🎯 Next Steps

1. ✅ Update `portfolioData.js` with your information
2. ✅ Replace placeholder images with your screenshots
3. ✅ Customize colors if desired
4. ✅ Test on mobile and desktop
5. ✅ Deploy to Vercel or your hosting

## 📞 Support

For questions about components or features, check:
- `PORTFOLIO_README.md` - Detailed documentation
- Component files themselves - Well-commented code
- Tailwind docs - https://tailwindcss.com
- GSAP docs - https://greensock.com/docs

---

**Happy building! Your portfolio is ready to showcase your amazing projects! 🎉**
