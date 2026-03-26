# Vercel & Next.js Deployment Error Reference

Quick reference guide for common error messages and their solutions.

---

## Build Stage Errors

### Error: "Cannot find module 'module-name'"

**Full error example:**
```
Error: Cannot find module '@/components/Button'
  at Module._load (internal/modules/loader.js:241:45)
  at Function.Module._load_as_main
```

**Causes:**
- Import path doesn't match file location
- Component file doesn't exist
- Path alias misconfigured in tsconfig.json/jsconfig.json
- File extension missing (`.jsx` vs `.js`)
- Case sensitivity issue (Linux/Mac are case-sensitive)

**Solutions:**

1. Check file exists:
   ```bash
   ls src/components/Button.jsx  # or .tsx, .js
   ```

2. Verify import path:
   ```javascript
   // If file is at: src/components/Button.jsx
   // Correct imports:
   import Button from '@/components/Button';
   import Button from '../components/Button';
   import Button from './Button';
   ```

3. Update path alias in tsconfig.json:
   ```json
   {
     "paths": {
       "@/components/*": ["src/components/*"]
     }
   }
   ```

4. Rebuild after changes:
   ```bash
   npm run build
   ```

---

### Error: "SyntaxError: Unexpected token"

**Full error example:**
```
SyntaxError: Unexpected token } in JSON at position 145
Parse error in ./src/pages/index.js:42
```

**Causes:**
- Missing closing brace, bracket, or parenthesis
- Invalid JSON in configuration file
- Malformed JSX
- Unclosed string literal
- Invalid JavaScript syntax

**Solutions:**

1. Check the line mentioned:
   ```bash
   sed -n '35,50p' src/pages/index.js
   ```

2. Look for:
   - Missing `}`, `)`, `]`
   - Unclosed strings: `"` or `'`
   - Invalid JSX: `<Component>text</OtherComponent>`

3. Validate JSON files:
   ```bash
   # Check next.config.js
   node -c next.config.js
   
   # Check package.json
   cat package.json | jq '.'
   
   # Check tsconfig.json
   cat tsconfig.json | jq '.'
   ```

4. Use ESLint to find errors:
   ```bash
   npx eslint src/ --fix
   ```

---

### Error: "ENOENT: no such file or directory"

**Full error example:**
```
ENOENT: no such file or directory, open '/vercel/path/to/missing-file.js'
```

**Causes:**
- Referenced file doesn't exist
- Wrong file path
- File deleted but still imported
- Incorrect working directory

**Solutions:**

1. Verify file exists:
   ```bash
   find . -name "missing-file.js"
   ```

2. Remove references to deleted files:
   ```bash
   grep -r "missing-file" src/
   ```

3. Verify working directory in build command:
   ```bash
   pwd  # Check current directory during build
   ```

---

### Error: "Cannot use import statement outside a module"

**Full error example:**
```
SyntaxError: Cannot use import statement outside a module
at Function.Module._load
```

**Causes:**
- Mixing CommonJS (require) with ES modules (import)
- Incorrect package.json configuration
- Missing .mjs file extension
- TypeScript not compiled

**Solutions:**

1. Ensure consistent module syntax:
   ```javascript
   // ❌ Don't mix:
   const express = require('express');  // CommonJS
   import React from 'react';           // ES Module
   
   // ✅ Use one consistently:
   import express from 'express';
   import React from 'react';
   ```

2. Check package.json:
   ```json
   {
     "type": "module"  // If using ES modules
   }
   ```

3. Use .mjs extension for CommonJS modules:
   ```bash
   # Rename to .mjs if using CommonJS
   mv config.js config.mjs
   ```

---

## Dependency Errors

### Error: "peer dep missing"

**Full error example:**
```
npm WARN peer react@18.2.0 should be installed
npm ERR! peer dep missing: react-dom@18
```

**Causes:**
- Peer dependency not installed
- Version mismatch between packages
- Incompatible package versions

**Solutions:**

1. Install missing peer dependency:
   ```bash
   npm install react-dom@18
   ```

2. Resolve version conflicts:
   ```bash
   npm audit fix
   npm install --save package-name@latest
   ```

3. Check compatibility:
   ```bash
   npm ls react
   npm ls react-dom
   ```

---

### Error: "404 Not Found - 404 npm ERR!"

**Full error example:**
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/typo-package
npm ERR! 404 'typo-package' is not in this registry
```

**Causes:**
- Package name typo
- Package doesn't exist
- Private package without access
- Deprecated package

**Solutions:**

1. Check package name:
   ```bash
   npm search package-name
   ```

2. Verify spelling in package.json:
   ```bash
   grep "typo-package" package.json
   ```

3. Use correct package name:
   ```bash
   npm install correct-package-name
   ```

---

### Error: "ERESOLVE unable to resolve dependency tree"

**Full error example:**
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! While resolving: app@1.0.0
npm ERR! Found: react@17.0.2
npm ERR! Could not resolve dependency: peer react@18
```

**Causes:**
- Conflicting package versions
- Incompatible dependency requirements
- Package updated but dependencies haven't

**Solutions:**

1. Use legacy peer deps flag:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Update conflicting packages:
   ```bash
   npm install react@18 react-dom@18
   npm update
   ```

3. Clean install:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Environment Variable Errors

### Error: "Environment variable ... is required"

**Full error example:**
```
Error: Environment variable DATABASE_URL is required but not defined
at Object.<anonymous> (/vercel/path/file.js:15:3)
```

**Causes:**
- Variable not set in Vercel dashboard
- Variable name typo
- Variable not in deployment environment
- Variable used before being loaded

**Solutions:**

1. Add variable to Vercel:
   - Go to Project Settings → Environment Variables
   - Add variable name and value
   - Select appropriate environments

2. Verify variable name:
   ```bash
   grep "DATABASE_URL" src/**/*.js
   # Check spelling matches exactly
   ```

3. Check environment assignment:
   ```javascript
   // Verify variable is available in correct context
   const db = process.env.DATABASE_URL;  // Server-side only
   const url = process.env.NEXT_PUBLIC_API;  // Client + Server
   ```

---

### Error: "process.env.VARIABLE is undefined"

**Full error example:**
```
ReferenceError: Cannot read properties of undefined
```

**Causes:**
- Variable not set in .env.local
- Client-side code accessing server-only variable
- Variable not prefixed with NEXT_PUBLIC_ for client access
- Development vs production environment mismatch

**Solutions:**

1. For client-side access, use NEXT_PUBLIC_ prefix:
   ```javascript
   // ✅ Correct - accessible in browser
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   
   // ❌ Wrong - undefined in browser
   const apiKey = process.env.API_SECRET;
   ```

2. Set in .env.local:
   ```bash
   echo "NEXT_PUBLIC_API_URL=https://api.example.com" >> .env.local
   ```

3. Verify in Vercel environment:
   - Different variables needed for Production vs Preview?
   - Check Settings → Environment Variables

---

## Timeout & Memory Errors

### Error: "Build timed out after 3600 seconds"

**Causes:**
- Build process is too slow
- Infinite loop or hanging process
- Large data processing during build
- Missing API dependencies causing retries

**Solutions:**

1. Optimize build:
   ```javascript
   // next.config.js
   module.exports = {
     swcMinify: true,
     productionBrowserSourceMaps: false,
   };
   ```

2. Analyze build time:
   ```bash
   npm run build -- --debug
   ```

3. Remove unnecessary plugins or processing

4. Split builds:
   - Separate API from static content
   - Use dynamic imports for large components

---

### Error: "JavaScript heap out of memory"

**Causes:**
- Large dataset processing
- Memory leak in build process
- Too many dependencies
- Image optimization on large images

**Solutions:**

1. Increase Node.js memory:
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 npm run build
   ```

2. Optimize code:
   - Remove large dependencies
   - Use streaming for large data
   - Lazy load components

3. Set in vercel.json:
   ```json
   {
     "buildCommand": "NODE_OPTIONS=--max-old-space-size=4096 next build"
   }
   ```

---

## Configuration Errors

### Error: "Invalid configuration in next.config.js"

**Full error example:**
```
Error: Invalid configuration in next.config.js
TypeError: Cannot read property 'redirect' of undefined
```

**Causes:**
- Syntax errors in next.config.js
- Async function returns incorrect format
- Undefined variables or functions
- Invalid property names

**Solutions:**

1. Validate syntax:
   ```bash
   node -c next.config.js
   ```

2. Check common issues:
   ```javascript
   // ❌ Wrong - missing return
   async redirects() {
     return  // Missing array
   }
   
   // ✅ Correct
   async redirects() {
     return [
       {
         source: '/old',
         destination: '/new',
         permanent: true,
       }
     ];
   }
   ```

3. Test configuration locally:
   ```bash
   npm run build
   npm run start
   ```

---

### Error: "Cannot find files in .next directory"

**Causes:**
- Output directory configured incorrectly
- Build didn't complete successfully
- Files weren't generated

**Solutions:**

1. Verify output directory in next.config.js:
   ```javascript
   module.exports = {
     // Usually doesn't need to be specified (default is .next)
     distDir: '.next'
   };
   ```

2. Check .next directory exists:
   ```bash
   ls -la .next/
   ls -la .next/server/
   ls -la .next/static/
   ```

3. Rebuild if missing:
   ```bash
   rm -rf .next
   npm run build
   ```

---

## Runtime Errors

### Error: "404 Not Found" for images or assets

**Causes:**
- Asset path is incorrect
- File not in public folder
- Path alias not working at runtime
- Relative path broken after deployment

**Solutions:**

1. Use public folder for static assets:
   ```bash
   # Place files in public/
   public/images/logo.png
   
   # Reference in code:
   <img src="/images/logo.png" alt="Logo" />
   ```

2. Use next/image for optimization:
   ```javascript
   import Image from 'next/image';
   
   export default function MyComponent() {
     return (
       <Image
         src="/images/logo.png"
         alt="Logo"
         width={200}
         height={200}
       />
     );
   }
   ```

3. Verify image domains in next.config.js:
   ```javascript
   module.exports = {
     images: {
       domains: ['cdn.example.com']
     }
   };
   ```

---

### Error: "500 Internal Server Error"

**Causes:**
- API route error
- Unhandled exception
- Database connection failure
- Missing environment variable in runtime

**Solutions:**

1. Check API route error handling:
   ```javascript
   export default async function handler(req, res) {
     try {
       // Your code
       res.status(200).json({ data: 'success' });
     } catch (error) {
       console.error('API Error:', error);
       res.status(500).json({ error: 'Internal server error' });
     }
   }
   ```

2. Check server logs:
   - Go to Deployments → Recent deployment → Logs
   - Look for error messages

3. Test locally:
   ```bash
   npm run start
   curl http://localhost:3000/api/your-route
   ```

---

## Deployment Stage Errors

### Error: "Failed to download artifact"

**Causes:**
- Build artifact corrupted
- Network issue during deployment
- Insufficient permissions

**Solutions:**

1. Redeploy:
   ```bash
   git push origin main
   ```

2. Or manually redeploy in Vercel:
   - Go to Deployments
   - Click failed deployment
   - Click "Redeploy"

---

### Error: "Function too large"

**Causes:**
- Single Lambda function exceeds size limit
- Large dependencies bundled together
- Too much code in single file

**Solutions:**

1. Code split:
   ```javascript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

2. Split API routes:
   - Separate large functions
   - Use [route].js for multiple endpoints

---

## Quick Error Lookup Table

| Error | Likely Cause | First Action |
|-------|------------|--------------|
| Cannot find module | Import path wrong | Check file exists with correct path |
| SyntaxError | Code has typos | Run `npx eslint` and fix errors |
| 404 module not found | Missing dependency | Run `npm install` |
| peer dep missing | Version mismatch | Run `npm audit fix` |
| ERESOLVE unable to resolve | Conflicting versions | Try `npm install --legacy-peer-deps` |
| Environment variable required | Var not in Vercel | Add to Project Settings → Env Vars |
| Timeout | Build too slow | Optimize dependencies or settings |
| Out of memory | Large data processing | Increase memory or split build |
| Cannot find .next | Build failed | Run `npm run build` locally to fix |
| 500 Internal Server Error | API route error | Check server logs in Vercel |

---

## Getting Help

If error not listed above:

1. Copy full error message from Vercel logs
2. Search GitHub/Stack Overflow for exact error
3. Check framework documentation
4. Ask in community forums or contact support
