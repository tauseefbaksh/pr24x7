# Next.js Vercel Deployment: Troubleshooting Decision Tree

## Quick Diagnosis Flowchart

```
START: Deployment Failed?
  │
  ├─────────────────────────────────────────────────────┐
  │                                                         │
  ├─→ Is the build status RED (failed)?                   │
  │   │                                                     │
  │   ├─→ YES → GO TO: BUILD FAILURE SECTION              │
  │   │                                                     │
  │   └─→ NO → Continue to next check                     │
  │                                                         │
  ├─→ Is there a checkmark (built successfully)?          │
  │   │                                                     │
  │   ├─→ YES → GO TO: RUNTIME ISSUES SECTION             │
  │   │                                                     │
  │   └─→ NO → Deployment still in progress              │
  │                                                         │
  └─────────────────────────────────────────────────────┘
```

---

## Section 1: Build Failure Diagnosis

```
BUILD FAILED?
  │
  ├─────────────────────────────────────────────────────────────────┐
  │                                                                     │
  ├─→ Check Error Message in Logs
  │   │
  │   ├─→ Contains "SyntaxError" or "Unexpected token"?
  │   │   │
  │   │   ├─→ YES → SYNTAX ERROR SECTION (Step 1)
  │   │   └─→ NO → Continue
  │   │
  │   ├─→ Contains "Cannot find module" or "Module not found"?
  │   │   │
  │   │   ├─→ YES → MISSING MODULE SECTION (Step 2)
  │   │   └─→ NO → Continue
  │   │
  │   ├─→ Contains "error TS" (TypeScript error)?
  │   │   │
  │   │   ├─→ YES → TYPESCRIPT ERROR SECTION (Step 3)
  │   │   └─→ NO → Continue
  │   │
  │   ├─→ Contains "peer dep" or "version"?
  │   │   │
  │   │   ├─→ YES → DEPENDENCY SECTION (Step 4)
  │   │   └─→ NO → Continue
  │   │
  │   ├─→ Contains "ENOENT" or ".env"?
  │   │   │
  │   │   ├─→ YES → ENVIRONMENT VARIABLE SECTION (Step 5)
  │   │   └─→ NO → Continue
  │   │
  │   ├─→ Contains timeout or exceeded time?
  │   │   │
  │   │   ├─→ YES → BUILD TIMEOUT SECTION (Step 6)
  │   │   └─→ NO → Continue
  │   │
  │   └─→ No clear error message?
  │       │
  │       └─→ UNCLEAR ERROR SECTION (Step 7)
  │
  └─────────────────────────────────────────────────────────────────┘
```

---

## STEP 1: Syntax Error Resolution

```
SYNTAX ERROR DETECTED
Error: "SyntaxError: Unexpected token"
Location: [file.jsx:line]
│
├─→ IMMEDIATE ACTION:
│   1. Open file in editor: src/pages/[file].jsx
│   2. Go to specified line number
│   3. Look for:
│      - Missing closing bracket: )}
│      - Missing colon: ? vs :
│      - Missing quotes: "string"
│      - Improper JSX: <div> vs {<div>}
│
├─→ VERIFICATION:
│   Run locally: npm run build
│   Expected: No "SyntaxError" in output
│
├─→ COMMON FIXES TABLE:
│   ├─ Missing bracket: Add }
│   ├─ Missing quote: Add "
│   ├─ Wrong operator: Change = to ==
│   ├─ JSX error: Check <Tag></Tag> balanced
│   └─ Export issue: Change export X to export default X
│
└─→ RESOLUTION:
    1. Fix syntax in code
    2. Save file
    3. Run: npm run build
    4. If successful → Commit and push
       If still failing → Go to STEP 7
```

---

## STEP 2: Missing Module Resolution

```
MISSING MODULE DETECTED
Error: "Cannot find module '[module-name]'"
│
├─→ DETERMINE MODULE TYPE:
│   │
│   ├─→ Is it a package (e.g., "react", "lodash")?
│   │   │
│   │   ├─→ YES → GO TO SUBSECTION 2A (Package)
│   │   │
│   │   └─→ NO → Continue
│   │
│   └─→ Is it a local file (e.g., "./components/Button")?
│       │
│       ├─→ YES → GO TO SUBSECTION 2B (Local File)
│       │
│       └─→ NO → Unknown import type
│
└─→ RESOLUTION:
    (Continue to appropriate subsection below)

═════════════════════════════════════════════════════════

SUBSECTION 2A: Missing Package Module

Error: "Cannot find module 'axios'"
│
├─→ VERIFY INSTALLATION:
│   Run: npm list axios
│   │
│   ├─→ Shows installed? → Check version compatibility
│   ├─→ Shows "unmet"? → Install it
│   └─→ Not found? → Install it
│
├─→ INSTALL THE PACKAGE:
│   npm install axios
│   npm list axios  (verify)
│
├─→ VERIFY package.json:
│   Check that "axios" appears in dependencies
│   git diff package.json  (should show +axios)
│
├─→ REBUILD AND TEST:
│   npm run build
│   If successful → git add . && git commit && git push
│   If failing → Check if package works locally
│
└─→ IF STILL FAILING:
    ├─ Version conflict? Try: npm install axios@latest
    ├─ Peer dep issue? Try: npm install --legacy-peer-deps
    └─ Clear cache: rm -rf node_modules && npm install

═════════════════════════════════════════════════════════

SUBSECTION 2B: Missing Local File

Error: "Cannot find module '@/components/Header'"
│
├─→ VERIFY FILE EXISTS:
│   File path should be: src/components/Header.jsx
│   Run: ls -la src/components/Header.jsx
│   │
│   ├─→ File exists → Check path configuration
│   ├─→ File not found → Check file name/location
│   └─→ Wrong extension? → Has .tsx instead of .jsx?
│
├─→ CHECK IMPORT PATH:
│   ├─ Using "@/" alias?
│     Check jsconfig.json or tsconfig.json
│     │
│     └─ Should have: "@/*": ["src/*"]
│   │
│   ├─ Using relative path?
│     Example: import { Header } from '../components/Header'
│     Count dots: ../ means go up one directory
│   │
│   └─ Using absolute path?
│     Full path from project root
│
├─→ CASE SENSITIVITY CHECK:
│   Linux/Mac: Case matters! Header ≠ header
│   Windows: Case usually doesn't matter
│   │
│   ├─→ File named "Header.jsx" but importing "header"?
│   │   Fix: Change import to match exact case
│   │
│   └─→ Filename has multiple extensions?
│       Example: "Component.page.jsx"
│       Import: from "./Component.page"
│
├─→ REBUILD AND TEST:
│   npm run build
│   If successful → Commit and push
│   If failing → Double-check all paths
│
└─→ DEBUGGING COMMAND:
    find src -name "*Header*" | head -20
    (shows all files matching "Header")
```

---

## STEP 3: TypeScript Error Resolution

```
TYPESCRIPT ERROR DETECTED
Error: "error TS[code]: Property 'X' does not exist..."
│
├─→ ERROR CATEGORIES:
│   │
│   ├─ Property not found: TS2339
│   │  └─ Object doesn't have expected property
│   │
│   ├─ Type mismatch: TS2345
│   │  └─ Wrong type passed to function
│   │
│   ├─ Module not found: TS2307
│   │  └─ Can't resolve import path
│   │
│   └─ Async/await: TS2345
│      └─ Async function not awaited
│
├─→ IMMEDIATE FIX STEPS:
│   1. Open file specified in error: src/file.ts:line:col
│   2. Read error message carefully
│   3. Check type definition in tsconfig.json
│   4. Identify problem type (see above)
│   5. Apply appropriate fix (see below)
│
├─→ COMMON TYPESCRIPT FIXES:
│   │
│   ├─ Missing await for async function:
│   │  Before: const data = response.json();
│   │  After:  const data = await response.json();
│   │
│   ├─ Property doesn't exist:
│   │  Before: user.name
│   │  After:  user?.name or if (user) user.name
│   │
│   ├─ Wrong function type:
│   │  Before: function myFunc(x: string) { }
│   │           myFunc(123);  // ERROR: number ≠ string
│   │  After:  myFunc("hello");
│   │
│   ├─ Missing type definition:
│   │  Before: function getUser(id) { }
│   │  After:  function getUser(id: string) { }
│   │
│   └─ Interface type mismatch:
│      Before: const obj: MyInterface = { x: 1 };  // Missing y
│      After:  const obj: MyInterface = { x: 1, y: 2 };
│
├─→ VERIFY FIX:
│   Run: npx tsc --noEmit
│   Should show: No error TS messages
│
└─→ REBUILD:
    npm run build → Should succeed
    If still errors → Re-read error message carefully
```

---

## STEP 4: Dependency Conflict Resolution

```
DEPENDENCY CONFLICT DETECTED
Symptoms:
- "peer dependency" warning
- "version conflict" message
- "incompatible" in error
│
├─→ IDENTIFY THE CONFLICT:
│   Grep for the error: grep -r "peer" vercel.log
│   Should show which packages conflict
│
├─→ RESOLUTION STRATEGY:
│   │
│   ├─ Option A: Update both packages to compatible versions
│   │  1. Run: npm install [package-name]@latest
│   │  2. Run: npm install
│   │  3. Test: npm run build
│   │
│   ├─ Option B: Use legacy peer deps flag (quick fix)
│   │  1. Run: npm install --legacy-peer-deps
│   │  2. Test: npm run build
│   │  3. Document in package.json:
│   │     "npm": {
│   │       "engine-strict": false
│   │     }
│   │
│   └─ Option C: Remove and reinstall all deps
│      1. rm -rf node_modules package-lock.json
│      2. npm install
│      3. npm run build
│
├─→ VERIFICATION:
│   npm audit (check for vulnerabilities)
│   npm ls (check for duplicate versions)
│
└─→ COMMIT:
    git add package*.json
    git commit -m "Update dependencies"
    git push origin main
```

---

## STEP 5: Environment Variable Resolution

```
ENVIRONMENT VARIABLE ERROR DETECTED
Symptoms:
- "ENOENT: no such file or directory"
- "undefined" in error
- ".env not found"
│
├─→ IDENTIFY REQUIRED VARIABLES:
│   Run: grep -r "process.env" src/ | grep -v node_modules
│   Lists all variables used in code
│
├─→ CHECK LOCAL SETUP:
│   1. Create file: .env.local
│   2. Add all variables:
│      DATABASE_URL=postgresql://...
│      API_KEY=sk_...
│      NEXT_PUBLIC_API_URL=https://...
│   3. Test locally: npm run dev
│
├─→ ADD TO VERCEL:
│   Via Dashboard:
│   1. Vercel Dashboard → Settings → Environment Variables
│   2. For each variable:
│      - Key: [VARIABLE_NAME]
│      - Value: [actual value]
│      - Environments: Production, Preview
│   3. Click "Save"
│
│   Via CLI:
│   vercel env add DATABASE_URL
│   (prompts for value)
│
├─→ VERIFY IN VERCEL:
│   1. Click on variable
│   2. Confirm:
│      ✓ Environment set to Production
│      ✓ Environment set to Preview
│      ✓ Value is not exposed (shows ••••)
│
├─→ REDEPLOY:
│   vercel --prod
│   (environment variables are loaded)
│
└─→ TEST:
    Create debug page: pages/api/debug-env.js
    Return: { hasVar: !!process.env.VAR_NAME }
    Delete after testing
```

---

## STEP 6: Build Timeout Resolution

```
BUILD TIMEOUT DETECTED
Error: "Build exceeded 45 minutes"
│
├─→ IDENTIFY SLOW PARTS:
│   Run locally: time npm run build
│   Note which stage takes longest:
│   - Installing dependencies (npm install)
│   - Building code (next build)
│   - Optimizing images
│   - Generating static pages
│
├─→ OPTIMIZATION STRATEGIES:
│   │
│   ├─ Reduce static pages:
│   │  // pages/products/[id].js
│   │  export async function getStaticPaths() {
│   │    return {
│   │      paths: [],  // Start with 0 pages
│   │      fallback: 'blocking'  // Build on demand
│   │    }
│   │  }
│   │
│   ├─ Disable source maps:
│   │  // next.config.js
│   │  module.exports = {
│   │    productionBrowserSourceMaps: false
│   │  }
│   │
│   ├─ Remove heavy dependencies:
│   │  npm ls | grep | sort -hr | head -20
│   │  Check for unnecessary large packages
│   │
│   └─ Lazy load components:
│      import dynamic from 'next/dynamic'
│      const Heavy = dynamic(() => import('./Heavy'))
│
├─→ REBUILD:
│   npm run build
│   Check: Does it finish in < 5 minutes?
│
└─→ DEPLOY:
    If successful → git push
    If still timeout → Contact Vercel support
```

---

## STEP 7: Unclear/Complex Errors

```
ERROR MESSAGE NOT CLEAR
"Build failed" but reason unclear
│
├─→ GATHER MORE INFORMATION:
│   │
│   ├─ Read entire build log (not just last line)
│   │  Scroll to top for initial errors
│   │
│   ├─ Look for multiple errors
│   │  First error usually causes the rest
│   │
│   ├─ Check full error stack trace
│   │  Click on error to expand
│   │
│   └─ Search for patterns:
│      grep -i "error\|fatal\|fail" buildlog.txt
│
├─→ REPRODUCE LOCALLY:
│   │
│   ├─ Clean rebuild:
│   │  rm -rf .next node_modules
│   │  npm install
│   │  npm run build
│   │
│   ├─ Test individual pages:
│   │  Check if specific page causes issue
│   │  Temporarily remove pages
│   │
│   ├─ Test each dependency:
│   │  Install one at a time
│   │  Run build after each
│   │
│   └─ Add debug logging:
│      console.log('[BUILD DEBUG]', variable)
│      Run: npm run build > build.log 2>&1
│      Review build.log for debug output
│
├─→ ISOLATE THE PROBLEM:
│   │
│   ├─ Git bisect (if recent change broke build):
│   │  git bisect start
│   │  git bisect bad HEAD
│   │  git bisect good [older commit]
│   │  git bisect reset
│   │
│   ├─ Try different Node version:
│   │  nvm use 18  (or 16, 20)
│   │  npm install
│   │  npm run build
│   │
│   └─ Check for platform-specific issues:
│      Mac/Linux: Different than Windows paths
│      Run on same OS as Vercel (Linux)
│
├─→ LAST RESORT:
│   │
│   ├─ Create minimal reproduction:
│   │  Create fresh Next.js app: npx create-next-app@latest
│   │  Add your code incrementally
│   │  See at which point it breaks
│   │
│   ├─ Reach out with details:
│   │  Include: buildlog.txt, package.json, next.config.js
│   │  Link to repo (if public)
│   │  Steps to reproduce
│   │
│   └─ Vercel Support:
│      https://vercel.com/support
│
└─→ ESCALATION PATH:
    1. Go through Step 1-6
    2. Document everything tried
    3. Open support ticket
    4. Include all findings
```

---

## Section 2: Runtime Issues (Build Succeeded but App Broken)

```
BUILD SUCCEEDED BUT APP NOT WORKING?
  │
  ├─→ Check Browser Console (F12)
  │   │
  │   ├─→ Has RED error messages?
  │   │   ├─→ YES → CLIENT ERROR (Section 2A)
  │   │   └─→ NO → Continue
  │   │
  │   └─→ Has YELLOW warnings?
  │       ├─→ YES → Review warnings (usually safe to ignore)
  │       └─→ NO → Continue
  │
  ├─→ Does page load at all?
  │   │
  │   ├─→ Blank white screen?
  │   │   └─→ CLIENT CRASH (Section 2B)
  │   │
  │   ├─→ Shows page content but broken?
  │   │   └─→ STYLING/LAYOUT ISSUE (Section 2C)
  │   │
  │   └─→ Shows "500 Internal Server Error"?
  │       └─→ SERVER ERROR (Section 2D)
  │
  └─→ Try these steps:
      1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
      2. Open DevTools Console (F12)
      3. Look for errors
      4. Proceed to appropriate section
```

---

## SECTION 2A: Client Error Resolution

```
BROWSER CONSOLE SHOWS RED ERROR
Example: "TypeError: user is undefined"
│
├─→ READ THE ERROR CAREFULLY:
│   Error message tells you:
│   - What went wrong: "cannot read property"
│   - Where it happened: "at pages/profile.js:25"
│   - Full stack trace (scroll down)
│
├─→ COMMON CLIENT ERRORS:
│   │
│   ├─ "undefined is not a function"
│   │  Cause: Function not imported or defined
│   │  Fix: Check import statements
│   │
│   ├─ "Cannot read property 'X' of undefined"
│   │  Cause: Object is null or undefined
│   │  Fix: Add null check: obj?.property
│   │
│   ├─ "Module not found"
│   │  Cause: Wrong import path
│   │  Fix: Verify path is correct
│   │
│   └─ "CORS error"
│      Cause: API blocked by browser
│      Fix: Add CORS headers on server
│
├─→ DEBUGGING STEPS:
│   │
│   ├─ Open DevTools (F12)
│   ├─ Go to "Console" tab
│   ├─ Look for red [X] errors
│   ├─ Click error to expand stack trace
│   ├─ Click file link to see source code
│   ├─ Identify problem:
│   │  - Missing import?
│   │  - Null/undefined value?
│   │  - Wrong data type?
│   ├─ Fix in code
│   ├─ Redeploy: git push
│   └─ Test again
│
├─→ FIX PATTERNS:
│   │
│   ├─ Add null check:
│   │  Before: const name = user.name;
│   │  After:  const name = user?.name || 'Unknown';
│   │
│   ├─ Initialize variables:
│   │  Before: let data;
│   │  After:  let data = null;
│   │
│   ├─ Check conditional:
│   │  Before: if (items) { }
│   │  After:  if (items && items.length > 0) { }
│   │
│   └─ Handle async:
│      Before: const data = fetchData();
│      After:  useEffect(() => {
│                 fetchData().then(setData);
│               }, []);
│
└─→ VERIFY:
    Reload page → Error should disappear
    Check Network tab → All requests successful
```

---

## SECTION 2B: Client Crash (Blank Screen)

```
BLANK WHITE SCREEN / APP DOESN'T LOAD
│
├─→ IMMEDIATE CHECKS:
│   │
│   ├─ Open DevTools (F12) → Console tab
│   │  Any error messages? → Follow SECTION 2A
│   │  No errors? → Continue
│   │
│   ├─ Check Network tab:
│   │  Look for red failed requests
│   │  Check status codes (should be 200)
│   │  Are all resources loading?
│   │
│   ├─ Hard refresh:
│   │  Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
│   │  Clear cache and reload
│   │
│   └─ Try incognito/private mode:
│      If works in incognito → Browser cache issue
│      If fails too → Real application issue
│
├─→ COMMON CAUSES:
│   │
│   ├─ Environment variable missing:
│   │  Check: process.env.NEXT_PUBLIC_API_URL
│   │  Fix: Add to Vercel → Redeploy
│   │
│   ├─ JavaScript error (check console):
│   │  Fix: See SECTION 2A
│   │
│   ├─ CSS/styling broken:
│   │  Fix: See SECTION 2C
│   │
│   └─ Initial data fetch fails:
│      Check Network → Is API request failing?
│      Fix: See API error below
│
├─→ TESTING API CALL:
│   Open DevTools Console and run:
│   
│   fetch('/api/health')
│     .then(r => r.json())
│     .then(d => console.log('Success:', d))
│     .catch(e => console.error('Error:', e))
│   
│   Check for error in console
│
├─→ DEBUGGING STEPS:
│   1. Add console.log at top of page:
│      "console.log('[DEBUG] Page loaded')"
│   2. Check if it appears in console
│      If yes: Page loaded, error happens later
│      If no: Page fails to render at all
│   3. Add more logs to narrow down issue
│   4. Remove logs after debugging
│
└─→ ESCALATION:
    If still blank → Try git revert to last working version
    vercel logs [url] → Check server logs
    See SECTION 2D for server errors
```

---

## SECTION 2C: Styling/Layout Issues

```
PAGE LOADS BUT STYLING IS BROKEN
Symptoms:
- Content not aligned
- Colors wrong
- Layout broken
- Tailwind not applied
│
├─→ COMMON STYLING ISSUES:
│   │
│   ├─ Tailwind classes not working:
│   │  Check: tailwind.config.js exists
│   │  Verify: CSS import in _app.js
│   │  Solution: Rebuild with: npm run build
│   │
│   ├─ CSS modules not imported:
│   │  Before: <div className="button">  {/* not styled */}
│   │  After:  import styles from './style.module.css'
│   │          <div className={styles.button}>
│   │
│   ├─ Global styles not loaded:
│   │  Check: pages/_app.js
│   │  Should have: import './globals.css'
│   │  Solution: Verify import is present
│   │
│   └─ Images not loading:
│      Check: Images folder exists
│      Verify: Correct path: /images/file.png
│      Solution: Check public/ folder
│
├─→ DEBUGGING:
│   1. Open DevTools (F12) → Elements tab
│   2. Right-click broken element
│   3. Click "Inspect"
│   4. Check computed styles
│   5. Look for red warnings about CSS
│
├─→ COMMON FIXES:
│   │
│   ├─ Missing CSS import:
│   │  // pages/_app.js
│   │  import '../styles/globals.css'
│   │
│   ├─ Tailwind config missing paths:
│   │  // tailwind.config.js
│   │  content: ["./src/**/*.{js,jsx}"]
│   │
│   ├─ CSS file in wrong location:
│   │  Should be: src/styles/ or styles/
│   │  Not: public/ (public is for static files)
│   │
│   └─ Build needed after config change:
│      npm run build && npm run start
│
└─→ VERIFY:
    Reload page → Styling should be correct
    Check Network → No 404s for CSS/images
```

---

## SECTION 2D: Server Error (500 Internal Server Error)

```
SERVER RETURNING 500 ERROR
Symptoms:
- "500 Internal Server Error"
- API call fails
- Database operation fails
│
├─→ CHECK SERVER LOGS:
│   Method 1: Vercel Dashboard
│   1. Vercel Dashboard → Deployments
│   2. Click current deployment
│   3. Look for "Functions" or "Logs"
│   4. Read error details
│
│   Method 2: Vercel CLI
│   vercel logs [deployment-url] --tail
│   (watch logs in real-time)
│
├─→ COMMON API ERRORS:
│   │
│   ├─ Database connection failed:
│   │  Cause: DATABASE_URL not set
│   │  Fix: Add to Vercel → Redeploy
│   │
│   ├─ Database query error:
│   │  Cause: SQL syntax error
│   │  Check: pages/api/[route].js
│   │  Fix: Debug SQL query
│   │
│   ├─ Missing API key:
│   │  Cause: API_KEY undefined
│   │  Fix: Add environment variable
│   │
│   ├─ Timeout:
│   │  Cause: External API slow
│   │  Fix: Add timeout handling
│   │
│   └─ Permission denied:
│      Cause: Insufficient access
│      Fix: Check credentials/tokens
│
├─→ DEBUG API ENDPOINT:
│   Add logging to API route:
│   
│   export default async function handler(req, res) {
│     console.log('[API] Received request:', {
│       method: req.method,
│       query: req.query,
│       timestamp: new Date().toISOString()
│     });
│
│     try {
│       const result = await doSomething();
│       console.log('[API] Success:', result);
│       res.status(200).json(result);
│     } catch (error) {
│       console.error('[API] Error:', {
│         message: error.message,
│         stack: error.stack
│       });
│       res.status(500).json({ error: error.message });
│     }
│   }
│
├─→ VERIFY FIX:
│   1. Add debug logging (above)
│   2. Redeploy: git push
│   3. Trigger API call
│   4. Check logs: vercel logs [url]
│   5. Review error details
│   6. Fix issue
│   7. Remove debug logging
│   8. Redeploy clean code
│
└─→ TEST API DIRECTLY:
    curl https://your-domain.vercel.app/api/endpoint
    Response should show error details
```

---

## Emergency Rollback Procedure

```
DEPLOYMENT BROKEN AND NEED IMMEDIATE FIX

Option 1: Revert to Previous Deployment
└─ Vercel Dashboard → Deployments
   1. Find last working deployment (green ✓)
   2. Click 3 dots menu
   3. Click "Promote to Production"
   (App is now restored)

Option 2: Revert Git Commit
└─ git revert HEAD
   git push origin main
   (Vercel automatically redeploys)
   (Creates a new commit reverting changes)

Option 3: Rollback to Older Commit
└─ git reset --hard [older-commit-hash]
   git push origin main -f
   (Force push to deploy older version)
   (WARNING: Use only in emergencies)
```

---

**Version**: 1.0
**Last Updated**: 2024
**Framework**: Next.js 14+
**Platform**: Vercel
**Status**: Production Ready
