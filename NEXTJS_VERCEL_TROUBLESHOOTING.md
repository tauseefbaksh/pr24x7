# Next.js Vercel Deployment Troubleshooting Guide

A comprehensive, step-by-step guide for diagnosing and resolving deployment failures of Next.js websites on Vercel. This guide covers common issues, diagnostic procedures, and systematic solutions to ensure successful deployment.

---

## Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [Phase 1: Pre-Deployment Verification](#phase-1-pre-deployment-verification)
3. [Phase 2: Analyzing Vercel Build Logs](#phase-2-analyzing-vercel-build-logs)
4. [Phase 3: Common Build Failures](#phase-3-common-build-failures)
5. [Phase 4: Dependency Verification](#phase-4-dependency-verification)
6. [Phase 5: Configuration Issues](#phase-5-configuration-issues)
7. [Phase 6: Environment Variables](#phase-6-environment-variables)
8. [Phase 7: Server & Runtime Issues](#phase-7-server--runtime-issues)
9. [Phase 8: Advanced Diagnostics](#phase-8-advanced-diagnostics)
10. [Phase 9: Vercel Project Settings Review](#phase-9-vercel-project-settings-review)
11. [Recovery & Rollback](#recovery--rollback)

---

## Quick Start Checklist

If your Next.js deployment is failing, complete this checklist first (takes ~10 minutes):

- [ ] **Check Vercel Dashboard**: Navigate to your project and review the latest deployment status
- [ ] **View Build Logs**: Click on the failed deployment to see detailed error messages
- [ ] **Verify Git Commit**: Ensure the code was pushed to the correct branch
- [ ] **Check Local Build**: Run `npm run build` or `yarn build` locally and verify it succeeds
- [ ] **Review Error Output**: Look for specific error types (syntax errors, missing modules, configuration issues)
- [ ] **Verify Dependencies**: Check `package.json` for missing or incompatible versions
- [ ] **Check Environment Variables**: Confirm all required env vars are set in Vercel project settings
- [ ] **Review next.config.js**: Ensure configuration is valid and Vercel-compatible
- [ ] **Test Root Cause**: Apply the appropriate fix from this guide based on the error type
- [ ] **Redeploy**: Push changes or manually redeploy from Vercel dashboard

**If still failing after this checklist, proceed to Phase 1 below.**

---

## Phase 1: Pre-Deployment Verification

Before investigating Vercel, ensure your local environment is correct.

### Step 1.1: Verify Local Build Success

The most reliable way to catch issues early is testing locally.

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Run the build
npm run build

# Start the production server
npm run start
```

**What to look for:**
- Build completes without errors (exits with code 0)
- No yellow warnings that could cause issues
- Production server starts on port 3000
- Application responds correctly to requests

**If local build fails:**
- The issue is in your code or configuration, not Vercel
- Fix locally first before pushing to git
- Proceed to the appropriate phase below based on the error type

### Step 1.2: Verify Git Status

Ensure your changes are properly committed and on the correct branch.

```bash
# Check current branch
git status

# View recent commits
git log --oneline -5

# Verify remote is correct
git remote -v

# Check if changes are staged
git diff --cached
```

**Key points:**
- You should be on the branch connected to Vercel (usually `main` or `develop`)
- All changes should be committed (no uncommitted files)
- The commit should be pushed to the remote repository

### Step 1.3: Check package.json Scripts

Verify your build scripts are correctly configured.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Vercel requires:**
- `build` script that runs `next build` (or equivalent)
- `start` script that runs `next start` (for production)
- No custom build configuration that could conflict with Vercel

---

## Phase 2: Analyzing Vercel Build Logs

The Vercel build logs contain valuable diagnostic information. Here's how to access and interpret them.

### Step 2.1: Access Build Logs in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on "Deployments" tab
4. Click on the failed deployment (red status indicator)
5. Scroll down to see full build logs

### Step 2.2: Understand Log Timestamps & Stages

Vercel logs show different build stages. Identify where the failure occurs:

```
[08:45:12.123] Cloning git repository...
[08:45:15.456] ✓ Cloning complete
[08:45:20.789] Installing dependencies...
[08:45:45.012] ✓ Dependencies installed (12.3s)
[08:46:01.234] Building project...
[08:46:15.567] ✗ Build failed
[08:46:15.890] Error: Cannot find module...
```

**Log stages in order:**
1. Git cloning (fetching your repository)
2. Dependency installation (npm/yarn)
3. Build execution (next build)
4. Deployment (uploading to CDN)

Identify which stage failed.

### Step 2.3: Extract Error Information

Look for these specific error indicators in logs:

**Build Errors (most common):**
```
Error: Cannot find module 'module-name'
Error in ./src/pages/index.js
ReferenceError: variable is not defined
SyntaxError: Unexpected token
```

**Dependency Errors:**
```
npm ERR! peer dep missing: dependency@version
npm ERR! 404 Not Found
npm ERR! code ERESOLVE
```

**Configuration Errors:**
```
Error: Invalid configuration in next.config.js
Error: Build optimization failed
```

**Timeout Errors:**
```
Build timed out after 3600 seconds
Build timeout: Functions took too long to deploy
```

### Step 2.4: Copy Full Error Output

For complex issues, copy the entire error output:

1. Click the "Raw Logs" button (if available)
2. Copy all text from the error section
3. Search for the error message in this guide or online
4. Reference the specific error type in your troubleshooting

**Example error output to save:**
```
[08:46:15.567] ✗ Build failed
[08:46:15.890] Error: Cannot find module '@components/Header'
[08:46:15.912] at Module._load (internal/modules/loader.js:241:45)
[08:46:15.934] at Function.Module._load_as_main (internal/modules/loader.js:257:18)
[08:46:15.956] at Object.<anonymous> (/vercel/path/to/file.js:5:3)
```

---

## Phase 3: Common Build Failures

Diagnose the specific type of build failure you're experiencing.

### 3.1: Module Not Found Errors

**Symptom:**
```
Error: Cannot find module 'module-name'
Cannot find module '@/components/Button'
```

**Root Causes:**
- Component or file doesn't exist
- Incorrect import path
- Path alias misconfiguration
- File extension mismatch

**Diagnostic Steps:**

1. **Verify file exists locally:**
   ```bash
   # Check if component exists
   ls -la src/components/Button.jsx
   # OR for Windows
   dir src\components\Button.jsx
   ```

2. **Check import path matches file location:**
   ```javascript
   // If file is at: src/components/Button.jsx
   // Import should be:
   import Button from '@/components/Button';
   // OR
   import Button from '../components/Button';
   ```

3. **Verify path aliases in jsconfig.json or tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"],
         "@components/*": ["src/components/*"]
       }
     }
   }
   ```

4. **Check for case sensitivity** (Linux/Mac are case-sensitive):
   ```bash
   # File: Button.jsx
   # Correct: import Button from './Button'
   # WRONG: import Button from './button'
   ```

**Quick Fixes:**

```bash
# Fix 1: Find all import errors
grep -r "Cannot find module" src/

# Fix 2: Check if files exist
find src -name "*.jsx" -o -name "*.ts" -o -name "*.tsx"

# Fix 3: Verify path aliases
cat jsconfig.json | grep -A 5 "paths"
```

**Solution:** Create missing files, fix import paths, or update alias configuration.

### 3.2: Syntax Errors

**Symptom:**
```
SyntaxError: Unexpected token (line 42)
Parse error: Expected identifier, got '}'
```

**Root Causes:**
- Missing closing brace, bracket, or parenthesis
- Incorrect JSX syntax
- Improper template literal usage
- Invalid JavaScript syntax

**Diagnostic Steps:**

1. **Check the specific line mentioned in error:**
   ```bash
   # View around the error line (e.g., line 42)
   sed -n '35,50p' src/pages/index.js
   ```

2. **Look for common syntax issues:**
   - Missing closing braces: `{`, `[`, `(`
   - Unclosed strings or template literals
   - Invalid JSX (mixing angle brackets)
   - Missing semicolons in critical places

3. **Use a JavaScript validator:**
   ```bash
   # Install and run ESLint
   npm install --save-dev eslint
   npx eslint src/ --fix
   ```

**Quick Fixes:**

```javascript
// WRONG: Missing closing brace
const MyComponent = () => {
  return (
    <div>Content</div>
  // Missing closing )

// CORRECT:
const MyComponent = () => {
  return (
    <div>Content</div>
  );
}

// WRONG: Invalid JSX
return (
  <div>
    <p>{message}
  </div>
)

// CORRECT:
return (
  <div>
    <p>{message}</p>
  </div>
)
```

**Solution:** Review the error line, fix syntax issues, commit, and redeploy.

### 3.3: Environment Variable Issues

**Symptom:**
```
Error: Environment variable MY_API_KEY is required
ReferenceError: process.env.DATABASE_URL is undefined
```

**Root Causes:**
- Environment variable not set in Vercel
- Incorrect variable name
- Variable not prefixed with `NEXT_PUBLIC_` for client-side access
- Variable accessed before initialization

**Diagnostic Steps:**

1. **Check Vercel environment variables:**
   - Go to Project Settings → Environment Variables
   - Verify all required variables are listed
   - Check variable names match exactly (case-sensitive)

2. **Distinguish client vs server variables:**
   ```javascript
   // Server-side (only accessible in API routes, getServerSideProps, etc.)
   const apiKey = process.env.API_SECRET_KEY;
   
   // Client-side (accessible in browser)
   const publicKey = process.env.NEXT_PUBLIC_API_KEY;
   ```

3. **Verify in next.config.js:**
   ```javascript
   module.exports = {
     env: {
       CUSTOM_VAR: process.env.CUSTOM_VAR,
     },
   };
   ```

4. **Check .env.local locally:**
   ```bash
   cat .env.local
   # Should contain same variables as Vercel
   ```

**Solution:** Add missing environment variables to Vercel project settings.

### 3.4: Memory or Timeout Errors

**Symptom:**
```
Build timed out after 3600 seconds
JavaScript heap out of memory
Build Step timed out after 900s
```

**Root Causes:**
- Large dependencies or data processing
- Inefficient build configuration
- Missing API keys causing infinite retries
- Memory-intensive operations during build

**Diagnostic Steps:**

1. **Check build size:**
   ```bash
   npm ls --depth=0 | head -20
   ```

2. **Analyze bundle size:**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

3. **Review build configuration:**
   ```javascript
   // next.config.js
   module.exports = {
     swcMinify: true, // Enable SWC minification (faster)
     productionBrowserSourceMaps: false, // Reduce build time
   };
   ```

**Solution:**
- Remove unnecessary dependencies
- Split code into smaller chunks
- Optimize build configuration
- Increase timeout in Vercel settings if needed

---

## Phase 4: Dependency Verification

Many deployment failures are dependency-related. Verify all dependencies are correct.

### Step 4.1: Check package.json Integrity

```bash
# View current dependencies
cat package.json | grep -A 20 "dependencies"

# Check for duplicate dependencies
npm ls | grep duplicated

# Verify all dependencies are installed
npm ci  # or npm install
```

**What to verify:**
- No syntax errors in package.json
- All imported modules are listed as dependencies
- No conflicting version requirements
- No peer dependency warnings

### Step 4.2: Verify Next.js Version Compatibility

```bash
# Check installed Next.js version
npm ls next

# Check for compatibility with other packages
npm ls react react-dom
```

**Compatibility issues to watch for:**

```json
{
  "dependencies": {
    "next": "^13.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**Next.js version requirements:**
- Next.js 13+ requires React 18+
- Next.js 12 and earlier work with React 17
- TypeScript: Ensure @types packages are installed

### Step 4.3: Fix Dependency Issues

```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Update packages to latest compatible versions
npm update

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# Fix known security issues
npm audit fix
```

### Step 4.4: Identify Missing Dependencies

If you see "Cannot find module" errors:

```bash
# Check if module is installed
npm ls module-name

# Install missing module
npm install module-name

# Install dev dependency
npm install --save-dev eslint
```

**Common missing dependencies:**
- `@types/react` (if using TypeScript)
- `@types/react-dom`
- `@types/node`
- CSS-in-JS libraries (styled-components, emotion, etc.)

---

## Phase 5: Configuration Issues

Next.js and Vercel configuration problems often cause deployment failures.

### Step 5.1: Review next.config.js

```javascript
// next.config.js - Common issues

// ❌ WRONG: Exporting incorrect format
module.exports = {
  // missing closing brace and parenthesis
  reactStrictMode: true
  // Missing comma between properties
  swcMinify: true

// ✅ CORRECT:
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
};
```

**Verify these settings:**

```javascript
module.exports = {
  // React settings
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['cdn.example.com'], // Add allowed image domains
  },
  
  // Redirects and rewrites
  async redirects() {
    return [
      // Configuration here
    ];
  },
  
  // Headers
  async headers() {
    return [
      // Configuration here
    ];
  },
  
  // Environment variables
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR,
  },
  
  // Build optimization
  swcMinify: true,
  productionBrowserSourceMaps: false,
};
```

**Common configuration errors:**
- Invalid JavaScript syntax
- Undefined functions or variables
- Incorrect property names
- Missing required properties in rewrites/redirects

### Step 5.2: Check vercel.json Configuration

If using `vercel.json` for custom configuration:

```json
{
  "buildCommand": "next build",
  "installCommand": "npm ci",
  "outputDirectory": ".next",
  "env": {
    "CUSTOM_VAR": "@custom-var"
  }
}
```

**Verify:**
- Build command is correct
- Output directory matches Next.js output
- Environment variables reference valid secrets
- No syntax errors in JSON

### Step 5.3: Verify TypeScript Configuration

If using TypeScript:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Verify:**
- `jsx` is set to "preserve" for Next.js
- `moduleResolution` is "node"
- Path aliases match import usage
- No TypeScript errors locally

---

## Phase 6: Environment Variables

Environment variables are critical for deployment. Verify setup carefully.

### Step 6.1: List Required Variables

Create a list of all environment variables your app needs:

```bash
# Search for environment variable usage
grep -r "process.env\." src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Example output:
# process.env.NEXT_PUBLIC_API_URL
# process.env.DATABASE_URL
# process.env.API_SECRET_KEY
```

### Step 6.2: Set Variables in Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add each required variable:
   - Variable name (e.g., `DATABASE_URL`)
   - Value (e.g., `postgresql://user:pass@host/db`)
   - Environments (Production, Preview, Development)

**Example setup:**

| Variable Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.example.com` | All |
| `API_SECRET_KEY` | `secret-key-value` | Production |
| `DATABASE_URL` | `postgresql://...` | Production |

### Step 6.3: Verify Variable Access

```javascript
// pages/api/example.js - Server-side variable access
export default function handler(req, res) {
  // Only works in API routes, getServerSideProps, or server middleware
  const apiKey = process.env.API_SECRET_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  res.status(200).json({ message: 'Success' });
}

// Components - Client-side variable access (requires NEXT_PUBLIC_ prefix)
export default function MyComponent() {
  // This only works if prefixed with NEXT_PUBLIC_
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // This will be undefined in browser
  const apiKey = process.env.API_SECRET_KEY; // ❌ Won't work on client
  
  return <div>{apiUrl}</div>;
}
```

### Step 6.4: Test Variables Locally

```bash
# Create .env.local file
cat > .env.local << EOF
DATABASE_URL=postgresql://localhost/mydb
API_SECRET_KEY=dev-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF

# Run locally
npm run dev

# Check if variables are accessible
curl http://localhost:3000/api/example
```

### Step 6.5: Verify in Deployment

Add a debug endpoint (remove in production):

```javascript
// pages/api/debug-env.js
export default function handler(req, res) {
  const vars = {
    hasDatabase: !!process.env.DATABASE_URL,
    hasApiKey: !!process.env.API_SECRET_KEY,
    publicUrl: process.env.NEXT_PUBLIC_API_URL,
  };
  
  res.status(200).json(vars);
}
```

Deploy and check: `https://yourapp.vercel.app/api/debug-env`

---

## Phase 7: Server & Runtime Issues

Issues that occur after successful build (deployment stage failures).

### Step 7.1: Check Function Memory

```javascript
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Only available server-side
    apiUrl: process.env.API_URL,
  },
  publicRuntimeConfig: {
    // Available both server and client
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  },
};
```

### Step 7.2: Verify API Routes

```javascript
// pages/api/test.js - Minimal test endpoint
export default function handler(req, res) {
  console.log('[API Route] Request received');
  res.status(200).json({ status: 'ok', timestamp: new Date() });
}
```

Test: `curl https://yourapp.vercel.app/api/test`

### Step 7.3: Check Edge Middleware

If using Edge Middleware:

```javascript
// middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('[Middleware] Processing request');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Issues to watch:**
- Middleware syntax errors
- Infinite redirects
- Missing dependencies in middleware

### Step 7.4: Monitor Runtime Logs

After deployment, check actual runtime logs:

1. Go to **Deployments** tab
2. Click on successful deployment
3. Scroll to "Runtime Logs" section
4. Look for errors or warnings

---

## Phase 8: Advanced Diagnostics

For complex or persistent issues.

### Step 8.1: Enable Verbose Logging

```bash
# Set debug environment variable
DEBUG=* npm run build

# Or for specific packages
DEBUG=next:* npm run build
```

### Step 8.2: Analyze Build Output

```bash
# Build locally and analyze output
npm run build

# Check build size
du -sh .next/

# List all built files
find .next -type f | head -20
```

### Step 8.3: Test with Production Configuration

```bash
# Build for production
npm run build

# Start production server
npm run start

# Test endpoints
curl http://localhost:3000
curl http://localhost:3000/api/test
```

### Step 8.4: Use Vercel CLI for Testing

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Build and test locally like Vercel would
vercel build

# Test the build output
vercel start
```

### Step 8.5: Check System Dependencies

Some packages require system-level dependencies:

```bash
# Example: imagemin requires system packages
# If using image optimization, ensure these are available:
# - libvips (for image processing)
# - sharp (Node.js image library)

npm list sharp
npm list imagemin
```

---

## Phase 9: Vercel Project Settings Review

Ensure Vercel project settings are configured correctly.

### Step 9.1: Basic Project Settings

1. Go to **Project Settings**
2. Review these settings:

**Build & Development Settings:**
- Framework: Should auto-detect as "Next.js"
- Build Command: `next build` (or custom if needed)
- Output Directory: `.next` (for Next.js)
- Development Command: `next dev` (optional)

**Root Directory:**
- Should be `.` if Next.js is in project root
- If in monorepo (e.g., `packages/app`), set to `packages/app`

**Node.js Version:**
- Recommended: 18.x or 20.x
- Check compatibility with dependencies
- Can set in `.nvmrc` file

### Step 9.2: Environment Settings

**Check Environment Variable Configuration:**
1. Go to **Settings** → **Environment Variables**
2. Verify all variables are present
3. Ensure correct environment (Production/Preview/Development)
4. Check for typos in variable names

### Step 9.3: Git Settings

**Verify Git Configuration:**
1. Go to **Settings** → **Git**
2. Check connected repository is correct
3. Verify branch configuration (usually `main`)
4. Check deployment settings:
   - **Production Branch:** Which branch triggers production deployments?
   - **Preview Branches:** Which branches get preview deployments?
   - **Ignored Build Step:** Any special build conditions?

### Step 9.4: Deployment Protection

**Check Deployment Settings:**
1. Go to **Settings** → **Deployment Protection**
2. Verify authentication is set up if needed
3. Check branch protection rules

### Step 9.5: Custom Domains & SSL

**Verify Domain Configuration:**
1. Go to **Domains** tab
2. Check domain is properly configured
3. Verify SSL certificate is active
4. Check DNS records if using custom domain

---

## Recovery & Rollback

If deployment is broken and you need immediate recovery.

### Option 1: Revert to Previous Version

```bash
# View recent commits
git log --oneline -5

# Revert to previous working commit
git revert HEAD

# Push the revert
git push origin main
```

### Option 2: Redeploy Previous Version

1. Go to **Deployments** in Vercel
2. Find the last successful deployment
3. Click the three dots (⋯)
4. Select "Redeploy"

This restores the previous working version immediately.

### Option 3: Rollback via Git

```bash
# Reset to previous commit (destructive)
git reset --hard HEAD~1

# Or checkout specific commit
git checkout <commit-hash>

# Push changes
git push origin main --force-with-lease
```

### Option 4: Quick Hotfix

1. Create a hotfix branch:
   ```bash
   git checkout -b hotfix/deployment-issue
   ```

2. Fix the issue locally and test:
   ```bash
   npm run build && npm run start
   ```

3. Commit and create pull request:
   ```bash
   git commit -am "Fix: resolve deployment issue"
   git push origin hotfix/deployment-issue
   ```

4. Merge to main once verified

---

## Troubleshooting Decision Tree

Use this decision tree to narrow down the issue:

```
Does the app build locally?
├─ NO → Go to Phase 3 (Common Build Failures)
└─ YES
    └─ Is the error in Vercel logs?
       ├─ NO → Go to Phase 7 (Runtime Issues)
       └─ YES
           └─ What type of error?
              ├─ "Cannot find module" → Phase 4 (Dependencies)
              ├─ "SyntaxError" → Phase 3.2 (Syntax Errors)
              ├─ "Environment variable" → Phase 6 (Environment Variables)
              ├─ "Timeout" → Phase 3.4 (Memory/Timeout)
              └─ "Configuration" → Phase 5 (Configuration Issues)
```

---

## Helpful Commands Reference

```bash
# Dependency checks
npm ci                          # Clean install (recommended for CI)
npm ls                          # List all dependencies
npm audit                       # Check security vulnerabilities
npm outdated                    # Check for updates

# Build testing
npm run build                   # Build production bundle
npm run start                   # Test production build locally
npm run dev                     # Run development server
npm run lint                    # Check for linting issues

# Git operations
git status                      # Check current status
git log --oneline -5           # View recent commits
git diff                        # View uncommitted changes
git push origin main           # Push to main branch

# Vercel CLI
vercel login                    # Login to Vercel
vercel build                    # Build like Vercel would
vercel start                    # Test production build
vercel env list                 # List environment variables
```

---

## Summary

Successfully deploying Next.js to Vercel requires:

1. **Local verification** - Ensure `npm run build` and `npm run start` work locally
2. **Dependency management** - Keep dependencies up-to-date and compatible
3. **Configuration review** - Verify next.config.js and Vercel settings
4. **Environment variables** - Set all required variables in Vercel dashboard
5. **Git workflow** - Commit and push to correct branch
6. **Log analysis** - Read Vercel build logs for specific error messages
7. **Systematic debugging** - Follow the phases above for different error types

With these steps, most deployment issues can be identified and resolved quickly. If issues persist, consult Vercel's official documentation or contact their support team.

---

## Additional Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel CLI Documentation**: https://vercel.com/cli
- **Node.js Compatibility**: https://nodejs.org/en/
- **npm Registry**: https://www.npmjs.com/
