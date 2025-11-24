# Dynamic Developer Portfolio

A modern, high-performance developer portfolio built with Next.js and Tailwind CSS that dynamically renders content based on a structured JSON configuration file.

## 🎯 Core Philosophy

**Content is separated from Code.** Update a single `data/projects.json` file to move projects between status categories ("Planned" → "In Progress" → "Completed"), and the UI automatically updates without requiring HTML/CSS edits.

## ✨ Features

- **Dynamic Project Zones**: Three distinct visual zones based on project status
  - 🚀 **Shipped**: Production-ready, polished projects with professional styling
  - ⚡ **In the Lab**: Active development with progress bars and pulse animations
  - 🎯 **On the Radar**: Planned projects with blueprint aesthetic
  
- **Smart Filtering**: Click any technology tag to highlight projects across all zones
- **Zero Maintenance**: Sections automatically hide when empty
- **Fully Responsive**: Optimized for all screen sizes
- **Performance Optimized**: Static site generation for instant loading
- **Accessible**: WCAG compliant with semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Portfolio-Website
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Updating Projects

All project data is managed through the `data/projects.json` file. Each project object requires:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "Short project description (1-2 sentences)",
  "status": "shipped" | "building" | "planned",
  "progress": 0-100,
  "techStack": ["Technology", "Framework", "Tool"],
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://demo-url.com",
    "docs": "https://docs-url.com"
  }
}
```

### Status Types

- **`shipped`**: Completed, production-ready projects
- **`building`**: Currently in development (shows progress bar)
- **`planned`**: Future projects in planning phase

### Example Workflow

To move a project from "Planned" to "In Progress":

1. Open `data/projects.json`
2. Find your project
3. Change `"status": "planned"` to `"status": "building"`
4. Update `"progress": 0` to current completion percentage (e.g., `"progress": 35`)
5. Save the file

The UI will automatically reflect these changes!

## 🎨 Customization

### Hero Section

Edit `components/Hero.tsx` to update:
- Your name and bio
- Profile image/initials
- Resume link
- Social media links (GitHub, LinkedIn)

### Styling

The project uses Tailwind CSS with custom theme extensions in `tailwind.config.js`:

- **Terminal Green**: `#00ff41` - Used for "building" projects
- **Blueprint Blue**: `#0a84ff` - Used for "planned" projects
- **Emerald**: For "shipped" projects

Custom animations and utilities are defined in `app/globals.css`.

## 📦 Building for Production

### Static Export (GitHub Pages / Netlify)

```bash
npm run build
```

This generates a static site in the `out/` directory ready for deployment.

### Deploy to Vercel

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to GitHub Pages

1. Update `next.config.js` with your repository name if needed
2. Build the site: `npm run build`
3. Deploy the `out/` directory to your `gh-pages` branch

## 🏗️ Project Structure

```
Portfolio-Website/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main page with project zones
│   └── globals.css       # Global styles + Tailwind
├── components/
│   ├── Hero.tsx          # Hero section with bio
│   ├── ProjectZone.tsx   # Project category container
│   └── ProjectCard.tsx   # Individual project card
├── data/
│   └── projects.json     # Single source of truth for projects
├── public/
│   └── docs/
│       └── resume.pdf    # Your resume (add this)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind customization
└── package.json          # Dependencies
```

## 🔧 Advanced Configuration

### Adding New Project Fields

1. Update the `Project` interface in `app/page.tsx`
2. Modify `data/projects.json` schema
3. Update `ProjectCard.tsx` to display new fields

### Custom Zone Types

To add a new status category:

1. Add the status to the union type: `'shipped' | 'building' | 'planned' | 'yourNewStatus'`
2. Add styling in `ProjectCard.tsx` `getCardStyles()` function
3. Update the zone filter logic in `app/page.tsx`

## 🎯 Best Practices

### Writing Descriptions

- Keep descriptions under 150 characters
- Focus on impact and technology
- Use active voice
- Highlight unique challenges solved

### Tech Stack Tags

- Use consistent naming (e.g., "React" not "ReactJS")
- Limit to 4-6 most relevant technologies per project
- Order by importance/prominence in the project

### Progress Updates

For "building" projects:
- Update progress every 10-25% completion
- Be realistic—users appreciate honesty
- 100% progress should trigger a status change to "shipped"

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Fully static—no server required
- Optimized images and fonts
- Minimal JavaScript bundle

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🐛 Troubleshooting

### Build Errors

**"Cannot find module '@/...'"**
- Ensure `tsconfig.json` has the correct path mapping
- Run `npm install` again

**Tailwind styles not loading**
- Verify `tailwind.config.js` content paths
- Check `globals.css` has the `@tailwind` directives

### Development Issues

**Changes not reflecting**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear Next.js cache: `rm -rf .next`

**JSON parsing errors**
- Validate `projects.json` at [jsonlint.com](https://jsonlint.com)
- Ensure all strings use double quotes
- Check for trailing commas

## 📞 Support

For questions or issues, please open an issue on GitHub or reach out via the contact methods in the portfolio.

---

**Built with ❤️ using Next.js 14, React 18, and Tailwind CSS 3**