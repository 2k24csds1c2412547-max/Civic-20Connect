# CivicConnect - Complete Setup & Development Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/2k24csds1c2412547-max/Civic-20Connect.git
cd Civic-20Connect

# Install dependencies (choose one)
npm install          # Using npm
# OR
pnpm install        # Using pnpm (recommended)
# OR
yarn install        # Using yarn
```

### 2. Start Development Server

```bash
npm run dev
```

✅ **That's it!** Your app will open at `http://localhost:5173`

---

## 🛠️ Complete Development Setup

### Essential VS Code Extensions

Install these for maximum efficiency:

```bash
# Install via VS Code Extensions panel or command line:
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension formulahendry.auto-rename-tag
code --install-extension dsznajder.es7-react-js-snippets
```

### VS Code Settings (Optional)

Create `.vscode/settings.json` for project-specific settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 📁 Project Structure Understanding

```
Civic-20Connect/
├── client/                 # Frontend React app
│   ├── components/
│   │   ├── ui/            # Reusable UI components (Radix + Tailwind)
│   │   ├── AIAnalysis.tsx # AI-powered features
│   │   └── ...            # Other feature components
│   ├── pages/             # Route components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities and helpers
├── server/                # Backend Express.js API
├── shared/                # Shared types and utilities
└── public/                # Static assets
```

---

## ⚡ Development Workflow (Efficient)

### Daily Development Routine

1. **Start your day:**

   ```bash
   npm run dev          # Start dev server
   npm run typecheck    # Check TypeScript in background
   ```

2. **Code efficiently:**
   - Use **Ctrl+Shift+P** → "TypeScript: Restart TS Server" if intellisense breaks
   - Use **Ctrl+`** to open integrated terminal
   - Use **Ctrl+Shift+E** to toggle file explorer

3. **Before committing:**
   ```bash
   npm run format.fix   # Auto-format code
   npm run typecheck    # Ensure no TypeScript errors
   npm run test         # Run tests
   ```

### Hot Reloading Features

- ✅ **Instant CSS updates** - Tailwind changes reflect immediately
- ✅ **Component hot reload** - React components update without losing state
- ✅ **TypeScript compilation** - Real-time error checking

---

## 🎯 Available Scripts & When to Use Them

| Command              | Purpose                  | When to Use                |
| -------------------- | ------------------------ | -------------------------- |
| `npm run dev`        | Start development server | Daily development          |
| `npm run build`      | Build for production     | Before deployment          |
| `npm run start`      | Run production build     | Testing production locally |
| `npm run test`       | Run test suite           | Before committing          |
| `npm run typecheck`  | Check TypeScript errors  | Debugging                  |
| `npm run format.fix` | Auto-format all code     | Before committing          |

---

## 🔧 Development Tips & Tricks

### 1. Component Development

```bash
# Create new component efficiently
# File: client/components/MyNewComponent.tsx
```

Use this template for new components:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MyNewComponentProps {
  // Define props here
}

export default function MyNewComponent({}: MyNewComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Title</CardTitle>
      </CardHeader>
      <CardContent>{/* Component content */}</CardContent>
    </Card>
  );
}
```

### 2. Tailwind CSS Efficiency

- Use **Tailwind CSS IntelliSense** for autocomplete
- Common patterns in this project:

  ```css
  /* Cards */
  .card-style {
    @apply bg-white border border-civic-blue-200 rounded-lg shadow-sm;
  }

  /* Buttons */
  .btn-primary {
    @apply bg-civic-blue-500 hover:bg-civic-blue-600 text-white;
  }

  /* Gradients */
  .gradient-bg {
    @apply bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50;
  }
  ```

### 3. Route Development

Add new pages in `client/pages/` and register in `client/App.tsx`:

```tsx
// In App.tsx
<Route path="/my-new-page" element={<MyNewPage />} />
```

### 4. API Development

Add new endpoints in `server/routes/` following the existing pattern.

---

## 🚨 Common Issues & Solutions

### Issue: Port 5173 Already in Use

```bash
# Solution 1: Kill the process
npx kill-port 5173

# Solution 2: Use different port
npm run dev -- --port 3000
```

### Issue: TypeScript Errors

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Issue: Slow Build Times

```bash
# Clear cache
rm -rf node_modules/.vite
rm -rf dist
npm install
npm run dev
```

### Issue: VS Code Extensions Not Working

1. **Restart VS Code**
2. **Reload Window**: Ctrl+Shift+P → "Developer: Reload Window"
3. **Check Extension Status**: View → Extensions

---

## 🔍 Testing Your Setup

### 1. Frontend Test

- Navigate to `http://localhost:5173`
- Should see the CivicConnect homepage
- Try navigating to `/report` - should load the issue reporting form

### 2. Components Test

- Check if Tailwind styles are loading (gradients, colors)
- Test responsive design (resize browser window)
- Verify icons from Lucide React are showing

### 3. Development Features Test

- Make a small change to any `.tsx` file
- Should see hot reload without full page refresh
- Check browser console for any errors

---

## 📊 Performance Optimization

### Development Mode

- Keep dev tools open for performance monitoring
- Use React Developer Tools browser extension
- Monitor network tab for slow API calls

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### Code Splitting (Already Configured)

The project uses React Router for automatic code splitting by route.

---

## 🎨 UI Development Best Practices

### 1. Use Existing Components

Always check `client/components/ui/` before creating new components.

### 2. Follow Design System

- Colors: Use `civic-blue-*`, `civic-green-*`, `civic-orange-*`
- Spacing: Follow Tailwind's spacing scale
- Typography: Use consistent text sizes

### 3. Responsive Design

```tsx
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🚀 Deployment Ready

### Production Build

```bash
npm run build
npm run start  # Test production build locally
```

### Environment Variables

Create `.env` file for environment-specific settings:

```env
# Add your environment variables here
VITE_API_URL=http://localhost:3000
```

---

## 🆘 Getting Help

1. **Check the console** - Most errors show helpful messages
2. **TypeScript errors** - Hover over red squiggles in VS Code
3. **Component issues** - Check the component props and imports
4. **Styling issues** - Verify Tailwind classes in browser dev tools

---

## ✅ Success Checklist

- [ ] Node.js 18+ installed
- [ ] VS Code with recommended extensions
- [ ] Project cloned and dependencies installed
- [ ] `npm run dev` starts successfully
- [ ] Can access `http://localhost:5173`
- [ ] Hot reload working (test by editing a file)
- [ ] No TypeScript errors in VS Code
- [ ] All features loading (Report, Track, Admin, etc.)

**🎉 You're ready to develop efficiently!**
