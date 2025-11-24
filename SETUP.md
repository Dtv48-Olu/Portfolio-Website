# Setup Guide - Dynamic Developer Portfolio

## 🚀 Getting Started (5 Minutes)

This guide will help you get your portfolio up and running locally and customize it with your own content.

---

## Step 1: Install Dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind CSS, and all required dependencies.

**Troubleshooting:**
- If you get permission errors, try `sudo npm install` (Mac/Linux) or run terminal as administrator (Windows)
- Node version issues? Ensure you're on Node 18+: `node --version`

---

## Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the portfolio with the sample projects!

**Hot Reload:** Any changes you make to files will automatically update in the browser.

---

## Step 3: Add Your Personal Information

### 3.1 Update Hero Section

Open `components/Hero.tsx` and update:

**Line 20-22:** Replace initials
```tsx
<div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold">
  YI  {/* Change "OO" to your initials */}
</div>
```

**Line 27-29:** Update name
```tsx
<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
  Your Full Name  {/* Replace "Olu Odufowokan" */}
</span>
```

**Line 32-33:** Update title
```tsx
<p className="text-xl md:text-2xl text-slate-300 mb-4 animate-fade-in animation-delay-200">
  Your Professional Title  {/* e.g., "Full Stack Developer" */}
</p>
```

**Line 38-41:** Update bio
```tsx
<p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in animation-delay-400">
  Your bio here. Keep it concise (2-3 sentences) and focus on what makes you unique.
</p>
```

### 3.2 Update Social Links

**GitHub:** Line 57-62
```tsx
href="https://github.com/YOUR-USERNAME"
```

**LinkedIn:** Line 70-75
```tsx
href="https://linkedin.com/in/YOUR-PROFILE"
```

### 3.3 Add Your Resume

1. Save your resume as `resume.pdf`
2. Place it in `public/docs/resume.pdf`
3. The link is already configured in `Hero.tsx` line 46

---

## Step 4: Add Your Projects

Edit `data/manual-projects.json` to add or override entries, then regenerate `data/projects.json` so the automatic sync picks up your changes:

```bash
npm run sync-projects
```

### Project Schema

```json
{
  "id": "unique-kebab-case-id",
  "title": "Project Name",
  "description": "One sentence describing what the project does and the tech used.",
  "status": "shipped",
  "progress": 100,
  "techStack": ["React", "Node.js", "PostgreSQL"],
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://live-demo-url.com",
    "docs": "https://documentation-url.com"
  }
}
```

### Status Values

- **"shipped"**: Complete, production-ready projects
  - Set `progress: 100`
  - Shows in green-themed "Shipped" section
  - Display prominent "View Code" buttons

- **"building"**: Currently in development
  - Set `progress: 0-99` (realistic percentage)
  - Shows in green terminal-themed "In the Lab" section
  - Displays animated progress bar
  - Badge has pulse animation

- **"planned"**: Future projects you're planning
  - Set `progress: 0`
  - Shows in blue blueprint-themed "On the Radar" section
  - Lower opacity, "sketch" aesthetic
  - Links can be "#" placeholders

### Best Practices

**Descriptions:**
- Keep under 150 characters
- Focus on the problem solved + tech used
- Use active voice: "Building..." not "Built..."
- Example: "Full-stack e-commerce platform with real-time inventory tracking using React, Express, and MongoDB."

**Tech Stack:**
- List 3-6 most important technologies
- Use consistent naming (e.g., always "JavaScript" not sometimes "JS")
- Order by prominence in the project
- Include frameworks, languages, and key tools

**Links:**
- GitHub: Required for shipped/building projects
- Demo: Add if you have a live deployment
- Docs: Optional - add if you have detailed documentation
- Use `"#"` as placeholder for future links

### Example: Complete Project Entry

```json
{
  "id": "task-manager-pro",
  "title": "TaskManager Pro",
  "description": "Collaborative task management app with real-time updates, team workspaces, and AI-powered priority suggestions using Next.js and OpenAI.",
  "status": "building",
  "progress": 65,
  "techStack": ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS"],
  "links": {
    "github": "https://github.com/yourusername/taskmanager-pro",
    "demo": "#",
    "docs": "#"
  }
}
```

After editing, run `npm run sync-projects` again to regenerate `data/projects.json` before validating or building.

---

## Step 5: Customize Colors & Styling (Optional)

### Update Theme Colors

Edit `tailwind.config.js` (lines 10-18):

```javascript
colors: {
  terminal: {
    green: '#00ff41',  // Color for "Building" projects
    dark: '#0d1117',
    border: '#30363d',
  },
  blueprint: {
    blue: '#0a84ff',   // Color for "Planned" projects
    light: '#64d2ff',
  },
},
```

### Change Background Gradient

Edit `app/layout.tsx` (line 27):

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
```

Try:
- `from-blue-950 via-slate-900 to-purple-950` (Blue-purple gradient)
- `from-slate-900 via-slate-950 to-black` (Darker theme)
- `bg-slate-950` (Solid color, no gradient)

---

## Step 6: Test the Interactive Features

### Tech Filter

1. Click any technology tag (e.g., "React")
2. All projects using that tech should highlight across all zones
3. Click again or press "✕ Clear" to reset

### Progress Bars

- Only visible in "In the Lab" section
- Animate on page load
- Width matches the `progress` percentage

### Responsive Design

Test at different screen sizes:
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Single column, stacked

Open Chrome DevTools (F12) and toggle device toolbar (Ctrl+Shift+M)

---

## Step 7: Build for Production

### Local Build Test

```bash
npm run build
```

This creates an optimized production build. Check for any errors.

### Preview Production Build

```bash
npm run start
```

View the production build at [http://localhost:3000](http://localhost:3000)

---

## Deployment Options

### Option A: Vercel (Recommended - Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

**Done!** Vercel automatically detects Next.js and configures everything.

### Option B: GitHub Pages

1. Update `package.json` scripts:
```json
"scripts": {
  "export": "next build && next export",
  "deploy": "npm run export && touch out/.nojekyll && gh-pages -d out -t true"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Update `next.config.js`:
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

4. Deploy:
```bash
npm run deploy
```

### Option C: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import existing project"
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `out`
7. Click "Deploy"

---

## Common Issues & Solutions

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading

1. Check `globals.css` has Tailwind directives at the top
2. Verify `tailwind.config.js` content paths include your files
3. Hard refresh: Ctrl+Shift+R

### JSON parsing errors

- Validate at [jsonlint.com](https://jsonlint.com)
- Common issues:
  - Missing commas between objects
  - Single quotes instead of double quotes
  - Trailing comma on last item
  - Unescaped special characters

### Progress bar not animating

- Check `progress` is a number, not a string: `"progress": 50` not `"progress": "50"`
- Ensure value is between 0-100

### Projects not filtering correctly

- Verify `techStack` is an array: `["React", "Node.js"]` not `"React, Node.js"`
- Check spelling/capitalization matches across projects

---

## Development Tips

### Project Organization

Keep your `projects.json` organized:
```json
[
  // ===== SHIPPED PROJECTS =====
  { "status": "shipped", ... },
  
  // ===== BUILDING PROJECTS =====
  { "status": "building", ... },
  
  // ===== PLANNED PROJECTS =====
  { "status": "planned", ... }
]
```

### Regular Updates

Update project progress weekly:
1. Open `projects.json`
2. Find "building" projects
3. Update `progress` value
4. Git commit: `git commit -m "Update project progress"`
5. Push changes

Auto-deploys if using Vercel/Netlify!

### Adding More Sections

Want to add a blog, contact form, or skills section?

Create new components:
```bash
# Create new component
touch components/Skills.tsx

# Import in app/page.tsx
import Skills from '@/components/Skills'

# Add to page
<Skills />
```

---

## Next Steps

- [ ] Replace sample projects with your real projects
- [ ] Update all personal information
- [ ] Add your resume PDF
- [ ] Test on mobile devices
- [ ] Deploy to production
- [ ] Share on LinkedIn/Twitter!

---

## Need Help?

- Review the main README.md for detailed documentation
- Check existing components for examples
- Open an issue on GitHub
- Refer to [Next.js docs](https://nextjs.org/docs)
- Refer to [Tailwind docs](https://tailwindcss.com/docs)

---

**You're all set! 🎉**

Your portfolio is now a living document that grows with your career—run `npm run sync-projects` whenever you add new work, and everything else updates automatically.