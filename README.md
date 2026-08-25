<div align="center">

# AI Website Cloner Template

### Clone any website with one command

Give your AI coding agent a URL and watch it recreate the website as a clean Astro site.

Based on the [AI Website Cloner by JCodesMore](https://github.com/JCodesMore/ai-website-cloner-template)

</div>

## Prerequisites

- Git
- [Node.js](https://nodejs.org/) 24 or newer
- npm (included with Node.js)
- An editor or coding agent that follows `AGENTS.md`

## How to start

1. Create your own repository from this template or fork it.
2. Clone your copy and enter the project directory:

   ```bash
   git clone https://github.com/<owner>/<repository>.git
   cd <repository>
   ```

   If the repository is already open locally, skip this step.

3. Install the locked dependency versions:

   ```bash
   npm ci
   ```

4. Open the project in your editor. With VS Code, run:

   ```bash
   code .
   ```

5. Read `AGENTS.md`. It is the only repository-level instruction file.
6. Read `docs/research/CLONE_WORKFLOW.md` before starting a clone.

## Run the site locally

Start Astro's development server:

```bash
npm run dev
```

Open the URL printed by Astro, usually [http://localhost:4321](http://localhost:4321). The development server reloads when files under `src/`, `public/`, or the project configuration change. Stop it with `Ctrl+C`.

Useful commands:

```bash
npm run dev        # Start the development server
npm run build      # Build the static site into dist/
npm run preview    # Preview the latest dist/ build locally
npm run lint       # Lint Astro and vanilla JavaScript files
npm run typecheck  # Run astro check
npm run check      # Run lint, typecheck, and build
```

Run `npm run check` after code or documentation changes. `npm run preview` serves the last completed build, so run `npm run build` first when you need to preview new changes.

### Optional Docker workflow

```bash
docker compose up dev --build   # Development server on port 3001
docker compose up app --build   # Production preview on port 3000
```

Use `docker compose down` to stop the containers.

## Clone a target website

1. Start the development server if you want to inspect the result while working.
2. Read `AGENTS.md` and `docs/research/CLONE_WORKFLOW.md`.
3. Provide one or more target URLs to your coding agent.
4. Inspect the original site at desktop, tablet, and mobile widths.
5. Keep extracted research under `docs/research/` and screenshots under `docs/design-references/`.
6. Keep cloned routes under `src/pages/`, reusable Astro components under `src/components/`, and downloaded assets under `public/`.
7. Use semantic HTML, Tailwind CSS, and browser-native vanilla JavaScript. Do not add a framework island for a small interaction.
8. Run `npm run check`, then run the built site with `npm run preview` for a final smoke test.


## Project standard

`AGENTS.md` is the only repository-level agent instruction file. Keep the workflow editor-independent and follow the research documents under `docs/research/`.

**Please don't open issues regarding the AI agent's behavior. This is a template for your own use, and the AI agent's performance may vary based on the target website and the agent itself.**
