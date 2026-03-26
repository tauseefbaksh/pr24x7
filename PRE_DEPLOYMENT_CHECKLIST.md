# Pre-Deployment Checklist for Next.js on Vercel

Complete this checklist before every deployment to minimize failure risks.

## Code Quality & Testing

- [ ] All code changes have been tested locally
- [ ] No console errors or warnings in development build
- [ ] No syntax errors detected by ESLint
- [ ] All TypeScript types are properly defined (if using TypeScript)
- [ ] All imports are correct and reference existing files
- [ ] No unused imports or variables
- [ ] All dependencies are used and needed

## Build Verification

- [ ] Run `npm install` successfully
- [ ] `npm run build` completes without errors
- [ ] `npm run build` produces no critical warnings
- [ ] `npm run start` serves the production build correctly
- [ ] Application responds correctly at http://localhost:3000
- [ ] All pages load and function properly in production build
- [ ] No 404 errors for static assets (images, CSS, etc.)
- [ ] Navigation between pages works correctly

## Dependencies & Versions

- [ ] `package.json` has no syntax errors
- [ ] All required dependencies are listed
- [ ] No peer dependency conflicts
- [ ] Next.js version is compatible with React version
- [ ] TypeScript version is compatible (if using TypeScript)
- [ ] `npm ls` shows no critical issues
- [ ] `npm audit` shows no high severity vulnerabilities (or accepted risks)
- [ ] No duplicate dependencies in node_modules

## Configuration Files

- [ ] `next.config.js` has valid JavaScript syntax
- [ ] `tsconfig.json` or `jsconfig.json` is properly formatted (if using)
- [ ] Path aliases in `tsconfig.json` match actual imports
- [ ] `vercel.json` is valid JSON (if using custom configuration)
- [ ] `.env.local` contains all required environment variables
- [ ] `.env.local` matches actual environment variable names in code

## Git & Repository

- [ ] All changes are committed with clear commit messages
- [ ] No uncommitted or untracked files needed for deployment
- [ ] Commits are pushed to the correct branch (usually `main`)
- [ ] No merge conflicts pending
- [ ] Branch is up-to-date with remote (`git pull` shows nothing to pull)
- [ ] Git history shows intended changes

## Environment Variables

- [ ] All `process.env.*` usages are defined
- [ ] All `NEXT_PUBLIC_*` variables are accessible in browser
- [ ] Secret keys are NOT prefixed with `NEXT_PUBLIC_`
- [ ] Environment variables are set in Vercel dashboard
- [ ] Variable names in Vercel match exactly (case-sensitive)
- [ ] Variables are assigned to correct environments (Production/Preview)
- [ ] No hardcoded secrets in code
- [ ] No API keys or passwords in repository

## Vercel Project Settings

- [ ] Connected to correct GitHub repository
- [ ] Watching correct branch (usually `main`)
- [ ] Build command is set correctly
- [ ] Output directory is `.next` (or correct for your setup)
- [ ] Root directory is correct (`.` or `packages/app` if monorepo)
- [ ] Node.js version is specified and compatible
- [ ] Environment variables are configured in Vercel
- [ ] No conflicting environment variable overrides

## API Routes & Backend

- [ ] All API routes are working locally
- [ ] API endpoints return expected status codes
- [ ] Error handling is implemented for API routes
- [ ] Database connections are properly configured
- [ ] Database credentials are in environment variables (not hardcoded)
- [ ] All external API keys are set as environment variables
- [ ] Timeout durations are reasonable for Vercel limits

## Static Assets & Media

- [ ] All images are optimized (use `next/image` component)
- [ ] Image domains are configured in `next.config.js` if using external URLs
- [ ] No broken image links
- [ ] All CSS and JavaScript files are referenced correctly
- [ ] No large unoptimized assets (< 1MB per asset recommended)
- [ ] Public folder files are correctly referenced
- [ ] SVG files are properly formatted

## Performance & Optimization

- [ ] Build time is reasonable (< 10 minutes)
- [ ] Bundle size is acceptable (check with `@next/bundle-analyzer`)
- [ ] No unnecessary dependencies included in build
- [ ] Images are optimized (WebP, correct dimensions)
- [ ] Large libraries are code-split or lazy-loaded
- [ ] Scripts are deferred or async where appropriate

## Security

- [ ] No hardcoded API keys or secrets in code
- [ ] No sensitive information in console logs
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] All external data is properly sanitized
- [ ] HTTPS is enforced (Vercel handles this by default)
- [ ] No unnecessary packages with known vulnerabilities
- [ ] Environment variables contain all secrets

## Documentation & Communication

- [ ] README is up-to-date with deployment instructions
- [ ] Environment variables required for deployment are documented
- [ ] Known limitations or quirks are documented
- [ ] Team members are aware of the deployment
- [ ] Deployment window is scheduled if production deployment
- [ ] Rollback plan is in place if needed
- [ ] Monitoring/alerting is set up for production

## Final Checks

- [ ] Everything above is completed and verified
- [ ] No uncommitted changes remain (`git status` is clean)
- [ ] Ready to push or deploy
- [ ] Have tested in development environment one final time

---

## Deployment

Once all checks pass:

```bash
# Push to main/production branch
git push origin main

# Vercel will automatically deploy
# Monitor deployment in Vercel dashboard

# Verify deployed app
# Open https://your-app.vercel.app
# Test key features work correctly
```

## Post-Deployment Verification

- [ ] Application loads without errors
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] API routes respond correctly
- [ ] Environment variables are accessible (where needed)
- [ ] Database connections work (if applicable)
- [ ] External API integrations work
- [ ] Performance is acceptable
- [ ] No 404 or 500 errors in console
- [ ] Error tracking/monitoring is active
