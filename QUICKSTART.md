# 🚀 Quick Start Guide

Get your JobHub project running in 5 minutes!

## Step 1: Prerequisites Check
Make sure you have Node.js installed:
```bash
node --version
npm --version
```
If not installed, download from: https://nodejs.org/

## Step 2: Project Setup
```bash
# Navigate to project directory
cd static-job-listings-master

# Install dependencies
npm install
```

## Step 3: Configure Gemini API
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create new API key"
3. Copy the key
4. Open `.env` file in your project
5. Replace `your-gemini-api-key-here` with your API key:
   ```
   VITE_GEMINI_API_KEY=your-copied-key-here
   ```
6. Save the file

## Step 4: Start Development Server
```bash
npm run dev
```

Your browser will automatically open to: `http://localhost:5173`

## 🎉 You're Done!

### Available Pages:
- **Landing Page**: `http://localhost:5173/landing.html`
- **Job Listings**: `http://localhost:5173/`

### Next Steps:
1. Explore the job listings
2. Try the dark mode toggle (moon icon)
3. Test CV matching feature (requires React setup)
4. Search and filter jobs

## 📝 Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop the server
Press Ctrl + C in terminal
```

## ❓ Quick Troubleshooting

**Error: "Cannot find module 'vite'"**
- Run: `npm install`

**Error: "VITE_GEMINI_API_KEY is not set"**
- Make sure `.env` file exists
- Check API key is correctly pasted
- Restart server: `npm run dev`

**Port 5173 already in use**
- Vite will use port 5174 instead
- Or edit `vite.config.js` to change port

## 🎨 Project Features (Try These!)

### On Job Listings Page:
- ✅ Search by company, position, or location
- ✅ Filter by clicking on skills/tags
- ✅ Toggle dark mode with moon icon
- ✅ View different job categories

### With React Components:
- 📊 Check CV/Resume fit percentage
- 🤖 Get AI company insights
- 💡 See interview questions
- 💰 View salary estimates

---

**Need help?** Read the full `SETUP.md` guide!
