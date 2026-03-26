# Deployment Quick Reference Card

## Before Deploying

```bash
# 1. Test locally
npm install && cd client && npm install

# 2. Build the project
npm run build

# 3. Check for errors
cd client && npm run lint

# 4. Preview production build
npm run preview
```

## Common Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install && cd client && npm install` |
| Start development | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `cd client && npm run preview` |
| Lint code | `cd client && npm run lint` |
| Check GSAP version | `npm ls gsap` |

## Vercel Configuration

**File:** `vercel.json`

```
buildCommand: cd client && npm run build
outputDirectory: client/dist
installCommand: npm install && cd client && npm install && cd ../server && npm install
framework: vite
```

## Environment Setup

### Local Development
Create `.env.local` in client directory:
```
VITE_API_URL=http://localhost:5000
```

### Vercel Production
Settings → Environment Variables:
```
VITE_API_URL=https://api.yourdomain.com
```

## Troubleshooting

| Error | Fix |
|-------|-----|
| "Cannot find module" | Check import paths, file existence, case sensitivity |
| "SyntaxError" | Run `npm run build` locally to find the exact line |
| "GSAP not found" | Verify `gsap` in client/package.json, commit package-lock.json |
| Build timeout | Check for infinite loops, large files, or unnecessary tasks |
| Blank page | Check browser console (F12), verify React Router routes |

## Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript/ESLint errors
- [ ] No critical console errors
- [ ] All images exist in `client/public/`
- [ ] Environment variables set in Vercel
- [ ] vercel.json configured correctly
- [ ] .gitignore includes node_modules
- [ ] package-lock.json committed to git
- [ ] Latest code pushed to GitHub

## Useful Links

- Vercel Dashboard: https://vercel.com/projects
- Project Settings: Vercel Dashboard → portfolio-webpage-design → Settings
- Deployment Logs: Vercel Dashboard → Deployments → Select Build
- Environment Variables: Settings → Environment Variables
- Git Repository: https://github.com/tauseefbaksh/pr24x7

## File Structure

```
/
├── client/           # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   │   └── PortfolioPage.jsx
│   │   ├── components/
│   │   │   └── portfolio/
│   │   │       ├── PortfolioHero.jsx
│   │   │       ├── Achievements.jsx
│   │   │       ├── Journey.jsx
│   │   │       └── Projects.jsx
│   │   └── public/
│   │       └── [images]
│   ├── vite.config.js
│   └── package.json
├── server/          # Express backend (not deployed to Vercel)
├── vercel.json      # Vercel configuration
└── .vercelignore    # Files to exclude from build

```

## Key Files to Monitor

1. **vercel.json** - Deployment configuration
2. **client/package.json** - Dependencies and build scripts
3. **client/package-lock.json** - Dependency lock file (commit this!)
4. **client/src/pages/PortfolioPage.jsx** - Main portfolio page
5. **.vercelignore** - Files excluded from build

---

**Last Updated:** March 26, 2026
