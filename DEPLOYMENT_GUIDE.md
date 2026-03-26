# Deployment Guide for PR Agency Portfolio Website

## Project Overview

**Project Type:** Vite + React (Client) + Express (Server) Monorepo  
**Build Tool:** Vite  
**Framework:** React  
**Deployment Platform:** Vercel  
**Current Status:** Configured and ready for deployment

---

## Quick Start: Deploying to Vercel

### Prerequisites
- GitHub account with the repository connected
- Vercel account (free tier is sufficient)
- All environment variables configured

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio to Vercel"
   git push origin portfolio-webpage-design
   ```

2. **Vercel Auto-Deploy**
   - Vercel automatically detects new commits
   - Build process starts automatically
   - Check deployment status in Vercel dashboard

3. **Monitor the Build**
   - Navigate to: https://vercel.com/projects
   - Select "portfolio-webpage-design"
   - Check "Deployments" tab for build progress

---

## Build Configuration

### Current Setup

**vercel.json:**
```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install && cd client && npm install && cd ../server && npm install",
  "devCommand": "npm run dev",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Build Command:** Builds the Vite React application to the `client/dist` directory  
**Output Directory:** `client/dist` (where Vercel serves the static files)  
**Framework:** Vite (automatically detected by Vercel)

---

## Dependency Structure

### Root package.json
Manages monorepo scripts and shared dependencies

### client/package.json
React + Vite dependencies

**Key Dependencies:**
- `react` ^18.2.0
- `react-router-dom` ^6.20.1
- `gsap` ^3.12.2 (animations)
- `tailwindcss` ^3.3.6 (styling)
- `vite` ^5.0.8 (build tool)

### server/package.json
Express backend (not deployed to Vercel in this config)

---

## Troubleshooting Common Build Failures

### Issue 1: "Module not found: Cannot find module 'gsap'"

**Error Message:**
```
Error: Cannot find module 'gsap'
```

**Solution:**
1. Verify GSAP is in client/package.json: `npm ls gsap`
2. Ensure lock file is committed: `git add client/package-lock.json`
3. Check Vercel install command includes client: `npm install && cd client && npm install`

**Root Cause:** Missing dependencies during build

### Issue 2: "Cannot find module './components/portfolio/...'"

**Error Message:**
```
Error: Cannot find module './components/portfolio/PortfolioHero'
```

**Solution:**
1. Verify file exists: `ls client/src/components/portfolio/`
2. Check file extensions (.jsx not .js)
3. Verify case sensitivity (Linux servers are case-sensitive)
4. Check import paths in PortfolioPage.jsx

**Root Cause:** Import path incorrect or file missing

### Issue 3: "SyntaxError: Unexpected token"

**Error Message:**
```
SyntaxError: Unexpected token '}' at client/src/pages/PortfolioPage.jsx:15
```

**Solution:**
1. Check the specific file and line number mentioned
2. Verify all JSX syntax is correct
3. Look for missing closing brackets/parentheses
4. Test locally: `cd client && npm run build`
5. Run ESLint: `npm run lint` (if configured)

**Root Cause:** Syntax error in code

### Issue 4: Build Timeout

**Error Message:**
```
Build timed out after 45 minutes
```

**Solution:**
1. Check for infinite loops in build scripts
2. Verify no large files are in the build directory
3. Look for unnecessary dependencies
4. Check .vercelignore is excluding large folders
5. Simplify build process if possible

**Root Cause:** Build takes too long

---

## Environment Variables

### Setting Environment Variables in Vercel

1. Go to: **Project Settings → Environment Variables**
2. Add variables for each environment:
   - **Development** (Preview deployments)
   - **Production** (Main deployments)

### Required Variables

For this portfolio project, no environment variables are currently required for the frontend.

### Optional Variables

```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your_analytics_id
```

**Note:** Variables starting with `VITE_` are exposed to the client. Sensitive keys should NOT have this prefix.

---

## Vercel Project Settings

### Build & Development Settings

**Check These Settings:**

1. **Framework:** Should be "Vite"
2. **Build Command:** `cd client && npm run build`
3. **Install Command:** `npm install && cd client && npm install && cd ../server && npm install`
4. **Output Directory:** `client/dist`
5. **Root Directory:** `.` (project root)

### Git Configuration

**Verify:**
1. GitHub organization/repo is connected
2. Production branch is set (default: `main`)
3. "Deploy on push" is enabled
4. "Deploy on pull request" is enabled (for preview)

### Redeployment

**After Fixing Issues:**
1. Commit changes: `git commit -am "Fix deployment issue"`
2. Push to GitHub: `git push origin portfolio-webpage-design`
3. Vercel automatically redeploys
4. Monitor in Vercel dashboard

---

## Local Testing Before Deployment

### Test Build Locally

```bash
# Install all dependencies
npm install
cd client && npm install

# Build the project
npm run build

# This creates client/dist/ directory
```

### Test the Built Output

```bash
# Preview the production build
cd client
npm run preview

# Access at http://localhost:5173
```

### Check for Issues

```bash
# Look for TypeScript/ESLint errors
cd client
npm run lint

# Verify no critical warnings
npm run build 2>&1 | grep -i warning
```

---

## Common Configuration Issues

### Issue: Wrong Output Directory

**Current:** `client/dist`  
**Incorrect:** `dist` or `.next`

**Fix:** Verify vercel.json outputDirectory matches build output

### Issue: Build Command Missing Directory

**Current:** `cd client && npm run build`  
**Incorrect:** `npm run build` (from root, not in client)

**Fix:** Build command must navigate to client directory first

### Issue: Install Command Not Installing All Dependencies

**Current:** `npm install && cd client && npm install && cd ../server && npm install`  
**Incorrect:** `npm install` (only installs root dependencies)

**Fix:** Install command must also install client dependencies

---

## Verifying the Deployment

### After Successful Deployment

1. Check deployment URL in Vercel dashboard
2. Visit the URL: `https://your-project.vercel.app`
3. Verify all pages load correctly:
   - Homepage: `https://your-project.vercel.app/`
   - Portfolio: `https://your-project.vercel.app/portfolio`
   - About: `https://your-project.vercel.app/about`
4. Check browser console for errors: `F12 → Console tab`
5. Verify images load correctly

### Check Browser Console

**Expected:** No errors or critical warnings

**Common Browser Errors:**
- Image 404 errors → Check image paths in public folder
- CORS errors → Check API endpoints
- Module errors → Check imports

---

## Rollback Strategy

### If Deployment Fails

1. **Quick Rollback:**
   - Go to Vercel Deployments tab
   - Find the last successful deployment
   - Click the three dots → "Promote to Production"

2. **Investigate Issue:**
   - Check deployment logs for error messages
   - Follow troubleshooting steps above
   - Fix the issue locally
   - Commit and push to redeploy

### Prevent Future Issues

1. **Test Before Pushing:**
   - Always run `npm run build` locally
   - Verify no TypeScript/syntax errors
   - Test production build with `npm run preview`

2. **Monitor Deployments:**
   - Set up Vercel notifications
   - Check deployment status regularly
   - Review build logs for warnings

---

## Advanced Troubleshooting

### Enable Verbose Logging

**During build, Vercel shows detailed logs if:**
- Build has warnings (check for red indicators)
- Build takes longer than expected
- Build fails with cryptic error

**To Debug:**
1. Reproduce build locally with full output
2. Compare local output with Vercel logs
3. Look for differences in environment

### Check Build Artifacts

After successful build, verify:
```bash
# Check if dist folder has files
ls -la client/dist/

# Verify index.html exists
test -f client/dist/index.html && echo "✓ index.html found"

# Check for main bundle
ls client/dist/assets/ | grep main
```

### Monitor Build Performance

Check Vercel Analytics:
1. **Build Duration:** Should complete in < 2 minutes
2. **Bundle Size:** Monitor for increases
3. **Cache Hits:** Optimize with cache strategy

---

## Success Criteria

Deployment is successful when:

- ✓ No build errors in Vercel logs
- ✓ All pages load without 404 errors
- ✓ No critical errors in browser console
- ✓ Images display correctly
- ✓ Routing works correctly (React Router)
- ✓ GSAP animations work smoothly
- ✓ Responsive design works on mobile/tablet
- ✓ Performance is acceptable (< 3s page load)

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **View Deployment Logs:** Vercel Dashboard → Deployments → Select Build → View Logs

---

**Last Updated:** March 26, 2026  
**Version:** 1.0  
**Status:** Production Ready
