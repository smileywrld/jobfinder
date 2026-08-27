# JobHub - AI-Powered Job Listings Platform

A comprehensive job listings platform with advanced filtering, search capabilities, and AI-powered features for job seekers.

## 🚀 Features

- **📋 Comprehensive Job Database**: 40+ job listings across 8+ industries
- **🔍 Advanced Search & Filtering**: Filter by role, level, location, technologies, and more
- **🤖 AI-Powered Features**:
  - CV/Resume matching with fit percentage analysis
  - Company culture and interview question insights
  - Salary range estimation
  - Career advice generation
- **🌓 Dark Mode Toggle**: Seamless dark mode support across all pages
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ Fast Performance**: Built with modern web technologies
- **♿ Accessible**: WCAG compliant with keyboard navigation

## 📁 Project Structure

```
job-listings-platform/
├── components/
│   ├── GeminiAssistant.jsx    # AI Assistant component
│   └── JobCard.jsx             # Job card with AI features
├── utils/
│   └── gemini.js               # Gemini API utilities
├── index.html                  # Main job listings page
├── landing.html                # Landing page
├── style.css                   # Job listings styles
├── landing.css                 # Landing page styles
├── script.js                   # Job listings logic
├── theme.js                    # Dark mode functionality
├── data.json                   # Job listings data
├── gemini-api.js               # Gemini API integration
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies
├── .env                        # Environment variables (add your API key)
└── .env.example                # Example environment file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or download the project**
```bash
cd static-job-listings-master
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Gemini API**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Open `.env` file in the project root
   - Replace `your-gemini-api-key-here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your-actual-api-key
   ```

4. **Start the development server**
```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

## 📚 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Alternative: Run simple HTTP server (no build tools needed)
npm run serve
```

## 🎯 How to Use

### Job Listings Page (`index.html`)
1. **Search**: Use the search bar to find jobs by company, position, or location
2. **Filter**: Click on tags to filter by skills, role, or level
3. **Clear Filters**: Click "Clear" button to reset all filters
4. **View Details**: Click on job cards to see full information

### AI Features (With React Components)
1. **Check My Fit %**: 
   - Click the "Check My Fit %" button
   - Paste your CV/resume
   - Get instant match percentage and recommendations

2. **AI Company Insight**:
   - Click the "AI Company Insight" button
   - View company culture overview
   - See likely interview questions
   - Check estimated salary range
   - Get application tips

### Dark Mode
- Click the moon/sun icon in the top navigation
- Your preference is saved automatically

## 📊 Job Categories

The platform includes jobs across these categories:
- 💻 Software Development
- 🎨 Design
- 📊 Data & Analytics
- 📈 Marketing
- 💰 Finance & Sales
- 👥 Human Resources
- 🏫 Education
- 📸 Creative Services

## 🤖 Gemini AI Integration

The platform uses Google's Gemini AI for intelligent features:

### Available Functions
```javascript
import { 
  callGemini,
  generateJobDescription,
  getInterviewQuestions,
  getSalaryInsights,
  getCareerAdvice,
  analyzeJobRequirements 
} from './utils/gemini.js'

// Example usage
const response = await callGemini('Your custom prompt here')
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css` and `landing.css`:
```css
:root {
  --primary-color: hsl(180, 29%, 50%);      /* Teal */
  --bg-color: hsl(180, 52%, 96%);           /* Light blue-gray */
  --text-dark: hsl(180, 14%, 20%);          /* Dark blue-gray */
  --text-gray: hsl(180, 8%, 52%);           /* Medium gray */
}
```

### Update Job Data
Edit `data.json` to add/remove job listings

### Modify Landing Page
Edit `landing.html` to customize content and sections

## 🔐 Security Notes

⚠️ **Important**: Never commit your actual API key to version control
- The `.env` file is for local development only
- Use `.env.example` as a template
- For production, use environment variables from your hosting platform

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

### React Components
- `components/GeminiAssistant.jsx` - Full-featured AI assistant
- `components/JobCard.jsx` - Job card with AI matching

### Utilities
- `utils/gemini.js` - Gemini API wrapper functions
- `theme.js` - Dark mode implementation
- `script.js` - Vanilla JS job filtering and search

## 🐛 Troubleshooting

### "VITE_GEMINI_API_KEY is not set" Error
- Make sure `.env` file exists in project root
- Check that your API key is correctly pasted
- Restart the development server after updating `.env`

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Port 5173 Already in Use
Edit `vite.config.js` and change the port number:
```javascript
server: {
  port: 3000,  // or any other available port
}
```

## 📖 Documentation

- [Gemini API Docs](https://ai.google.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💬 Support

For issues or questions:
1. Check this README for troubleshooting
2. Review the code comments
3. Check Gemini API documentation
4. Open an issue with details

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Connect your Git repository to Netlify
3. Set environment variable `VITE_GEMINI_API_KEY` in Netlify dashboard

### Deploy to GitHub Pages
1. Add to `vite.config.js`:
```javascript
base: '/repository-name/'
```
2. Run `npm run build`
3. Deploy the `dist` folder

---

**Built with ❤️ using React, Vite, and Google Gemini AI**
