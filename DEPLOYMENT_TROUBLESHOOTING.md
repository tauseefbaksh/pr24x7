# Next.js Deployment Troubleshooting Guide

## Overview
This comprehensive guide helps diagnose and resolve deployment failures for Next.js applications on Vercel and other platforms. Common causes include build errors, configuration issues, missing dependencies, and environment variable problems.

---

## Phase 1: Initial Diagnosis

### Step 1.1: Check Deployment Status Dashboard
**Action Items:**
- Navigate to your Vercel project dashboard
- Look for the "No successful deploy yet" message
- Review recent deployment attempts and their timestamps
- Note error indicators (red badges) next to deployment entries
- Check the deployment status: Preview vs Production environment

**What to Look For:**
- How many consecutive failed deployments?
- When did the last successful deployment occur?
- Are errors consistent across environments?

### Step 1.2: Access Deployment Error Logs
**Action Items:**
1. Click on the failed deployment entry
2. Look for tabs: "Logs", "Function Logs", "Build Logs"
3. Scroll through the entire build log to find error messages
4. Copy the complete error stack trace

**Common Error Messages to Identify:**
- `SyntaxError: Unexpected token` → Code syntax errors
- `Module not found` → Missing dependencies or import paths
- `Cannot find module` → Incorrect file paths or missing packages
- `ENOENT: no such file or directory` → File/folder doesn't exist
- `Error: EACCES: permission denied` → Permission issues
- `Error: PORT already in use` → Port binding issues

---

## Phase 2: Systematic Issue Identification

### Step 2.1: Build Error Analysis

**Category A: Syntax Errors**
```
❌ SyntaxError: Unexpected token '}'
```
**Solution:**
- Check the file path mentioned in the error
- Verify closing brackets, parentheses, quotes
- Use ESLint locally: `npm run lint`
- Check for missing semicolons or commas
- Verify JSX syntax (closing tags, valid attributes)

**Category B: Module/Import Errors**
```
❌ Error: Cannot find module './components/Header'
❌ error - ./src/pages/PortfolioPage.jsx:5:0 - Module not found
```
**Solution:**
- Verify the file exists at the specified path
- Check case sensitivity (Linux servers are case-sensitive)
- Verify file extensions (.jsx, .js, .ts, .tsx)
- Check relative vs absolute imports
- Ensure re-exports in index files exist

**Category C: Dependency Errors**
```
❌ Error: Cannot find module 'gsap'
❌ Module '@hookform/resolvers' not found
```
**Solution:**
- Run `npm install` or `yarn install` locally
- Verify package.json includes the dependency
- Check for version conflicts (use `npm ls`)
- Ensure lock file (package-lock.json, yarn.lock) is committed
- Look for optional peer dependency warnings

**Category D: Configuration Errors**
```
❌ Failed to compile: TypeScript errors
❌ next.config.js configuration invalid
```
**Solution:**
- Validate next.config.js syntax
- Check tsconfig.json for TypeScript issues
- Verify tailwind.config.js syntax
- Look for circular dependencies
- Ensure all config paths are correct

### Step 2.2: Environment Variable Verification

**Action Items:**
1. Go to Vercel project settings → Environment Variables
2. Check if all required variables are set
3. Verify variable names match exactly (case-sensitive)
4. For Vercel, check separate .env files:
   - `.env.local` (local development)
   - `.env.production` (production deployment)
   - `.env.preview` (preview deployments)

**Common Environment Variable Issues:**
```
Issue: Missing API_KEY variable
Solution:
- In Vercel dashboard: Settings → Environment Variables
- Add variable: API_KEY = your_actual_key
- Ensure it's added to the correct environment
- Redeploy after adding variables
```

---

## Phase 3: Dependency and Version Management

### Step 3.1: Verify Dependencies Are Installed

**Local Verification:**
```bash
# List all dependencies
npm list

# Check for missing dependencies
npm install --check-files

# Verify specific package version
npm ls react

# Look for duplicate dependencies
npm dedupe
```

**Common Dependency Issues:**
- **Peer Dependency Warnings**: May cause runtime errors
  - Solution: Check package.json peer dependency requirements
  - Install compatible version
  
- **Version Conflicts**: Different versions of same package
  - Solution: Use `npm audit` to identify issues
  - Run `npm audit fix` for automatic fixes
  
- **Missing Lock File**: Inconsistent installations across environments
  - Solution: Commit package-lock.json or yarn.lock to git
  - Never use both npm and yarn in same project

### Step 3.2: Check Package Compatibility

**Action Items:**
1. Review package.json for dependency versions
2. Check major version numbers for breaking changes
3. Verify React and Next.js version compatibility
4. Look for deprecated packages

**Example Version Check:**
```json
{
  "dependencies": {
    "react": "^18.2.0",      // Must match Next.js requirements
    "next": "^14.0.0",        // Check compatibility
    "gsap": "^3.12.2",       // Ensure not deprecated
    "tailwindcss": "^3.0.0"  // Check for major version upgrades
  }
}
```

---

## Phase 4: Build Configuration Review

### Step 4.1: Verify Next.js Configuration

**Check next.config.js:**
```javascript
// Verify these don't have syntax errors
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Check for invalid options
  experimental: {
    // Some experimental features may cause issues
  }
}
```

**Common next.config.js Issues:**
- Invalid webpack configurations
- Incorrect image optimization settings
- Failed environment variable imports
- Circular require statements

### Step 4.2: Verify Tailwind/CSS Configuration

**tailwind.config.js Checks:**
- Verify content paths are correct
- Check for invalid color definitions
- Ensure theme extensions are valid
- Look for plugin syntax errors

**Example Issue:**
```javascript
// ❌ WRONG: Invalid color value
colors: {
  primary: '#1e3a5f'  // Missing quotes around hex
}

// ✅ CORRECT:
colors: {
  primary: '#1e3a5f'  // Properly quoted
}
```

---

## Phase 5: Platform-Specific Troubleshooting (Vercel)

### Step 5.1: Vercel Build Settings

**Check Project Settings:**
1. Settings → Git
   - Verify correct branch is set
   - Check "Deploy on push" is enabled

2. Settings → Build & Development Settings
   - Framework: Should be "Next.js"
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install` or `yarn install`

**Example Custom Configuration:**
```
Build Command: npm run build
Install Command: npm ci (more reliable in CI/CD)
Output Directory: .next
Root Directory: ./client (if monorepo)
```

### Step 5.2: Environment Variables in Vercel

**Setup Steps:**
1. Go to Settings → Environment Variables
2. Add variables for each environment:
   - Development
   - Preview
   - Production
3. Click "Save"
4. Trigger a new deployment

**Important Notes:**
- Changes to env vars require redeployment
- Variables starting with `NEXT_PUBLIC_` are public
- Variables without prefix are server-only
- Sensitive keys (API keys, passwords) should NOT be public

### Step 5.3: Vercel Deployment Triggers

**After Fixing Issues:**
1. Commit changes to git
2. Push to your branch: `git push origin branch-name`
3. Vercel automatically redeploys on push
4. Or manually: Project → Deployments → Redeploy

---

## Phase 6: Local Testing Before Deployment

### Step 6.1: Reproduce Build Locally

**Commands:**
```bash
# Clean install
rm -rf node_modules
npm install

# Test build process
npm run build

# Check for warnings
npm run lint

# Test production build locally
npm run build
npm run start
```

**What to Check:**
- Build completes without errors
- No console errors in build output
- No TypeScript errors (if using TypeScript)
- Warnings that might fail in CI/CD

### Step 6.2: Test Environment Variables Locally

**Create .env.local for testing:**
```
DATABASE_URL=your_test_database
API_KEY=your_test_key
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

**Verify in Application:**
```javascript
// In a test component
console.log("[v0] Env vars loaded:", process.env.API_KEY)
```

---

## Phase 7: Common Fixes Checklist

### Build-Related
- [ ] Fix syntax errors in .js, .jsx, .ts, .tsx files
- [ ] Correct import paths (case sensitivity, file extensions)
- [ ] Remove circular dependencies
- [ ] Update deprecated packages
- [ ] Fix TypeScript type errors
- [ ] Validate next.config.js syntax

### Dependency-Related
- [ ] Run `npm install` to ensure all deps are present
- [ ] Run `npm audit` and address security issues
- [ ] Check package.json for correct versions
- [ ] Verify lock file is committed
- [ ] Remove node_modules and reinstall if corrupted

### Configuration-Related
- [ ] Verify all environment variables are set in Vercel
- [ ] Check Vercel build settings match your project
- [ ] Validate Tailwind/CSS configuration
- [ ] Ensure output directory is correct
- [ ] Verify build and start commands

### Environment Variable-Related
- [ ] Add all required variables to Vercel dashboard
- [ ] Check variable name spelling (case-sensitive)
- [ ] Verify values are correctly set
- [ ] Redeploy after adding/changing variables
- [ ] Check NEXT_PUBLIC_ prefix for public variables

---

## Phase 8: Debugging Techniques

### Step 8.1: Enable Verbose Logging

**Add to package.json scripts:**
```json
{
  "scripts": {
    "build:debug": "npm run build -- --debug",
    "build:verbose": "DEBUG=* npm run build"
  }
}
```

### Step 8.2: Use Console Logging

**Add temporary debug logs:**
```javascript
console.log("[v0] Checking module import:", typeof MyComponent)
console.log("[v0] Environment loaded:", process.env.API_KEY)
console.log("[v0] File system check:", process.cwd())
```

**Remove after debugging** is complete.

### Step 8.3: Check Stack Trace

When viewing error logs:
1. Find the first "at" line showing your code
2. Go to that file and line number
3. Read context before and after that line
4. Understand what the code is trying to do
5. Fix the underlying issue, not just the symptom

---

## Phase 9: Advanced Troubleshooting

### Step 9.1: Monorepo Issues

If using a monorepo structure:
- Ensure "Root Directory" is set correctly in Vercel
- Set correct build command (e.g., `npm run build --workspace=client`)
- Verify relative imports between packages

### Step 9.2: Performance and Timeout Issues

**Symptoms:** Deployment times out or is very slow

**Solutions:**
- Remove large unnecessary node_modules
- Optimize build process
- Check for infinite loops in build scripts
- Verify no huge files are being processed

### Step 9.3: Static Generation and ISR Issues

**Check for getStaticProps/getServerSideProps errors:**
- Ensure these functions only run on server
- Verify data fetching logic
- Check for environment variable dependencies

---

## Phase 10: Escalation and Recovery

### Step 10.1: If All Else Fails

1. **Check Vercel Status Page**: https://www.vercel.com/status
2. **Review GitHub Issues**: Search project repo issues
3. **Contact Support**: Vercel dashboard → Support → Create Ticket
4. **Rollback**: Deploy an older known-working commit

### Step 10.2: Preventive Measures

- Always test locally before pushing
- Set up GitHub Actions for CI/CD testing
- Use pre-commit hooks (Husky) to catch errors early
- Keep dependencies up to date
- Monitor deployment logs regularly

---

## Quick Reference: Error Resolution Flowchart

```
Deployment Failed
    ↓
Check Build Logs
    ├─ Syntax Error → Fix code syntax
    ├─ Module Not Found → Verify imports & paths
    ├─ Dependency Missing → npm install
    ├─ Config Error → Fix next.config.js
    └─ Env Var Missing → Add to Vercel dashboard
    ↓
Run Locally: npm run build
    ├─ Works Locally → Check env vars in Vercel
    └─ Fails Locally → Fix the issue
    ↓
Commit & Push Changes
    ↓
Monitor Vercel Deployment
    ↓
Success ✓
```

---

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Community**: https://vercel.com/community
- **Deploy Logs Deep Dive**: Vercel Dashboard → Deployments → Select Build

---

**Last Updated**: March 2026
**Version**: 1.0
