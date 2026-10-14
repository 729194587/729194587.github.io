# Xingyu Qian · Personal Terminal

An Astro static homepage inspired by macOS Terminal. Content is transcribed from the supplied resume, published unchanged at `public/resume.pdf`.

## Local development

Requires Node.js 22.12+ (GitHub Actions uses Node 24).

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run preview -- --host 127.0.0.1
```

Commands: `/about`, `/projects`, `/education`, `/skills`, `/contact`, `/help`, `/clear`. Commands append to the current session history; refreshing starts a new session. Tab completes commands, arrow keys recall input, and Escape closes suggestions. The command shortcuts offer the same experience without typing. This is a portfolio interface, not a system shell.

## Content and implementation

- `src/data/profile.ts`: resume-derived profile, contributions, skills and command labels.
- `src/pages/index.astro`: initial content and structured command output templates.
- `src/scripts/terminal.ts`: command execution, history, suggestions and copy action.
- `src/styles/global.css`: responsive terminal design and reduced-motion support.
- `public/resume.pdf`: supplied resume, also available without JavaScript.

The existing GitHub Pages workflow is retained. Only `main` deploys to production. This redesign is developed on `codex/terminal-homepage`; no production deployment is required for local review.
