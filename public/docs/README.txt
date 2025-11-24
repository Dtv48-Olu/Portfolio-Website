RESUME PLACEHOLDER
==================

To complete your portfolio setup, please add your resume PDF to this directory.

Expected filename: resume.pdf

The Hero component in your portfolio links to: /docs/resume.pdf

Steps:
1. Save your resume as "resume.pdf"
2. Place it in this directory (Portfolio-Website/public/docs/)
3. The link will automatically work once the file is present

Alternative:
If you want to use a different filename or location, update the href in:
Portfolio-Website/components/Hero.tsx (line ~46)

Example:
  href="/docs/your-custom-filename.pdf"

Note: The public/ directory is served at the root URL, so /public/docs/resume.pdf
becomes accessible at https://your-domain.com/docs/resume.pdf
