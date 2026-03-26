# Next.js Vercel Deployment: Quick Reference Card

## Before Every Deployment (5 Minutes)

```bash
# 1. Check local build succeeds
npm run build
# Expected: "✓ Compiled successfully"

# 2. Check for TypeScript/linting errors
npx tsc --noEmit
npm run lint
# Expected: No errors

# 3. Check git status
git status
# Expected: Nothing in "Changes not staged"

# 4. Verify no .env.local will be committed
cat .gitignore | grep ".env"
# Expected: Shows .env.local

# 5. Commit and push
git add .
git commit -m "feat: [description]"
git push origin main
```

---

## When Deployment Fails: Quick Diagnostics (2 Minutes)

**Step 1: Check Build Logs**
1. Vercel Dashboard → Your Project → Deployments
2. Click on failed deployment
3. Scroll to "Build Logs"
4. Find the error message
5. Note the error type

**Step 2: Categorize Error**

| If Log Contains | Go To | Command |
|-----------------|-------|---------|
| `SyntaxError` | Fix syntax in code | Check editor |
| `Cannot find module` | Install package | `npm install [pkg]` |
| `error TS` | Fix TypeScript | `npx tsc --noEmit` |
| `peer dep` | Update deps | `npm install` |
| `ENOENT` `.env` | Add env var | Check Vercel Settings |
| `exceeded timeout` | Optimize build | See TIMEOUT section |
| No clear error | See Master Guide Phase 8 | Run `npm run build` |

**Step 3: Test Locally First**
```bash
# Always reproduce locally before re-deploying
npm run build

# If fails locally, fix locally
# If passes locally, issue is environment-specific
```

**Step 4: Check Dependencies**
```bash
# Verify all deps are installed
npm install

# Check for conflicts
npm audit

# List all installed packages
npm ls
```

**Step 5: Verify Environment Variables**
```bash
# List required variables
grep -r "process.env" src/ | grep -vo "process\.env\.[A-Z_]*" | sort -u

# Create .env.local for testing
cat > .env.local << EOF
[VARIABLE_NAME]=[VALUE]
EOF

# Test locally
npm run dev
```

---

## Common Error Quick Fixes

### Error: `Cannot find module 'xyz'`
```bash
# 1. Install package
npm install xyz

# 2. Verify installation
npm list xyz

# 3. Check package.json
grep "xyz" package.json

# 4. Test build
npm run build
```

### Error: `error TS2339: Property 'X' does not exist`
```bash
# 1. Run TypeScript check
npx tsc --noEmit

# 2. Open file in error
vim src/[path-from-error]

# 3. Fix type issue (add ?, await, etc.)

# 4. Re-check
npx tsc --noEmit
```

### Error: `ENOENT: no such file or directory`
```bash
# 1. Add missing environment variable
# Vercel Dashboard → Settings → Environment Variables

# 2. Or create locally:
echo "VARIABLE_NAME=value" >> .env.local

# 3. Test locally
npm run dev

# 4. Redeploy
git push origin main
```

### Error: `Build exceeded timeout`
```bash
# 1. Optimize build time
# Edit next.config.js:

module.exports = {
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // ... other config
}

# 2. Reduce static pages
# In getStaticPaths(), return fewer pages

# 3. Remove large dependencies
npm ls | head -30  # See largest packages

# 4. Test locally
npm run build  # Check build time

# 5. Deploy
git push origin main
```

### Error: `Module not found (local file)`
```bash
# 1. Verify file exists
ls -la src/components/[FileName].jsx

# 2. Check case sensitivity (Linux is case-sensitive!)
# Should be: Header not header

# 3. Verify jsconfig.json/tsconfig.json
grep "@/\*" jsconfig.json  # or tsconfig.json

# 4. Test build
npm run build
```

---

## Vercel Environment Variable Checklist

**Required Steps:**
- [ ] List all `process.env.VARIABLE` usage
- [ ] Create `.env.local` for local testing
- [ ] Add to `.gitignore` (don't commit!)
- [ ] Add each variable to Vercel Dashboard
- [ ] Set correct environment (Production/Preview)
- [ ] Test after deploying: Visit /api/health or debug endpoint

**Public Variables (NEXT_PUBLIC_):**
- Visible in browser
- Safe for API endpoints, URLs
- Example: `NEXT_PUBLIC_STRIPE_KEY`

**Secret Variables:**
- Server-side only
- Hidden from browser
- Example: `DATABASE_PASSWORD`

---

## Vercel Project Settings Checklist

**Settings Tab → General**
- [ ] Framework: `Next.js`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: (empty)
- [ ] Install Command: `npm install`
- [ ] Node.js Version: `18.17.0` or higher

**Settings Tab → Environment Variables**
- [ ] All required variables present
- [ ] Correct values (not exposed for secrets)
- [ ] Correct environments selected

**Settings Tab → Domains**
- [ ] Domain configured
- [ ] DNS records correct (if custom domain)
- [ ] SSL certificate active

**Settings Tab → Git**
- [ ] Correct repository connected
- [ ] Correct branch (usually `main`)
- [ ] Webhook enabled

---

## Git Workflow Quick Reference

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "feat: Add new portfolio section"

# Push to Vercel (triggers deployment)
git push origin main

# View recent commits
git log --oneline -5

# Check status
git status

# If push rejected, pull first
git pull origin main
git push origin main
```

---

## Log Reading Quick Guide

**Successful Build Logs End With:**
```
✓ Ready in X.XXs
> Build complete. Summarizing build...
✓ Built successfully
```

**Failed Build Shows:**
```
ERROR: [error description]
error TS[code]: [typescript error]
SyntaxError: [syntax issue]
Cannot find module '[module-name]'
```

**To Find Root Cause:**
1. Search for first "ERROR" or "error" keyword
2. Read full error message (may span multiple lines)
3. Note file name and line number
4. Look at that exact location in code

---

## Post-Deployment Verification

**Immediately After Deployment:**

```bash
# Test homepage
curl -I https://your-domain.vercel.app

# Should return: HTTP/1.1 200 OK

# Test API endpoint
curl https://your-domain.vercel.app/api/health

# Should return JSON response

# Open in browser
# Visit: https://your-domain.vercel.app
# Check: No console errors (F12 → Console)
# Check: All images load
# Check: Navigation works
# Check: Forms submit (if any)
```

---

## Emergency Rollback

**If deployment is broken and needs immediate fix:**

**Option 1: Quick Rollback**
1. Vercel Dashboard → Deployments
2. Find last working deployment (has green ✓)
3. Click 3 dots → "Promote to Production"
4. Site is restored immediately

**Option 2: Git Revert**
```bash
# Revert last commit
git revert HEAD

# This creates a new commit that undoes changes
git push origin main

# Vercel automatically deploys the revert
```

---

## Troubleshooting Path Decision

**I see a RED X on my deployment:**
→ Go to: NEXTJS_DEPLOYMENT_MASTER_GUIDE.md Phase 3

**Build shows error but I don't understand it:**
→ Go to: TROUBLESHOOTING_DECISION_TREE.md

**App loads but something is broken:**
→ Go to: TROUBLESHOOTING_DECISION_TREE.md Section 2

**I need to test something specific:**
→ Use commands in this file

**Still stuck after trying above:**
→ Go to: NEXTJS_DEPLOYMENT_MASTER_GUIDE.md Phase 8+

---

## Testing Commands

```bash
# Test build locally
npm run build

# Test TypeScript
npx tsc --noEmit

# Test linting
npm run lint

# Test runtime locally
npm run dev

# Test API endpoint locally
curl http://localhost:3000/api/health

# View installed packages
npm list

# Check for vulnerabilities
npm audit

# Clear everything and start fresh
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Check build size
du -sh .next
du -sh node_modules

# Find specific file
find src -name "*filename*"

# Check environment variables
env | grep NEXT

# View git log
git log --oneline -10

# Check git branch
git branch -a
```

---

## Contact & Support

**Vercel Support:**
- URL: https://vercel.com/support
- Include: Deployment URL, build logs, package.json

**Next.js Community:**
- Discord: https://discord.gg/nextjs
- GitHub: https://github.com/vercel/next.js/issues
- Stack Overflow: Tag with `next.js` + `vercel`

**When Reaching Out, Include:**
1. Deployment URL
2. Last 50 lines of build logs (copy-paste)
3. `package.json` content (remove sensitive values)
4. `next.config.js` content
5. Link to GitHub repository (if public)
6. Steps you already tried

---

**Quick Reference Version**: 1.0  
**Last Updated**: 2024  
**Status**: Keep Handy During Deployments
