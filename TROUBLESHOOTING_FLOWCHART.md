# Deployment Troubleshooting Flowchart

## Main Decision Tree

```
┌─────────────────────────────────────────────────────┐
│         DEPLOYMENT FAILED - START HERE              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Check Build Logs   │
        │ in Vercel Dashboard│
        └────────┬───────────┘
                 │
         ┌───────┴────────┬──────────────┬─────────────┐
         │                │              │             │
         ▼                ▼              ▼             ▼
    ┌────────────┐ ┌──────────────┐ ┌──────────┐ ┌────────────┐
    │   Module   │ │    Syntax    │ │ Config   │ │  Timeout   │
    │   Error    │ │    Error     │ │  Error   │ │   Error    │
    └────────────┘ └──────────────┘ └──────────┘ └────────────┘
         │              │                 │            │
         │              │                 │            │
         ▼              ▼                 ▼            ▼
    [Tree 1]       [Tree 2]           [Tree 3]     [Tree 4]
```

---

## Tree 1: Module Error

```
┌──────────────────────────────────────┐
│ Error: Cannot find module 'MODULE'   │
└────────────┬───────────────────────────┘
             │
             ▼
    ┌─────────────────────────┐
    │ Which module is missing?│
    └──┬──────────┬─────────┬─┴────────┐
       │          │         │          │
       ▼          ▼         ▼          ▼
    [GSAP]   [React]    [Router]  [Other]
       │          │         │          │
       ▼          ▼         ▼          ▼
    
GSAP:
  1. Check: npm ls gsap
  2. Verify: client/package.json has gsap
  3. Fix: npm install gsap
  4. Commit: git add client/package-lock.json

React:
  1. Check: npm ls react
  2. Verify: package.json has react
  3. Run: npm install
  4. Note: React already in dependencies

Router:
  1. Check: npm ls react-router-dom
  2. Verify: package.json has dependency
  3. Fix: npm install react-router-dom
  4. Commit changes

Other:
  1. Note package name
  2. Check if in any package.json
  3. Run: npm install [package-name]
  4. Commit: git add package-lock.json files
```

---

## Tree 2: Syntax Error

```
┌────────────────────────────────────────────────┐
│ Error: SyntaxError: Unexpected token '}' at    │
│ FILE.jsx:LINE                                   │
└────────────┬─────────────────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────────┐
    │ Open the file mentioned in error         │
    │ Go to the line number shown              │
    └────────────┬─────────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────────────────────┐
    │ Check for common issues:                 │
    └──┬──────────────┬───────────┬────────────┘
       │              │           │
       ▼              ▼           ▼
    
  Missing      Unclosed      Extra
  Bracket      Quote         Character
    │              │           │
    ▼              ▼           ▼
    
Add:  Check:     Look:
{ }   " ' `      "}}}" or "{{{{"
[ ]             Missing comma
( )             Wrong character

   ▼
  Fix syntax error
   ▼
  npm run build (test locally)
   ▼
  git commit -am "Fix syntax"
   ▼
  git push
```

---

## Tree 3: Configuration Error

```
┌─────────────────────────────────────┐
│ Error: Configuration Invalid        │
│ in vercel.json or vite.config.js    │
└────────────┬───────────────────────────┘
             │
         ┌───┴───┐
         │       │
         ▼       ▼
    ┌─────────┐  ┌───────────────┐
    │vercel   │  │vite.config.js │
    │.json    │  │               │
    └────┬────┘  └────────┬──────┘
         │                │
         ▼                ▼

VERCEL.JSON:            VITE.CONFIG.JS:
1. Check JSON syntax    1. Check for errors
   - Use JSON validator    - Run locally
   - Look for quotes       - Check imports
   - Check commas          - Verify paths

2. Verify values:       2. Verify settings:
   - buildCommand ✓        - plugins ✓
   - outputDir ✓           - server.port ✓
   - installCommand ✓      - server.proxy ✓

3. Fix any issues       3. Test locally:
                           npm run build

4. Commit changes       4. Commit & push
   git push
```

---

## Tree 4: Timeout Error

```
┌──────────────────────────────────────┐
│ Error: Build timed out               │
│ Build took > 45 minutes              │
└────────────┬───────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────┐
    │ Check what caused timeout:       │
    └──┬──────┬────────────┬───────────┘
       │      │            │
       ▼      ▼            ▼
    
  Large    Infinite     Slow
  Files    Loop         Tasks
    │         │           │
    ▼         ▼           ▼
    
1. Check        1. Review    1. Check
   .vercelignore   build        build
                   scripts      scripts
2. Exclude       2. Look for  2. Remove
   node_modules     loops        heavy
                                 deps
3. Exclude       3. Fix       3. Optimize
   dist           code           code
   build
                 4. Test      4. Simplify
4. Remove        locally         build
   unused
   files

   All:
   ▼
   npm run build (test locally)
   ▼
   Verify completes < 2 min
   ▼
   Commit & push
```

---

## Diagnostic Commands

### Quick Check
```bash
# 1. Dependencies OK?
npm ls

# 2. GSAP installed?
npm ls gsap

# 3. Can build locally?
npm run build

# 4. Any lint errors?
npm run lint (if available)

# 5. Check git status
git status
```

### Detailed Diagnosis
```bash
# 1. Full dependency audit
npm audit

# 2. Check for missing files
ls client/src/components/portfolio/
ls client/src/pages/PortfolioPage.jsx
ls client/public/*.jpg

# 3. Check build output
ls -la client/dist/

# 4. Verify package versions
npm ls react react-dom gsap

# 5. Check lock file
git ls-files | grep package-lock.json
```

### Fix and Deploy
```bash
# 1. Clean install
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm install
cd client && npm install

# 2. Build test
npm run build

# 3. Commit
git add .
git commit -m "Fix: resolve build errors"

# 4. Deploy
git push origin portfolio-webpage-design
```

---

## Common Fixes by Error Message

| Error Message | Solution | Command |
|---------------|----------|---------|
| `Cannot find module 'gsap'` | Install GSAP | `npm install gsap` |
| `Cannot find module './components/portfolio/...'` | Check file exists and path | `ls client/src/components/portfolio/` |
| `SyntaxError: Unexpected token` | Fix syntax in file | Fix file, then `npm run build` |
| `Module '@hookform/resolvers' not found` | Install missing dependency | `npm install @hookform/resolvers` |
| `Failed to compile: TypeScript error` | Fix TS errors | Check file, fix, run build |
| `vercel.json is invalid` | Fix JSON syntax | Check brackets, quotes, commas |
| `Build timed out` | Optimize build | Check .vercelignore, remove large files |
| `Cannot GET /portfolio` | Check routing | Verify React Router config |
| `SyntaxError: Unexpected token '}'` | Find extra bracket | Look at line number, check context |
| `ENOENT: no such file or directory` | File missing | Check path, verify file exists |

---

## Quick Decision Matrix

```
┌─────────────────┬────────────┬─────────────────────┐
│ Error Type      │ Quick Check │ Next Step           │
├─────────────────┼────────────┼─────────────────────┤
│ Module Missing  │ npm ls X   │ npm install X       │
│ Syntax Error    │ Check line │ Fix syntax, rebuild │
│ Config Error    │ Validate   │ Fix vercel.json     │
│ Path Error      │ ls file    │ Check case, path    │
│ Timeout         │ Check logs │ Optimize build      │
│ Env Var         │ Check vars │ Add to Vercel       │
│ Image 404       │ ls public  │ Add to public/      │
│ Route Missing   │ Check App  │ Add route           │
└─────────────────┴────────────┴─────────────────────┘
```

---

## When to Check Each Resource

| Issue | Check First | Check Next | Check Last |
|-------|------------|-----------|------------|
| Build Error | Build logs | Local npm run build | vercel.json |
| Module Error | package.json | node_modules | package-lock.json |
| Syntax Error | Error line | File context | ESLint output |
| 404 Error | Browser console | File paths | Image locations |
| Performance | Build duration | Bundle size | Vite config |
| Route Error | React Router | App.jsx | Vercel rewrites |

---

## Success Indicators Checklist

After each fix, verify:

- [ ] **Build completes** without errors
- [ ] **No red warnings** in build log
- [ ] **Status shows "Ready"** in Vercel
- [ ] **Page loads** at deployment URL
- [ ] **No 404 errors** in browser console
- [ ] **Images display** correctly
- [ ] **Routes work** (click links)
- [ ] **Mobile responsive** (test on phone)
- [ ] **Performance acceptable** (< 3s load)

If any checkbox fails, go back to troubleshooting tree.

---

## Emergency Rollback

If current deployment is broken:

```bash
# 1. Find last working deployment in Vercel
Deployments tab → Look for green checkmark

# 2. Promote to production
Click dots → "Promote to Production"

# OR rollback code to last working commit:
git log --oneline
git revert [commit-hash]
git push
```

---

**Use this flowchart to systematically diagnose and fix deployment issues.**

**Document Version:** 1.0  
**Last Updated:** March 26, 2026
