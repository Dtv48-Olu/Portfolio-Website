# ⚡ Quick Start (2 Minutes)

## 1. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 2. Customize Your Info

### `components/Hero.tsx`
- Line 21: Change "OO" to your initials
- Line 28: Your name
- Line 33: Your title
- Line 39: Your bio
- Line 58: GitHub URL
- Line 71: LinkedIn URL

### `public/docs/`
Add your `resume.pdf` here

## 3. Add Your Projects

Add or override entries in `data/manual-projects.json`, then regenerate `data/projects.json`:

```bash
npm run sync-projects   # merges manual entries with live GitHub repos
```

(You can still edit `data/projects.json` directly if you prefer.) Use the schema below for each entry:

```json
{
  "id": "my-project",
  "title": "Project Name",
  "description": "What it does and tech used.",
  "status": "shipped",
  "progress": 100,
  "techStack": ["React", "Node.js"],
  "links": {
    "github": "https://github.com/you/repo",
    "demo": "https://demo.com"
  }
}
```

**Status Options:**
- `"shipped"` - Done (progress: 100)
- `"building"` - In progress (progress: 0-99)
- `"planned"` - Future project (progress: 0)

## 4. Validate & Build

```bash
npm run sync-projects   # Regenerate data/projects.json
npm run validate        # Check your data
npm run build           # Build for production
```

## 5. Deploy

**Vercel (easiest):**
1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Deploy!

**GitHub Pages:**
```bash
npm run export
# Deploy the `out/` folder
```

---

**Done!** 🎉

See `SETUP.md` for detailed instructions.
See `README.md` for complete documentation.