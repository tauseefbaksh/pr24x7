# Next.js Deployment Troubleshooting Master Guide for Vercel

## Table of Contents
1. [Quick Start Diagnosis](#quick-start-diagnosis)
2. [Phase 1: Pre-Deployment Verification](#phase-1-pre-deployment-verification)
3. [Phase 2: Understanding Vercel Build Logs](#phase-2-understanding-vercel-build-logs)
4. [Phase 3: Identifying Build Errors](#phase-3-identifying-build-errors)
5. [Phase 4: Dependency Analysis](#phase-4-dependency-analysis)
6. [Phase 5: Environment Variable Verification](#phase-5-environment-variable-verification)
7. [Phase 6: Configuration Review](#phase-6-configuration-review)
8. [Phase 7: Runtime Error Investigation](#phase-7-runtime-error-investigation)
9. [Phase 8: Advanced Diagnostics](#phase-8-advanced-diagnostics)
10. [Phase 9: Final Verification & Deployment](#phase-9-final-verification--deployment)

---

## Quick Start Diagnosis

### Initial Assessment (5 minutes)

When your Next.js site fails to deploy on Vercel, follow these immediate steps:

**Step 1: Check Deployment Status**
1. Go to Vercel dashboard (https://vercel.com/dashboard)
2. Select your project
3. Look at the latest deployment in the "Deployments" tab
4. Note the deployment status:
   - Red X = Failed
   - Yellow loading = In progress
   - Blue checkmark = Successful

**Step 2: Access Build Logs**
1. Click on the failed deployment
2. Scroll down to find "Build Logs" section
3. Read the error message at the bottom of logs
4. Note the error type and line number

**Step 3: Categorize the Problem**

Look for these keywords in error messages:

| Error Type | Keywords to Search | Jump to Section |
|-----------|-------------------|-----------------|
| Build Error | `SyntaxError`, `TypeError`, `ReferenceError` | Phase 3 |
| Missing Module | `Cannot find module`, `Module not found` | Phase 4 |
| Environment | `undefined`, `ENOENT`, `.env` | Phase 5 |
| Configuration | `next.config.js`, `tsconfig.json`, `package.json` | Phase 6 |
| Dependencies | `peer dep`, `version conflict`, `version mismatch` | Phase 4 |
| Runtime Error | `500 Internal Server Error`, `page not found` | Phase 7 |
| Timeout | `ETIMEDOUT`, `timeout`, `exceeded timeout` | Phase 8 |

---

## Phase 1: Pre-Deployment Verification

### Purpose
Catch 80% of issues before they reach Vercel by running local verification.

### Step 1.1: Local Build Test
**Objective**: Verify the build succeeds locally before pushing to Vercel.

```bash
# Clean previous builds
rm -rf .next node_modules package-lock.json

# Reinstall dependencies
npm install

# Run the build exactly as Vercel will
npm run build
```

**What to look for:**
- Build completes without errors
- Output shows: "✓ Ready in X.XXs"
- No warnings about missing files
- No TypeScript errors (if using TS)

**If build fails locally:**
- Fix the error locally first
- Do NOT push to Vercel yet
- See Phase 3 for common build errors

### Step 1.2: Environment Variables Verification
**Objective**: Ensure all required environment variables are available locally.

```bash
# Check if .env.local exists
ls -la | grep .env

# View all environment variables the app uses
grep -r "process.env" src/ --include="*.js" --include="*.ts" --include="*.jsx" --include="*.tsx" | grep -v node_modules | sort | uniq
```

**Required variables for Next.js:**
- `NODE_ENV` (should be "production" for build)
- Any API endpoints your app uses
- Database connection strings
- Third-party API keys

**If variables are missing:**
- Create `.env.local` with all required variables
- Test build again locally
- Then add to Vercel project settings

### Step 1.3: Dependency Audit
**Objective**: Check for conflicting or broken dependencies.

```bash
# Check for peer dependency warnings
npm install --legacy-peer-deps 2>&1 | grep -i "warn"

# Check Node.js version compatibility
node --version
# Vercel default: Node.js 18.17.0 or newer

# List all installed packages
npm ls

# Check for duplicate packages (common cause of issues)
npm ls | grep -E "duplicate|peer dep"
```

**Common dependency issues:**
- React version mismatch
- TypeScript incompatibility
- Missing peer dependencies
- Outdated Next.js version

### Step 1.4: Git Status Verification
**Objective**: Ensure all changes are committed and pushed.

```bash
# Check git status
git status

# List recent commits
git log --oneline -5

# Check current branch
git branch

# Verify remote is correct
git remote -v
```

**What to check:**
- All changes are committed (nothing in "Changes not staged")
- You're on the correct branch
- Remote points to correct repository
- Latest commit is what you expect to deploy

---

## Phase 2: Understanding Vercel Build Logs

### Purpose
Learn to read Vercel logs to identify where and why deployments fail.

### Step 2.1: Accessing Complete Build Logs

**Method 1: Through Vercel Web Dashboard**
1. Navigate to Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Click on failed deployment
4. Scroll to "Build Logs" section
5. Read logs from top to bottom
6. Look for first error message (not warnings)

**Method 2: Using Vercel CLI**

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# View deployment logs
vercel logs [deployment-url]

# Example:
vercel logs my-app-3k9v2j1a.vercel.app
```

**Method 3: Getting Real-time Logs During Deployment**

```bash
# Trigger new deployment and watch logs
vercel deploy --prod

# Or just watch logs without deploying
vercel logs --follow
```

### Step 2.2: Understanding Log Sections

Vercel build logs are divided into these sections:

```
┌─────────────────────────────────────────────┐
│ 1. Initial Setup & Cloning                  │
│    - Git repo cloning                       │
│    - Branch checkout                        │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│ 2. Environment & Configuration              │
│    - Node.js version                        │
│    - Environment variables loading          │
│    - Build command execution                │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│ 3. Installing Dependencies                  │
│    - npm/yarn/pnpm install logs             │
│    - Dependency resolution                  │
│    - Peer dependency warnings               │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│ 4. Build Process                            │
│    - next build execution                   │
│    - TypeScript compilation                 │
│    - Code bundling                          │
│    - Image optimization                     │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│ 5. Final Output                             │
│    - Error/Success summary                  │
│    - Build time                             │
│    - Generated files size                   │
└─────────────────────────────────────────────┘
```

### Step 2.3: Key Log Markers to Watch For

**Success Indicators:**
```
✓ Successfully compiled
Ready in X.XXs
> Build complete. Summarizing build for production...
> Initialized successfully
```

**Warning Indicators (non-fatal, but investigate):**
```
WARN: Some text
WARNING: 
npm WARN
peer dep
deprecated
```

**Error Indicators (deployment will fail):**
```
ERROR: 
ERR!
error TS
SyntaxError
ReferenceError
TypeError
Cannot find module
Module not found
```

### Step 2.4: Extracting Critical Information

**Copy the entire error section:**

1. Find the first line with "ERROR" or error keyword
2. Copy from there to the next empty line
3. Save in a text file for reference
4. Search for this error in the troubleshooting sections below

**Example error extraction:**
```
Module not found: Can't resolve 'next/image'
  at /vercel/path0/src/pages/index.js:5:1
  at module.js:456:16
  ...
```

---

## Phase 3: Identifying Build Errors

### Purpose
Diagnose and fix errors that prevent the build from completing.

### Error Category 1: Syntax Errors

**Indicators:**
- `SyntaxError: Unexpected token`
- `SyntaxError: Unexpected identifier`
- `Parse error`
- Line number is provided in error

**Diagnostic Steps:**

```bash
# Step 1: Run local build to see exact error
npm run build

# Step 2: Check the file mentioned in error
cat src/pages/index.jsx  # Replace with actual file

# Step 3: Look for common syntax issues
# - Missing semicolons
# - Unclosed brackets/braces
# - Missing quotes
# - Improper JSX syntax
```

**Common Syntax Error Fixes:**

| Issue | Example | Fix |
|-------|---------|-----|
| Missing bracket | `export default function Home() {` | Add closing `}` |
| JSX without React | `return <div>Hello</div>` | Import React or use `.jsx` files |
| Incorrect export | `export Home` | Change to `export default Home` |
| Template string syntax | ```const name = `Hello`` ``` | Use backticks properly |
| Arrow function | `const fn = () => >` | Fix syntax to `=>` |

**Resolution:**
1. Fix the syntax error in your code
2. Run `npm run build` to verify fix
3. Commit and push changes
4. Redeploy to Vercel

### Error Category 2: Type Errors (TypeScript)

**Indicators:**
- `error TS[number]:`
- Type mismatch messages
- Property not found errors

**Example:**
```
error TS2339: Property 'data' does not exist on type 'Response'.
  at src/pages/api/user.ts:10:15
```

**Diagnostic Steps:**

```bash
# Step 1: Check tsconfig.json
cat tsconfig.json

# Step 2: Run TypeScript compiler directly
npx tsc --noEmit

# Step 3: Check specific file for type issues
npx tsc src/pages/api/user.ts --noEmit
```

**Common TypeScript Fixes:**

```typescript
// Before (Error)
const user = response.json();  // Error: json() is async

// After (Fixed)
const user = await response.json();

// Before (Error)
interface Props {
  name: string;
}
const MyComponent: React.FC = (props: Props) => {
  // Error: props doesn't match interface

// After (Fixed)
const MyComponent: React.FC<Props> = (props) => {
  // Now props are properly typed
```

**Resolution:**
1. Address type errors as indicated
2. Run `npx tsc --noEmit` to verify
3. Test locally with `npm run build`
4. Push changes and redeploy

### Error Category 3: Module Resolution Errors

**Indicators:**
- `Cannot find module`
- `Module not found`
- `Can't resolve`

**Examples:**
```
Module not found: Can't resolve '@/components/Header'
Cannot find module './utils/api'
```

**Diagnostic Steps:**

```bash
# Step 1: Check if file exists
ls -la src/components/Header.tsx  # Replace with actual path

# Step 2: Check for import path issues
grep -r "from '@/components" src/  # Check import paths

# Step 3: Verify jsconfig.json or tsconfig.json aliases
cat jsconfig.json  # or tsconfig.json

# Step 4: Check file name case sensitivity (common on Windows)
find src -name "*header*" -o -name "*Header*"
```

**Common Module Resolution Issues:**

| Problem | Cause | Solution |
|---------|-------|----------|
| Path alias not configured | Missing in `tsconfig.json` | Add `"paths"` in `compilerOptions` |
| File doesn't exist | Typo in filename | Verify file exists exactly as named |
| Wrong extension | Importing `.ts` instead of `.tsx` | Check file extension |
| Case sensitivity | `Header.tsx` vs `header.tsx` on Linux | Match exact filename case |

**Example Fix:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],  // Add or fix this
      "@/components/*": ["src/components/*"]
    }
  }
}
```

**Resolution:**
1. Verify file exists at exact path
2. Check import statement case
3. Ensure aliases are configured
4. Run `npm run build` locally
5. Push and redeploy

### Error Category 4: Missing Dependencies

**Indicators:**
- `Cannot find module '[package-name]'`
- Package name in error message

**Example:**
```
Cannot find module 'axios'
```

**Diagnostic Steps:**

```bash
# Step 1: Check if package is in package.json
cat package.json | grep "axios"

# Step 2: Check if it's installed
npm list axios

# Step 3: Check if dependency is missing from package.json
npm ls --all 2>&1 | grep "missing\|undefined"
```

**Fix Missing Dependencies:**

```bash
# Install the missing package
npm install axios

# Or if it's a dev dependency
npm install --save-dev @types/axios

# Verify installation
npm list axios

# Run build to verify
npm run build
```

**Resolution:**
1. Install missing package locally
2. Verify `package.json` is updated
3. Commit `package.json` and `package-lock.json`
4. Push changes
5. Redeploy to Vercel

---

## Phase 4: Dependency Analysis

### Purpose
Ensure all dependencies are installed, compatible, and properly resolved.

### Step 4.1: Complete Dependency Check

**Objective**: Verify all dependencies are correct and compatible.

```bash
# Check for dependency issues
npm audit

# Check specifically for security vulnerabilities
npm audit --production

# List all peer dependency warnings
npm install 2>&1 | grep -i "peer"

# Check for duplicate/conflicting versions
npm ls | grep "deduped\|duplicate"
```

### Step 4.2: Next.js Specific Dependencies

**Verify Next.js and React versions:**

```bash
# Check Next.js version
npm ls next

# Check React version
npm ls react react-dom

# Check required peer dependencies
cat package.json | grep -A 10 '"dependencies"'
```

**Minimum required versions:**
```json
{
  "dependencies": {
    "next": ">=12.0.0",  // Recommended: 14.0.0+
    "react": ">=16.8.0", // Recommended: 18.0.0+
    "react-dom": ">=16.8.0"
  }
}
```

**If versions are mismatched:**

```bash
# Update Next.js
npm install next@latest

# Update React
npm install react@latest react-dom@latest

# Verify compatibility
npm install
npm run build
```

### Step 4.3: Peer Dependency Resolution

**Identify peer dependency issues:**

```bash
# View all warnings during install
npm install --legacy-peer-deps 2>&1 | tee install.log
grep "warn" install.log
```

**For packages with peer dependency warnings:**

```bash
# Option 1: Install with legacy peer deps flag (temporary)
npm install --legacy-peer-deps

# Option 2: Update package to compatible version
npm install [package-name]@latest

# Option 3: Force specific versions in package.json
npm install [package-name]@[version]
```

### Step 4.4: Package Lock Verification

**Ensure package-lock.json is valid:**

```bash
# Verify lock file integrity
npm ci --dry-run

# Regenerate lock file if corrupted
rm package-lock.json
npm install

# Verify lock file in git
git add package-lock.json
git commit -m "Update package-lock.json"
```

**Important for Vercel:**
- Always commit `package-lock.json` or `yarn.lock`
- Vercel uses this to ensure consistent installations
- Without lock file, builds may be non-deterministic

### Step 4.5: Dependency Size Check

**Vercel has size limits:**

```bash
# Check total bundle size
du -sh node_modules

# Identify largest packages
du -sh node_modules/*/ | sort -hr | head -20
```

**If node_modules is too large:**
- Remove unnecessary dependencies: `npm prune`
- Check for duplicate dependencies: `npm dedupe`
- Use lighter alternatives (e.g., `date-fns` vs `moment`)

---

## Phase 5: Environment Variable Verification

### Purpose
Ensure all environment variables are properly configured in Vercel.

### Step 5.1: Identifying Required Environment Variables

**Find all environment variables your app uses:**

```bash
# Search for environment variable usage
grep -r "process.env" src/ --include="*.js" --include="*.ts" --include="*.jsx" --include="*.tsx" | grep -v node_modules

# Search in API routes
grep -r "process.env" pages/api/ 2>/dev/null

# Search in configuration files
grep -r "process.env" . --include="next.config.js" --include="tailwind.config.js"
```

**Create a list of required variables:**

```bash
# Extract unique variable names
grep -rho "process\.env\.[A-Z_]*" src/ | sort | uniq
```

**Example output:**
```
process.env.API_URL
process.env.DATABASE_URL
process.env.NEXT_PUBLIC_STRIPE_KEY
process.env.SECRET_TOKEN
```

### Step 5.2: Understanding Public vs Secret Variables

**Two types of environment variables in Next.js:**

| Variable Type | Prefix | Access | Visibility | Example |
|--------------|--------|--------|-----------|---------|
| Public | `NEXT_PUBLIC_` | Browser & Server | Visible in client code | `NEXT_PUBLIC_API_KEY` |
| Secret | None | Server only | Hidden from browser | `DATABASE_URL` |

**Critical: Never expose secrets in client-side code**

```javascript
// WRONG - Secret exposed to browser
const API_KEY = process.env.SECRET_KEY;  // If no NEXT_PUBLIC_ prefix

// RIGHT - Public variable for browser
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// RIGHT - Secret variable (server-side only)
export async function getServerSideProps() {
  const dbUrl = process.env.DATABASE_URL;  // Only on server
  return {};
}
```

### Step 5.3: Adding Environment Variables to Vercel

**Method 1: Through Vercel Dashboard**

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" tab
3. Click "Environment Variables" in left sidebar
4. Add each variable:
   - Key: (e.g., `DATABASE_URL`)
   - Value: (e.g., `postgresql://...`)
   - Select environments: Production, Preview, Development
5. Click "Save"

**Method 2: Using Vercel CLI**

```bash
# List current environment variables
vercel env list

# Add new environment variable
vercel env add API_URL

# View specific variable (limited info for security)
vercel env pull

# This creates/updates .env.local file
```

**Method 3: Via vercel.json Configuration**

```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "DATABASE_URL": "@database_url"
  }
}
```

### Step 5.4: Local Environment Variable Setup

**Create `.env.local` for local development:**

```bash
# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
SECRET_TOKEN=dev-token-123
STRIPE_SECRET_KEY=sk_test_...
EOF

# Verify file was created
cat .env.local

# Add to .gitignore to prevent accidental commit
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

**Do NOT commit `.env.local`:**

```bash
# Check git status
git status

# If accidentally added, remove it
git rm --cached .env.local
git commit -m "Remove .env.local from git"
```

### Step 5.5: Testing Environment Variables

**Verify variables are loaded in Vercel:**

Create a debug page to test:

```javascript
// pages/debug/env.js (REMOVE after testing!)
export default function EnvDebug() {
  return (
    <div>
      <h1>Environment Variables Debug</h1>
      <pre>
        {JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          // Add others here
          HAS_DATABASE_URL: !!process.env.DATABASE_URL,
          HAS_SECRET: !!process.env.SECRET_TOKEN,
        }, null, 2)}
      </pre>
    </div>
  );
}
```

**Then test:**

```bash
# Local test
npm run dev
# Visit http://localhost:3000/debug/env

# After deploying
# Visit https://your-domain.vercel.app/debug/env
```

**Important: Remove the debug page before production!**

### Step 5.6: Troubleshooting Missing Variables

**If variable is undefined in Vercel:**

```bash
# Step 1: Verify in Vercel dashboard
# Settings → Environment Variables
# Check variable exists and is correct value

# Step 2: Check variable name exactly matches
# Case sensitive! DATABASE_URL ≠ database_url

# Step 3: Check variable is for correct environment
# Click variable and verify Production/Preview checked

# Step 4: Verify variable doesn't have typo in code
grep -r "process.env.DATABASE_URL" src/

# Step 5: Redeploy to activate changes
vercel deploy --prod
```

---

## Phase 6: Configuration Review

### Purpose
Verify all configuration files are correct and compatible.

### Step 6.1: next.config.js Verification

**Common configuration issues:**

```bash
# Check if next.config.js exists
ls -la next.config.js

# Test configuration validity
cat next.config.js | head -50  # View first 50 lines
```

**Validate next.config.js syntax:**

```bash
# Create test script
cat > test-config.js << 'EOF'
try {
  const nextConfig = require('./next.config.js');
  console.log('Config valid:', nextConfig);
} catch (error) {
  console.error('Config error:', error.message);
}
EOF

# Run test
node test-config.js

# Clean up
rm test-config.js
```

**Common next.config.js Issues:**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Syntax error in config | Build fails immediately | Check for valid JavaScript syntax |
| Invalid plugin | `Cannot read property` error | Verify plugin installation |
| Incorrect image config | Image optimization errors | Check `next/image` configuration |
| Build timeout | Build exceeds time limit | Optimize build, reduce features |

**Minimal valid next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add other configs as needed
};

module.exports = nextConfig;
```

### Step 6.2: tsconfig.json Verification

**For TypeScript projects:**

```bash
# Check tsconfig.json exists
ls -la tsconfig.json

# Validate syntax (copy to temp file and test)
npx tsc --noEmit

# Check for common issues
grep -E "esModuleInterop|strict|lib" tsconfig.json
```

**Minimum TypeScript configuration:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Step 6.3: package.json Scripts Verification

**Ensure build script is correct:**

```bash
# Check package.json scripts
cat package.json | grep -A 5 '"scripts"'
```

**Required scripts for Next.js:**

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

**Vercel build command configuration:**

1. Vercel Dashboard → Settings → Build & Development Settings
2. Check "Build Command" is set to: `npm run build`
3. Check "Output Directory" is set to: (leave empty or `.next`)
4. Check "Install Command" is set to: `npm install`

### Step 6.4: .env Files Configuration

**Correct .env file hierarchy:**

```
.env                          # Shared variables (commit to git)
.env.local                    # Local overrides (DON'T commit)
.env.production.local         # Production overrides (DON'T commit)
.env.development              # Development shared (commit to git)
```

**Verify setup:**

```bash
# Check which .env files exist
ls -la .env*

# Check .gitignore has correct entries
grep ".env" .gitignore

# Should show:
# .env.local
# .env.*.local
```

### Step 6.5: Vercel Project Settings Check

**Review project settings systematically:**

1. **Project Settings**
   - Go to Vercel Dashboard → Your Project → Settings
   - Click "General"
   - Verify:
     - Framework: `Next.js`
     - Build Command: `npm run build`
     - Output Directory: (empty)
     - Install Command: `npm install`

2. **Environment Variables**
   - Click "Environment Variables"
   - Verify all required variables are present
   - Check each variable is assigned to correct environments
   - Verify sensitive values are not exposed

3. **Domains**
   - Click "Domains"
   - Verify domain is correctly configured
   - Check DNS settings if custom domain
   - Verify SSL certificate status

4. **Git Integration**
   - Click "Git"
   - Verify correct repository is connected
   - Check branch settings
   - Verify webhook configuration

---

## Phase 7: Runtime Error Investigation

### Purpose
Diagnose errors that occur after deployment succeeds but app fails at runtime.

### Step 7.1: Identifying Runtime Errors

**These errors occur AFTER build succeeds:**

| Error Type | When it appears | How to debug |
|-----------|-----------------|-------------|
| Server Error | After clicking link/loading page | Check server logs |
| Client Error | In browser console | Check browser DevTools |
| API Error | When calling API routes | Check API response |
| Connection Error | When accessing resources | Check environment variables |

### Step 7.2: Checking Browser Console

**For client-side errors:**

1. Open deployed site in browser
2. Open DevTools: F12 or Right-click → Inspect
3. Click "Console" tab
4. Look for red error messages
5. Note error message and stack trace

**Common browser errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| `undefined is not a function` | Function not imported or defined | Check import statements |
| `Cannot read property 'X' of undefined` | Accessing property on null/undefined | Add null checks |
| `Module not found` | Import path incorrect | Verify path is correct |
| `CORS error` | API blocked by CORS policy | Add CORS headers |

**Example console debugging:**

```javascript
// Before (causes error)
const user = userData;
console.log(user.name);  // Error if userData is undefined

// After (fixed)
const user = userData || {};
console.log(user?.name);  // Safe access
```

### Step 7.3: Checking Server Logs

**Method 1: Through Vercel Dashboard**

1. Go to Vercel Dashboard → Your Project
2. Click "Functions" tab
3. Click on function with errors
4. View logs in real-time
5. Look for error messages

**Method 2: Using Vercel CLI**

```bash
# View functions logs
vercel logs [deployment-url]

# View real-time logs
vercel logs [deployment-url] --follow

# Filter for errors only
vercel logs [deployment-url] | grep -i "error"
```

**Method 3: Adding Debug Logging**

Add logging to identify issues:

```javascript
// pages/api/user.js
export default function handler(req, res) {
  console.log('[DEBUG] Request received:', {
    method: req.method,
    query: req.query,
    timestamp: new Date().toISOString(),
  });

  try {
    const user = fetchUser(req.query.id);
    console.log('[DEBUG] User fetched:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('[ERROR] Failed to fetch user:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ error: error.message });
  }
}
```

### Step 7.4: Checking API Routes

**Test API endpoints directly:**

```bash
# Test GET request
curl https://your-domain.vercel.app/api/health

# Test POST request with data
curl -X POST https://your-domain.vercel.app/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'

# Check response headers
curl -i https://your-domain.vercel.app/api/health
```

**In browser console:**

```javascript
// Test API
fetch('/api/user?id=123')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

### Step 7.5: Database Connection Issues

**If using database (PostgreSQL, MongoDB, etc.):**

```javascript
// Test database connection
// pages/api/test-db.js
export default async function handler(req, res) {
  try {
    console.log('[DEBUG] Database URL exists:', !!process.env.DATABASE_URL);
    
    // Attempt connection
    const result = await queryDatabase('SELECT 1');
    
    res.status(200).json({ 
      status: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[ERROR] Database connection failed:', error);
    res.status(500).json({ 
      error: error.message,
      hasEnvVar: !!process.env.DATABASE_URL
    });
  }
}
```

**Common database issues:**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Connection string wrong | `Connection refused` | Verify DATABASE_URL in Vercel |
| Database offline | `Connection timeout` | Check database service status |
| IP not whitelisted | `Connection denied` | Add Vercel IPs to database whitelist |
| Credentials invalid | `Authentication failed` | Verify username/password |

---

## Phase 8: Advanced Diagnostics

### Purpose
Investigate complex issues that don't fit standard categories.

### Step 8.1: Build Timeout Issues

**Symptom: Build exceeds 45 minutes on Vercel**

```bash
# Check build time locally
time npm run build

# Identify slowest part
npm run build -- --debug

# Analyze bundle size
npm install -g webpack-bundle-analyzer
# Then add to next.config.js
```

**Optimization strategies:**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation for large pages
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.VERCEL_ENV === 'preview',
  },
  // Reduce bundle
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
```

**Common timeout causes:**

- Large number of static pages being generated
- Heavy dependencies being imported at build time
- Database queries during build
- Image optimization taking too long

**Solutions:**

```bash
# 1. Use incremental static generation
# pages/[id].js
export async function getStaticPaths() {
  return {
    paths: [], // Start with no pre-built pages
    fallback: 'blocking', // Build on first request
  };
}

# 2. Lazy load heavy dependencies
const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <div>Loading...</div>,
});

# 3. Disable build optimization if necessary
# But only as last resort
```

### Step 8.2: Memory/Resource Issues

**Symptom: Build fails with memory error or crashes**

```bash
# Check available memory
free -h

# Check disk space
df -h

# Monitor build memory usage
/usr/bin/time -v npm run build
```

**If out of memory:**

```javascript
// next.config.js - Reduce memory usage
module.exports = {
  swcMinify: false,  // Use SWC but don't minify
  productionBrowserSourceMaps: false,  // Skip source maps
  experimental: {
    swcFileReads: false,
  },
};
```

### Step 8.3: Node Version Incompatibility

**Check Node version on Vercel:**

```bash
# Check Node version locally
node --version

# Check Node version in Vercel
# Vercel dashboard → Settings → General → Node.js Version

# Specify Node version in package.json
cat > package.json << 'EOF'
{
  "engines": {
    "node": "18.17.0"
  }
}
EOF
```

**If Vercel uses wrong Node version:**

1. Go to Vercel Dashboard → Settings
2. Click "General"
3. Check "Node.js Version" dropdown
4. Select correct version
5. Trigger new deployment

### Step 8.4: Git/Deployment Issues

**If Vercel not detecting changes:**

```bash
# Verify commit is pushed
git log --oneline -1

# Check remote
git remote -v

# Force redeploy even without changes
# Vercel Dashboard → Deployments → Click 3 dots → Redeploy
```

**If branch not deploying:**

```bash
# Check Vercel git settings
# Vercel Dashboard → Settings → Git

# Verify branch configuration
git branch -a

# Push to correct branch
git push origin main  # or your branch name
```

### Step 8.5: Caching Issues

**If Vercel serving old build:**

1. Vercel Dashboard → Deployments → Latest → Redeploy
2. Or use CLI: `vercel redeploy`
3. Clear browser cache: Ctrl+Shift+Delete

**Set proper cache headers:**

```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        }
      ]
    }
  ]
};
```

---

## Phase 9: Final Verification & Deployment

### Purpose
Ensure successful deployment and validate all systems are working.

### Step 9.1: Pre-Deployment Final Checklist

**15 minutes before deploying:**

- [ ] All code committed to git
- [ ] No uncommitted changes: `git status`
- [ ] Latest dependencies installed: `npm install`
- [ ] Local build succeeds: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] All environment variables set in Vercel
- [ ] `.env.local` not committed: `git check-ignore .env.local`
- [ ] `node_modules` not committed: `git check-ignore node_modules`
- [ ] All imports use correct paths
- [ ] No console.log debug statements left in code
- [ ] TypeScript has no errors: `npx tsc --noEmit`
- [ ] Tests pass (if applicable): `npm run test`
- [ ] Build command correct in Vercel settings
- [ ] Output directory correct in Vercel settings
- [ ] No banned patterns: `grep -r "eval\|require(" src/ --include="*.js"`

### Step 9.2: Deployment Methods

**Method 1: Via GitHub/GitLab/Bitbucket (Recommended)**

```bash
# Push to connected branch
git add .
git commit -m "feat: deploy new portfolio"
git push origin main

# Vercel automatically deploys
# Watch deployment in dashboard
```

**Method 2: Via Vercel CLI**

```bash
# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

**Method 3: Via Vercel Dashboard**

1. Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Find latest git commit
4. Click 3 dots menu → "Redeploy"

### Step 9.3: Monitoring Deployment Progress

**While deployment is running:**

1. Watch "Deployments" tab in Vercel Dashboard
2. Monitor build progress in real-time
3. Watch for build time (should be < 5 minutes typically)
4. Look for any warnings in build logs

**What to expect:**

```
[00:00] ▲ Next.js 14.0.0
[00:05] ✓ Creating an optimized production build
[01:30] ✓ Compiled successfully
[02:00] ✓ Collected static routes from next/Image
[02:30] ✓ Prerendered 45 routes with ISR
[03:00] > Ready in 3.5s
✓ Built successfully
```

### Step 9.4: Post-Deployment Validation

**Immediately after deployment:**

```bash
# Test the deployed site
curl -I https://your-domain.vercel.app

# Check status code (should be 200)
# Check headers for proper configuration
```

**In browser:**

1. Visit https://your-domain.vercel.app
2. Check page loads without errors
3. Open DevTools Console (F12) - should be clean
4. Check Network tab - all requests successful
5. Test key functionality:
   - Navigate between pages
   - Test API calls
   - Check dynamic content loads

**Automated health check:**

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV,
  });
}
```

**Test it:**

```bash
# After deployment
curl https://your-domain.vercel.app/api/health | jq

# Should return:
# {
#   "status": "healthy",
#   "timestamp": "2024-01-15T10:30:45.123Z",
#   "nodeVersion": "v18.17.0",
#   "environment": "production"
# }
```

### Step 9.5: Performance Validation

**Check deployment speed:**

```bash
# Test page load time
curl -w "Total time: %{time_total}s\n" -o /dev/null -s https://your-domain.vercel.app

# Should be under 2 seconds
```

**Check in Vercel Analytics (if enabled):**

1. Vercel Dashboard → Project → "Analytics" tab
2. Check Core Web Vitals
3. Verify performance is acceptable

### Step 9.6: Rollback Procedure

**If deployment has critical issues:**

**Option 1: Redeploy Previous Commit**

```bash
# Find working commit
git log --oneline -10

# Revert to that commit temporarily
git checkout [commit-hash]
git push origin main -f

# Vercel will redeploy
```

**Option 2: Via Vercel Dashboard**

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click 3 dots → "Promote to Production"

**Option 3: Git Revert (Cleaner)**

```bash
# Identify commit to revert
git log --oneline -1

# Create new commit reverting changes
git revert HEAD
git push origin main

# Vercel deploys the revert
```

---

## Comprehensive Troubleshooting Reference Table

| Category | Issue | Check | Fix |
|----------|-------|-------|-----|
| **Build** | Syntax Error | Check error line in code | Fix syntax, run `npm run build` |
| **Build** | Module not found | Check file path and case | Verify file exists, fix import |
| **Build** | TypeScript error | Run `npx tsc --noEmit` | Fix type issues |
| **Dependencies** | Peer dependency warning | Run `npm install` | Update packages or use `--legacy-peer-deps` |
| **Dependencies** | Missing module | Check `package.json` | Run `npm install [package]` |
| **Env Vars** | Variable undefined | Check Vercel Settings | Add variable to Vercel dashboard |
| **Env Vars** | Wrong variable value | Check `process.env.VAR_NAME` | Verify value in Vercel |
| **Config** | Wrong build command | Check Vercel Settings | Set to `npm run build` |
| **Config** | Wrong output directory | Check Vercel Settings | Leave empty for Next.js |
| **Runtime** | Blank page | Check browser console | Look for JavaScript errors |
| **Runtime** | 500 error | Check server logs | Look for API/database issues |
| **Runtime** | CORS error | Check API headers | Add CORS middleware |
| **Database** | Connection failed | Check env var | Verify DATABASE_URL exists |
| **Database** | Timeout | Check connection string | Verify database is running |
| **Performance** | Slow build | Check `npm run build` time | Remove large dependencies |
| **Performance** | High memory | Monitor build | Disable source maps |

---

## Emergency Contact & Escalation

**If you've gone through all phases and still stuck:**

1. **Vercel Support**: https://vercel.com/support
2. **Next.js Discord**: https://discord.gg/nextjs
3. **GitHub Issues**: https://github.com/vercel/next.js/issues
4. **Stack Overflow**: Tag with `next.js` and `vercel`

**When reaching out, include:**
- Deployment URL
- Latest 50 lines of build logs
- `package.json` (remove sensitive values)
- `next.config.js` content
- Repository link (if public)
- Steps you've already tried

---

## Quick Reference: Common Commands

```bash
# Build locally
npm run build

# Start development server
npm run dev

# Check for issues
npm run lint
npx tsc --noEmit

# View build size
npm run build && du -sh .next

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Test API locally
curl http://localhost:3000/api/health

# Push changes
git add .
git commit -m "Fix deployment"
git push origin main

# Redeploy from CLI
vercel --prod

# View Vercel logs
vercel logs [deployment-url]
```

---

**Last Updated**: 2024
**Next.js Version**: 14.0+
**Vercel Platform**: Current
**Node.js Version**: 18.17.0+
