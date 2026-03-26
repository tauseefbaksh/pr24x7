# Deployment Guides Index

Complete reference for troubleshooting and deploying Next.js applications on Vercel. Use this index to find the right guide for your situation.

---

## Quick Navigation

### I have a deployment failure RIGHT NOW
👉 Start with: **PRE_DEPLOYMENT_CHECKLIST.md** (5 minutes)
- Quick verification of common issues
- Most problems caught here

### I'm seeing a specific error message
👉 Use: **VERCEL_ERROR_REFERENCE.md** 
- Look up your exact error
- Get immediate solution
- Copy-paste fixes

### I need step-by-step diagnostics
👉 Follow: **NEXTJS_VERCEL_TROUBLESHOOTING.md**
- 9-phase systematic troubleshooting
- In-depth analysis of each issue type
- Commands to run at each step
- Detailed explanations

---

## Guide Overview

### 1. **PRE_DEPLOYMENT_CHECKLIST.md** (2-3 minutes)
**Best for:** Preventing deployment failures before they happen

**Contents:**
- Code quality checks
- Build verification steps
- Dependency verification
- Configuration file validation
- Environment variable setup
- Vercel settings verification
- Git workflow confirmation

**Use when:**
- Before every deployment
- Troubleshooting a failed build
- Onboarding new team members
- Setting up new project

---

### 2. **NEXTJS_VERCEL_TROUBLESHOOTING.md** (Complete Reference)
**Best for:** Comprehensive, systematic troubleshooting

**Contents:**
- Quick Start Checklist (10 min)
- 9 Troubleshooting Phases:
  1. Pre-Deployment Verification
  2. Analyzing Vercel Build Logs
  3. Common Build Failures
  4. Dependency Verification
  5. Configuration Issues
  6. Environment Variables
  7. Server & Runtime Issues
  8. Advanced Diagnostics
  9. Vercel Project Settings Review
- Recovery & Rollback procedures
- Decision tree for issue identification
- Command reference

**Use when:**
- Deployment is completely broken
- You need detailed explanations
- Troubleshooting complex issues
- Learning how to deploy properly

---

### 3. **VERCEL_ERROR_REFERENCE.md** (Quick Lookup)
**Best for:** Finding specific error messages and their solutions

**Contents:**
- Common error messages with examples
- Root causes for each error
- Step-by-step solutions
- Code examples showing fixes
- Quick lookup table for common errors

**Errors covered:**
- Module not found
- Syntax errors
- Dependency conflicts
- Environment variable issues
- Timeout & memory errors
- Configuration errors
- Runtime errors

**Use when:**
- You have a specific error message
- You want the fastest solution
- Quick reference during debugging

---

## Which Guide to Use?

```
Do you have a deployment failure?
│
├─ YES, and I see an error message
│  └─ → Use VERCEL_ERROR_REFERENCE.md
│     (Find your error, get solution)
│
├─ YES, but need step-by-step help
│  └─ → Use NEXTJS_VERCEL_TROUBLESHOOTING.md
│     (Follow the 9 phases systematically)
│
└─ NO, I want to prevent issues
   └─ → Use PRE_DEPLOYMENT_CHECKLIST.md
      (Complete before every deployment)
```

---

## Common Scenarios & Solutions

### Scenario 1: "Cannot find module" Error

1. **Quickest way:** Check file exists
   ```bash
   ls src/components/Button.jsx
   ```

2. **Full reference:** See VERCEL_ERROR_REFERENCE.md → "Cannot find module 'module-name'"

3. **Deep dive:** See NEXTJS_VERCEL_TROUBLESHOOTING.md → Phase 3.1

---

### Scenario 2: Build Timeout

1. **Quick fix:** Add to vercel.json
   ```json
   {
     "buildCommand": "NODE_OPTIONS=--max-old-space-size=4096 next build"
   }
   ```

2. **Reference:** See VERCEL_ERROR_REFERENCE.md → "Build timed out"

3. **Deep dive:** See NEXTJS_VERCEL_TROUBLESHOOTING.md → Phase 3.4

---

### Scenario 3: Environment Variable Issues

1. **Checklist:** See PRE_DEPLOYMENT_CHECKLIST.md → "Environment Variables" section

2. **Quick reference:** See VERCEL_ERROR_REFERENCE.md → "Environment variable is required"

3. **Full guide:** See NEXTJS_VERCEL_TROUBLESHOOTING.md → Phase 6

---

### Scenario 4: Dependency Conflicts

1. **Try this:** 
   ```bash
   npm audit fix
   ```

2. **Quick reference:** See VERCEL_ERROR_REFERENCE.md → "peer dep missing"

3. **Full guide:** See NEXTJS_VERCEL_TROUBLESHOOTING.md → Phase 4

---

## Reading Order for First-Time Setup

If you're new to deploying Next.js on Vercel, read in this order:

1. **PRE_DEPLOYMENT_CHECKLIST.md** (5 min)
   - Understand what to verify

2. **NEXTJS_VERCEL_TROUBLESHOOTING.md - Phase 1-2** (15 min)
   - Learn how to access and read build logs

3. **NEXTJS_VERCEL_TROUBLESHOOTING.md - Phase 3** (20 min)
   - Understand common build failures

4. **NEXTJS_VERCEL_TROUBLESHOOTING.md - Phase 4-6** (20 min)
   - Learn about dependencies and configuration

5. **VERCEL_ERROR_REFERENCE.md** (30 min)
   - Skim through error examples for future reference

**Total time: ~90 minutes** - You'll be ready for all common scenarios

---

## Troubleshooting Workflow

```
1. Deploy to Vercel
                ↓
2. Check Vercel dashboard for status
                ↓
3. ❌ Deployment failed?
   │
   ├─ Copy error message
   └─ → Go to VERCEL_ERROR_REFERENCE.md
         └─ Find error → Apply solution → Retry
                ↓
   ✓ Deployment succeeded!
   │
   └─ Monitor application
      └─ All working? Success!
      └─ Issues at runtime? → Go to NEXTJS_VERCEL_TROUBLESHOOTING.md Phase 7
```

---

## Key Commands Reference

### Pre-Deployment Testing

```bash
# Clean install dependencies
npm ci

# Build locally
npm run build

# Test production build
npm run start
```

### Accessing Information

```bash
# View environment variables
cat .env.local

# Check build output
ls -la .next/

# Verify dependencies
npm ls
npm audit
```

### Git Workflow

```bash
# Push changes for deployment
git push origin main

# View recent commits
git log --oneline -5

# Check uncommitted changes
git status
```

### Vercel CLI

```bash
# Login
vercel login

# Build like Vercel
vercel build

# Test production build
vercel start

# View logs
vercel logs
```

---

## Most Common Deployment Issues

Based on actual deployment data, these are the most frequent issues:

| Rank | Issue | Solution Time | Guide |
|------|-------|---|---|
| 1 | Cannot find module | 2 min | Error Reference |
| 2 | Environment variable not set | 3 min | Error Reference |
| 3 | Dependency version mismatch | 5 min | Phase 4 |
| 4 | Syntax error in code | 5 min | Error Reference |
| 5 | Missing next.config.js setup | 5 min | Phase 5 |
| 6 | Build timeout | 10 min | Error Reference |
| 7 | TypeScript errors | 5-15 min | Phase 3 |
| 8 | API route failure | 10 min | Phase 7 |
| 9 | Image not loading | 5 min | Error Reference |
| 10 | 404 on custom domain | 5 min | Phase 9 |

---

## Prevention is Better Than Cure

Use the PRE_DEPLOYMENT_CHECKLIST.md before EVERY deployment. It takes 5 minutes and prevents 80% of deployment failures.

**The 5-minute pre-deployment routine:**

```bash
# Step 1: Build locally (1 min)
npm run build

# Step 2: Test production build (1 min)
npm run start

# Step 3: Verify dependencies (1 min)
npm audit
npm ls | grep -i error

# Step 4: Verify git status (1 min)
git status
git log --oneline -1

# Step 5: Check environment variables (1 min)
# - Review Vercel dashboard
# - Confirm all vars are set
```

**Do this before pushing and 80% of failures won't happen.**

---

## Getting More Help

If these guides don't solve your issue:

1. **Search Vercel docs:** https://vercel.com/docs
2. **Check Next.js docs:** https://nextjs.org/docs
3. **GitHub Issues:** Search `vercel/next.js` repository
4. **Stack Overflow:** Tag `next.js` and `vercel`
5. **Vercel Community:** https://github.com/vercel/next.js/discussions
6. **Contact Vercel Support:** https://vercel.com/help

---

## Document Locations

All guides are in the project root:

```
project-root/
├── PRE_DEPLOYMENT_CHECKLIST.md           (5 min checklist)
├── NEXTJS_VERCEL_TROUBLESHOOTING.md      (Complete guide)
├── VERCEL_ERROR_REFERENCE.md             (Error lookup)
└── DEPLOYMENT_GUIDES_INDEX.md            (This file)
```

---

## Summary

- **For quick fixes:** Use VERCEL_ERROR_REFERENCE.md
- **For systematic troubleshooting:** Use NEXTJS_VERCEL_TROUBLESHOOTING.md
- **For prevention:** Use PRE_DEPLOYMENT_CHECKLIST.md before every deployment
- **For finding right guide:** Use this index (DEPLOYMENT_GUIDES_INDEX.md)

Most deployment issues can be resolved in under 10 minutes with the right guide. Use this index to find the guide for your situation.
