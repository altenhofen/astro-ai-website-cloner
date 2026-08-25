# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, static Astro site using AI coding agents. The Astro + HTML + Tailwind CSS v4 base is pre-scaffolded — follow the clone workflow in `docs/research/CLONE_WORKFLOW.md` for each target URL.

## Tech Stack
- **Framework:** Astro 7 with static output and file-based routing
- **Markup:** Astro components that render semantic HTML
- **Styling:** Tailwind CSS v4 through the official Vite plugin, with oklch design tokens
- **Interactivity:** Browser-native vanilla JavaScript only; no React, JSX, framework islands, or hydration by default
- **Deployment:** Any static host; `astro preview` is available for local/container previews

## Commands
- `npm run dev` — Start the Astro development server
- `npm run build` — Generate the production site in `dist/`
- `npm run preview` — Preview the generated static site
- `npm run lint` — Run ESLint for Astro and vanilla JavaScript files
- `npm run typecheck` — Run `astro check`
- `npm run check` — Run lint + typecheck + build

## Code Style
- Use `.astro` files for page and component markup
- Use semantic HTML and accessible native controls before adding JavaScript
- Use plain `.js` modules and DOM APIs for client behavior
- Use Tailwind utility classes; keep custom CSS in `src/styles/global.css` or scoped Astro styles
- No React, JSX, shadcn/ui, or client framework dependencies
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  pages/            # Astro routes; index.astro maps to /
  layouts/          # Shared HTML document layouts
  components/       # Reusable .astro components
  styles/           # Global Tailwind entrypoint and shared CSS
  scripts/          # Vanilla browser JavaScript modules
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
  sites/            # Namespaced assets for cloned targets

docs/
  research/         # Inspection output, clone workflow, and component specs
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts and repository tooling
```

## Agent Standard

`AGENTS.md` is the only repository-level instruction file. All agents should follow this document and the referenced research workflow; keep agent-specific behavior out of the repository.

When delegating work, use isolated worktrees and preserve unrelated routes, components, research artifacts, screenshots, and asset namespaces. Run `npm run typecheck` and `npm run build` after meaningful changes. Do not introduce a framework island just to avoid writing a small DOM event handler.

## Reference Documents

- `docs/research/INSPECTION_GUIDE.md` — what to extract from a target site
- `docs/research/CLONE_WORKFLOW.md` — the end-to-end Astro cloning workflow
