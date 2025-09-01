# 🎓 Student Guide: Running CivicConnect on VS Code

## 📊 Complete Setup Flowchart

```
                           🚀 START HERE 🚀
                                  │
                                  ▼
                    ┌────────────���────────────────┐
                    │   Check Prerequisites      │
                    │   ✅ Computer with internet │
                    │   ✅ Windows/Mac/Linux     │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
           ┌──────────────────────────────────────────────┐
           │              STEP 1: Install Software        │
           └──────────────────┬───────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    Install Node.js                          │
    │  🔗 https://nodejs.org/                                     │
    │  ➤ Download LTS version (18+)                              │
    │  ➤ Run installer → Next → Next → Install                   │
    │  ➤ Test: Open terminal → type "node --version"             │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                     Install Git                             │
    │  🔗 https://git-scm.com/                                    │
    │  ➤ Download for your OS                                    │
    │  ➤ Install with default settings                           │
    │  ➤ Test: Terminal → type "git --version"                   │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                   Install VS Code                           │
    │  🔗 https://code.visualstudio.com/                          │
    │  ➤ Download for your OS                                    │
    │  ➤ Install and open VS Code                                │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────────────────────┐
           │              STEP 2: Setup VS Code           │
           └──────────────────┬───────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │              Install Required Extensions                    │
    │                                                             │
    │  In VS Code: Ctrl+Shift+X (Extensions panel)               │
    │                                                             │
    │  🔧 REQUIRED EXTENSIONS:                                    │
    │  ➤ "ES7+ React/Redux/React-Native snippets"                │
    │  ➤ "Tailwind CSS IntelliSense"                             │
    │  ➤ "TypeScript Importer"                                   │
    │  ➤ "Prettier - Code formatter"                             │
    │  ➤ "Auto Rename Tag"                                       │
    │                                                             │
    │  💡 Search each name → Install → Reload when done          │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────────────────────┐
           │              STEP 3: Get Project Code        │
           └──────────────────┬──────���────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                   Clone Repository                          │
    │                                                             │
    │  📁 Create a folder for your projects (e.g., Desktop)      │
    │                                                             │
    │  Open Terminal in VS Code: Ctrl+` (backtick)               │
    │                                                             │
    │  Type these commands one by one:                           │
    │  ┌─────────────────────────────────────────────────────┐   │
    │  │ cd Desktop                                          │   │
    │  │ git clone [REPO_URL]                               │   │
    │  │ cd Civic-20Connect                                 │   │
    │  └─────────────────────────────────────────────────────┘   │
    │                                                             │
    │  📝 Note: Replace [REPO_URL] with your actual repo URL     │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────────────────────┐
           │          STEP 4: Install Dependencies        │
           └──────────────────┬───────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                Install Project Packages                     │
    │                                                             │
    │  In VS Code Terminal (Ctrl+`):                             │
    │  ┌─────────────────────────────────────────────────────┐   │
    │  │ npm install                                         │   │
    │  └─────────────────────────────────────────────────────┘   │
    │                                                             │
    │  ⏳ Wait 2-5 minutes (downloading packages)                │
    │  ✅ Success: "added X packages" message                    │
    │                                                             │
    │  ❌ If error: Try "npm cache clean --force" then retry     │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────────────────────┐
           │            STEP 5: Start the App             │
           └────────────��─────┬───────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                 Run Development Server                      │
    │                                                             │
    │  In VS Code Terminal:                                       │
    │  ┌─────────────────────────────────────────────────────┐   │
    │  │ npm run dev                                         │   │
    │  └─────────────────────────────────────────────────────┘   │
    │                                                             │
    │  🎉 SUCCESS MESSAGES:                                      │
    │  ➤ "VITE v7.1.2 ready in XXX ms"                          │
    │  ➤ "Local: http://localhost:5173/"                        │
    │  ➤ "Network: http://xxx.xxx.xxx.xxx:5173/"                │
    │                                                             │
    │  🌐 Your app is now running!                               │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────────────────────┐
           │              STEP 6: Test Your Setup         │
           └──────────────────┬───────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    Verify Everything Works                  │
    │                                                             │
    │  🌐 Open Browser → Go to http://localhost:5173             │
    │                                                             │
    │  ✅ WHAT YOU SHOULD SEE:                                   │
    │  ➤ CivicConnect homepage with blue/green design           │
    │  ➤ "Report an Issue" button                               │
    │  ➤ Navigation menu (Community, Analytics, Rewards)        │
    │                                                             │
    │  🧪 TEST FEATURES:                                         │
    │  ➤ Click "Report an Issue" → Should load form             │
    │  ➤ Click "Admin Dashboard" → Should show admin panel      │
    │  ➤ Resize browser → Should be responsive                  │
    └─────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
                   ┌─────────────────┐
                   │   🎊 SUCCESS!   │
                   │  App is running │
                   │   Start coding  │
                   └─────────────────┘
```

---

## 🛠️ Quick Command Reference

### Essential Commands for Students

| **Command** | **What it does** | **When to use** |
|-------------|------------------|-----------------|
| `node --version` | Check if Node.js is installed | After installing Node.js |
| `git --version` | Check if Git is installed | After installing Git |
| `cd [folder]` | Change to a folder | Navigate to project |
| `git clone [url]` | Download project from GitHub | Get the code |
| `npm install` | Install all project dependencies | Setup project |
| `npm run dev` | Start development server | Every time you code |
| `Ctrl+C` | Stop the development server | When done coding |
| `Ctrl+` | Open/close terminal in VS Code | Quick terminal access |

---

## 🔧 Required VS Code Extensions (Copy-Paste Names)

```
ES7+ React/Redux/React-Native snippets
Tailwind CSS IntelliSense
TypeScript Importer
Prettier - Code formatter
Auto Rename Tag
```

**How to install:**
1. Open VS Code
2. Press `Ctrl+Shift+X`
3. Search for each extension name
4. Click "Install"
5. Reload VS Code when done

---

## 🚨 Common Student Problems & Solutions

### ❌ Problem: "node is not recognized"
**Solution:**
1. Reinstall Node.js from nodejs.org
2. Restart your computer
3. Test: `node --version` in terminal

### ❌ Problem: "npm install" fails
**Solutions to try:**
```bash
# Try these one by one:
npm cache clean --force
npm install

# If still fails:
npm install --legacy-peer-deps
```

### ❌ Problem: "Port 5173 is already in use"
**Solution:**
```bash
# Kill the process and try again:
npx kill-port 5173
npm run dev
```

### ❌ Problem: Extensions not working
**Solution:**
1. Press `Ctrl+Shift+P`
2. Type "Developer: Reload Window"
3. Press Enter

### ❌ Problem: Tailwind CSS not working
**Solution:**
1. Make sure "Tailwind CSS IntelliSense" extension is installed
2. Restart VS Code
3. Check if `tailwind.config.ts` file exists in project

---

## 📱 Testing Checklist for Students

### ✅ Basic Setup Test
- [ ] Node.js version shows (should be 18+)
- [ ] Git version shows
- [ ] VS Code opens without errors
- [ ] All 5 extensions installed

### ✅ Project Setup Test
- [ ] Project folder downloaded
- [ ] `npm install` completed successfully
- [ ] `package.json` file exists in project

### ✅ Development Server Test
- [ ] `npm run dev` starts without errors
- [ ] Browser opens automatically
- [ ] Homepage loads with CivicConnect design
- [ ] No red errors in browser console (F12)

### ✅ Feature Test
- [ ] Can click "Report an Issue"
- [ ] Can navigate to different pages
- [ ] Images and icons load properly
- [ ] Page is responsive (try mobile view)

---

## 🎯 What Success Looks Like

### In Terminal:
```
> npm run dev

  VITE v7.1.2  ready in 559 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://172.19.5.114:5173/
```

### In Browser:
- Beautiful CivicConnect homepage
- Blue and green color scheme
- "Report. Track. Resolve." heading
- Working navigation buttons
- No error messages

### In VS Code:
- No red squiggly lines in code
- Autocomplete works when typing
- File explorer shows project structure
- Terminal shows no errors

---

## 🆘 Need Help?

### Quick Fixes:
1. **Restart everything:** Close VS Code → Restart computer → Try again
2. **Clean install:** Delete `node_modules` folder → Run `npm install` again
3. **Check internet:** Make sure you're connected when running `npm install`

### Check Your Setup:
```bash
# Run these to verify your setup:
node --version        # Should show v18+ 
npm --version         # Should show 8+
git --version         # Should show 2+
```

### Still Stuck?
1. Take a screenshot of the error
2. Note which step you're on
3. Ask for help with specific details

---

## 🎉 You're Ready to Code!

Once everything is working:
- **Start coding:** Make changes to files in `client/` folder
- **See changes instantly:** Save file → Browser updates automatically
- **Stop server:** Press `Ctrl+C` in terminal when done
- **Start again:** Run `npm run dev` next time you want to code

**Happy coding! 🚀**
