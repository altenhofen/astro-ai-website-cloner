# Website Clone Workflow

Use this workflow when reverse-engineering and rebuilding one or more target URLs as pixel-perfect Astro sites.

The target URL or URLs are supplied in the request. Preserve every pathname as a distinct static route and isolate each target's research, screenshots, components, and assets. URLs that differ only by query string or fragment share a pathname, so resolve their route and state behavior explicitly in the output plan. Parallelize page work only after the shared foundation and output plan are fixed so concurrent builders cannot overwrite one another.

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section of the page, you write a detailed specification to a file, then hand that file to a specialist builder with everything they need. Extraction and construction happen in parallel, but extraction is meticulous and produces auditable artifacts.

## Stack Contract

The generated site uses:

- Astro with static output and file-based routing under `src/pages/`.
- `.astro` components that render semantic HTML.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Browser-native vanilla JavaScript only for client behavior.
- No React, JSX, shadcn/ui, framework islands, or hydration unless the user explicitly changes this contract.

Use standard `<a href>` links, native form controls, `data-*` attributes, `class:list`, and DOM APIs. A behavior that needs a small event listener must not become a framework component.

## Scope Defaults

The target is whatever page `$ARGUMENTS` resolves to. Clone exactly what's visible at that URL. Unless the user specifies otherwise, use these defaults:

- **Fidelity level:** Pixel-perfect — exact match in colors, spacing, typography, animations
- **In scope:** Visual layout and styling, semantic HTML structure and interactions, responsive design, mock data for demo purposes
- **Out of scope:** Real backend / database, authentication, real-time features, SEO optimization, accessibility audit
- **Customization:** None — pure emulation

If the user provides additional instructions (specific fidelity level, customizations, extra context), honor those over the defaults.

## Output Isolation and Route Preservation

Treat every target URL as durable project output, not as permission to replace whatever was built previously.

Choose an `<app-root>` before extraction. For a single application, `<app-root>` is the repository root (`.`). If different origins need separate applications, require the user to provide or approve a prepared Astro project root for each origin; verify each root builds independently, and never write one origin's output into another root.

Then assign each target:

- A collision-resistant `<site-key>`: a readable origin slug (including a non-default port) plus the first 8 lowercase hex characters of SHA-256 over the normalized origin.
- A collision-resistant `<page-key>`: a segment-preserving readable pathname slug plus the first 8 lowercase hex characters of SHA-256 over the normalized pathname and any stateful query/fragment; use `root-<hash>` for `/`. Never rely on lossy character replacement alone.
- An artifact root: `<app-root>/docs/research/<site-key>/<page-key>/`.
- A screenshot root: `<app-root>/docs/design-references/<site-key>/<page-key>/`.
- A component root: `<app-root>/src/components/sites/<site-key>/<page-key>/`, with genuinely shared same-site components under `<app-root>/src/components/sites/<site-key>/shared/`.
- An asset root: `<app-root>/public/sites/<site-key>/<page-key>/`, with genuinely shared same-site assets under `<app-root>/public/sites/<site-key>/shared/`.
- An Astro route file under `<app-root>/src/pages/`.

All paths in the remaining phases are relative to that target's `<app-root>`. Before writing, verify that every planned route, artifact root, screenshot root, component root, asset root, and downloader filename is unique or is an explicitly approved shared location.

Routing defaults:

- For the first single-URL clone in an untouched template, the existing scaffold at `src/pages/index.astro` may be replaced so the clone remains available at `/`.
- For multiple URLs from the same origin, or any later clone added to a project that already contains cloned/user-authored pages, preserve the normalized source pathname as a static Astro route. For example, `/docs/intro` becomes `<app-root>/src/pages/docs/intro.astro`; `/about` may also use `src/pages/about/index.astro`. Prefer the direct `.astro` filename for a single page.
- Inspect every existing `src/pages/**/*.astro`, `src/pages/**/*.md`, and `src/pages/**/*.mdx` before writing. Never delete or replace a non-scaffold route, component tree, research folder, screenshot, or asset namespace unless the user explicitly approves that exact replacement.
- Astro uses bracket filenames for dynamic routes. Treat literal brackets in a source pathname as data and percent-encode the filesystem segment rather than accidentally creating `[slug].astro` or `[...slug].astro`. Use dynamic routes only when the user explicitly needs generated paths and supplies the static path data.
- Query strings and fragments do not create separate Astro files. Preserve their behavior with native links, `URLSearchParams`, `location.hash`, and scoped vanilla JavaScript, and document the state mapping in the output plan.
- If the planned route already exists, stop and ask whether to update that route, choose another route, or skip it.
- URLs from different origins may require incompatible fonts, global CSS, layouts, and metadata. Before modifying files, ask whether the user wants separate prepared application roots (recommended) or an intentionally combined multi-site app with route-scoped styling. Do not create an unapproved monorepo or silently mix global foundations.

## Pre-Flight

1. **Browser automation is required.** Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP, etc.). Use whichever is available — if multiple exist, prefer Chrome MCP. If none are detected, ask the user which browser tool they have and how to connect it. This skill cannot work without browser automation.
2. Parse `$ARGUMENTS` as one or more URLs. Normalize and validate each URL; if any are invalid, ask the user to correct them before proceeding. For each valid URL, verify it is accessible via your browser MCP tool.
3. Verify the base project builds: `npm run build`. The Astro + HTML + Tailwind v4 scaffold should already be in place. If not, tell the user to set it up first.
4. Inventory existing routes (`src/pages/**/*.{astro,md,mdx}`), site component namespaces, research artifacts, screenshots, and public assets. Distinguish the untouched template scaffold from existing cloned or user-authored work.
5. Write an output plan listing every target URL, `<app-root>`, `<site-key>`, `<page-key>`, destination route, artifact roots, and whether any shared foundation file must change. Resolve collisions across every planned output, same-path query/fragment behavior, and multi-origin layout decisions with the user before editing.
6. Create only the planned per-page/per-site directories plus `scripts/` if needed. Use unique asset-download script names such as `scripts/download-assets-<site-key>-<page-key>.mjs`; do not overwrite another page's downloader.
7. For multiple pages from one origin, build the shared foundation once, sequentially, before parallel page work. Optionally confirm whether to run page builders in parallel (recommended if resources allow) or sequentially to avoid overload.

## Guiding Principles

### 1. Completeness Beats Speed

Every builder must receive everything it needs to do its job perfectly: screenshot, exact CSS values, downloaded assets with local paths, real text content, semantic structure, and interaction behavior. If a builder has to guess a color, font size, padding value, or client-side trigger, extraction is incomplete.

### 2. Small Tasks, Perfect Results

When a builder gets an entire feature section, it glosses over details. Give each builder a single focused component with exact CSS and behavior. If a section contains 3+ distinct sub-components, split them into sub-component builders plus one wrapper builder.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one builder. Break it into smaller pieces.

### 3. Real Content, Real Assets

Extract the actual text, alt attributes, aria labels, images, videos, and SVGs from the live site. Download every `<img>` and `<video>`, including positioned overlays and CSS background images. Inline SVGs may become `.astro` icon components or remain inline in the owning component. Do not use placeholders when the original content is recoverable.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens, the shared HTML document layout, global assets, and the smallest set of shared plain-JS utilities. Merge these carefully with existing routes, then run `npm run build`.

### 5. Extract How It Looks AND How It Behaves

For every element, extract its appearance (exact computed CSS via `getComputedStyle()`) and behavior (what changes, what triggers the change, and how the transition happens). Record scroll, hover, click, keyboard, resize, time, URL, and observer-driven behavior. Implement it with CSS and browser APIs before considering any additional library.

Examples include:

- A navbar that shrinks, changes background, or gains a shadow after scrolling past a threshold.
- Elements that animate into view with IntersectionObserver or CSS animations.
- Scroll snapping, sticky columns, parallax, and progress indicators.
- Dropdowns, dialogs, accordions, tabs, carousels, and toasts.
- Dark-to-light transitions between sections.
- URL/hash/query state and browser history behavior.
- Smooth-scroll libraries or custom scroll containers.

### 6. Identify the Interaction Model Before Building

Do not build click-based UI when the original is scroll-driven, or vice versa. First scroll through the section and observe changes. If the section changes on its own, extract whether it uses IntersectionObserver, scroll-snap, sticky positioning, CSS animation timelines, or scroll listeners. If nothing changes on scroll, test clicks and hovers. Write the interaction model explicitly: static, click-driven, hover-driven, scroll-driven, time-driven, URL-driven, or a combination.

### 7. Extract Every State, Not Just the Default

For tabbed or stateful content, activate every tab and record all content, assets, styles, and transitions. For scroll-dependent elements, capture computed styles at the initial and triggered positions. For hover states, capture before and after values plus transition timing. For responsive behavior, test 1440px, 768px, and 390px.

### 8. Spec Files Are the Source of Truth

Every component gets a specification file under the page's artifact root (`docs/research/<site-key>/<page-key>/components/`) BEFORE any builder is dispatched. The file is the contract between extraction and construction and remains an auditable artifact.

### 9. Build Must Always Compile

Every builder must run `npm run typecheck` before finishing. After assembly and merges, verify `npm run build` and the rendered route.

## Phase 1: Reconnaissance

Navigate to each target URL with browser MCP.

### Screenshots

Take full-page screenshots at desktop (1440px) and mobile (390px), plus tablet when layout changes. Save them to the page's screenshot root with descriptive names. These are the master references for builders.

### Global Extraction

Extract these from the page before doing anything else:

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check computed `font-family` on headings, body, code, and labels. Document every family, weight, and style actually used. In the Astro app, load fonts with `<link>` tags in the shared layout, `@font-face` rules in imported CSS, or local files under the planned public asset namespace. Never use framework-specific font loaders.

**Colors** — Extract the site's color palette from computed styles across the page. For a single-site app, merge target colors into `src/styles/global.css` without removing tokens required by existing routes. In an approved combined multi-site app, use a route wrapper or scoped token namespace instead of replacing another site's global palette.

**Favicons & Meta** — Download page/site SEO assets under the planned site asset namespace. Put truly app-global metadata in the shared Astro layout only when it applies to every route; otherwise set it in the destination page or a route layout.

**Global UI patterns** — Identify custom scrollbar rules, scroll-snap containers, keyframes, backdrop filters, gradients, smooth scrolling, and custom scroll wrappers. Merge only truly shared behavior into global CSS; keep page-specific behavior scoped to the page.

### Mandatory Interaction Sweep

This is a dedicated pass AFTER screenshots and BEFORE building:

**Scroll sweep:** Scroll slowly from top to bottom. Record header transitions, entrance animations, auto-switching sidebars, snap points, smooth scrolling, and exact thresholds.

**Click sweep:** Activate every button, tab, pill, link, card, form control, menu, modal, and accordion. Record the resulting DOM/state and all state-specific content.

**Hover and keyboard sweep:** Hover interactive elements and test focus, Enter, Space, Escape, arrow keys, and Tab order where relevant. Record visual changes and transitions.

**Responsive sweep:** Test 1440px, 768px, and 390px. Note layout changes and approximate breakpoints.

Save findings to `<artifact-root>/BEHAVIORS.md` and the section topology to `<artifact-root>/PAGE_TOPOLOGY.md`.

## Phase 2: Foundation Build

This is sequential per origin. Re-read the output plan and preserve every existing route before editing:

1. Merge fonts, metadata, and shared document behavior into the Astro layout without deleting requirements of existing routes.
2. Merge global CSS carefully. Use Tailwind utilities for layout and component styling; use scoped `<style>` blocks only for values that cannot be expressed cleanly with utilities.
3. Create plain JavaScript data modules only when content is shared. Do not create a framework state layer or TypeScript model solely for a static page.
4. Extract SVG icons into `.astro` components under `src/components/sites/<site-key>/shared/` or keep page-only icons inline. Name them by visual function (`SearchIcon`, `ArrowRightIcon`, `LogoIcon`).
5. Download assets into the planned namespace. Never write a generic filename over another page's asset.
6. Verify every previously existing route still builds, then run `npm run build`.

### Asset Discovery Script Pattern

Use browser MCP to enumerate all assets on the page:

```javascript
JSON.stringify({
  images: [...document.querySelectorAll('img')].map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    parentClasses: img.parentElement?.className,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex,
  })),
  videos: [...document.querySelectorAll('video')].map((video) => ({
    src: video.currentSrc || video.querySelector('source')?.src,
    poster: video.poster,
    autoplay: video.autoplay,
    loop: video.loop,
    muted: video.muted,
  })),
  backgroundImages: [...document.querySelectorAll('*')]
    .map((element) => ({
      element,
      background: getComputedStyle(element).backgroundImage,
    }))
    .filter(({ background }) => background && background !== 'none')
    .map(({ element, background }) => ({
      url: background,
      element: `${element.tagName}.${element.className?.toString().split(' ')[0] ?? ''}`,
    })),
  svgCount: document.querySelectorAll('svg').length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 200).map((el) => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((link) => ({ href: link.href, sizes: link.sizes?.toString() })),
});
```

Use the uniquely named page download script to fetch everything into its planned asset root. Batch downloads conservatively and validate media type, dimensions, and filenames.

### Optional Atlas Cloud Fallback for Unrecoverable Visual Assets

This is an exception path, not a default. Use it only when all bounded recovery attempts fail, no lawful local or same-site equivalent exists, the asset is not distinctive brand artwork, the user explicitly approves a generated substitute, and `ATLASCLOUD_API_KEY` is available. Never fabricate logos, trademarks, product screenshots, legal marks, or original copy. Record any approved generated fallback in `<artifact-root>/ARTIFACT_MANIFEST.md` with its model ID, prompt, prediction ID, output path, and approval.

## Phase 3: Component Specification & Dispatch

For each section, do THREE things: extract, write the spec, then dispatch builders.

### Step 1: Extract

For each section:

1. Capture an isolated screenshot.
2. Run `getComputedStyle()` extraction over the container and its important descendants. Include typography, color, background, spacing, dimensions, display, grid/flex, borders, radii, shadows, overflow, position, z-index, opacity, transform, transition, cursor, object fit, filters, and text overflow.
3. Capture all state diffs after scrolling, hovering, clicking, keyboard input, resizing, or changing URL state.
4. Extract real text, alt attributes, aria labels, placeholders, and form values verbatim.
5. Identify every image, video, background image, inline SVG, and planned local path, including layered compositions.
6. Record complexity and split distinct sub-components before dispatch.

### Step 2: Write the Component Spec File

**File path:** `docs/research/<site-key>/<page-key>/components/<component-name>.spec.md`

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/sites/<site-key>/<page-key>/<ComponentName>.astro`
- **Screenshot:** `docs/design-references/<site-key>/<page-key>/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | hover-driven | scroll-driven | time-driven | URL-driven>

## DOM Structure
<Describe the semantic HTML hierarchy>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...
- maxWidth: ...
- (every relevant property with exact values)

### Child elements
- tag and role: ...
- fontSize: ...
- color: ...
- (every relevant property)

## States & Behaviors

### <Behavior name>
- **Trigger:** <exact mechanism>
- **State A:** <exact values>
- **State B:** <exact values>
- **Transition:** <exact CSS transition or animation>
- **Implementation approach:** <CSS | DOM event listener | IntersectionObserver | ResizeObserver | URL API | Web Animations API>

### Hover and keyboard states
- **<Element>:** <before> -> <after>, transition: <value>

## Per-State Content (if applicable)
### State: "<name>"
- Title: "..."
- Cards: [{ title, description, image, link }, ...]

## Assets
- Background image: `public/sites/<site-key>/<page-key>/images/<file>.webp`
- Icons: `<ArrowIcon>`, `<SearchIcon>` from the planned Astro component namespace

## Text Content (verbatim)
<All text content copied from the live site>

## Responsive Behavior
- **Desktop (1440px):** ...
- **Tablet (768px):** ...
- **Mobile (390px):** ...
- **Breakpoint:** ...
```

Fill every section. If a section has no special behavior, write `N/A` only after checking hover, focus, keyboard, responsive, and loading states.

### Step 3: Dispatch Builders

**Simple section** (1-2 sub-components): one builder gets the entire section.

**Complex section** (3+ distinct sub-components): dispatch one builder per sub-component, then one wrapper builder after the sub-components are available.

Every builder receives:

- The full contents of its component spec inline in the prompt.
- The section screenshot path.
- The Astro target file path and any shared `.astro` components to import.
- The exact asset paths.
- Instruction to use semantic HTML, Tailwind classes, and vanilla JavaScript only.
- Instruction to verify with `npm run typecheck` before finishing.
- The specific responsive breakpoints and state transitions.

Do not dispatch a builder without a complete spec. Do not give a builder a prompt over ~150 lines; split the section instead.

### Step 4: Merge

As builders complete:

- Merge their worktree branches into the main worktree.
- Reject or repair any merge that deletes an unrelated route or another page's namespace.
- After each merge, run `npm run build`.
- If a merge introduces errors, fix them immediately.

## Phase 4: Page Assembly

After all sections are built and merged, wire the page into the exact destination route from the output plan:

- Import `.astro` section components.
- Implement the page-level layout from the topology doc with semantic HTML, grid/flex, sticky positioning, and z-index layers.
- Add page-scoped `<script>` blocks or modules under `src/scripts/` for click, scroll, hover, keyboard, resize, observer, time, and URL behavior.
- Use native `<dialog>`, `<details>`, `<summary>`, `<form>`, and `<button>` elements when they match the original behavior.
- Confirm every route that existed before this run is still present.
- Verify `npm run typecheck`, `npm run build`, and the exact local URL.

## Phase 5: Visual QA Diff

After assembly, do not declare the clone complete. Compare the original and clone at the same viewport widths:

1. Desktop at 1440px.
2. Tablet at 768px when the layout changes.
3. Mobile at 390px.
4. Section by section, top to bottom.
5. Every interactive state and keyboard path.

For each discrepancy, check the component spec first. If extraction was wrong, re-extract and update the spec. If the spec was right but construction was wrong, fix the `.astro`, CSS, or vanilla JS implementation.

## Pre-Dispatch Checklist

Before dispatching any builder:

- [ ] Spec file exists under the page's component-spec directory.
- [ ] Every CSS value comes from `getComputedStyle()`, not estimation.
- [ ] Interaction model and exact trigger are documented.
- [ ] Every state's content and styles are captured.
- [ ] Hover, focus, keyboard, and responsive behavior are recorded.
- [ ] All images, videos, SVGs, and layered backgrounds are identified.
- [ ] Text content is verbatim.
- [ ] Responsive behavior is documented at 1440, 768, and 390px.
- [ ] The builder prompt is under ~150 lines.

## What NOT to Do

- Do not build click-based tabs when the original is scroll-driven, or vice versa.
- Do not extract only the default state.
- Do not miss overlay or layered images.
- Do not replace video or canvas behavior with an invented static mockup.
- Do not approximate computed CSS values.
- Do not add React, JSX, shadcn/ui, or a client framework to solve a small DOM interaction.
- Do not treat a new target as permission to replace current routes or namespaces.
- Do not dispatch builders without complete specs.
- Do not skip responsive extraction, keyboard behavior, or visual QA.
- Do not fabricate missing brand assets or copy.

## Completion

When done, report:

- Source URL to destination-route mapping for every page built.
- Existing routes preserved and any explicitly approved replacements.
- Total sections built.
- Total `.astro` components created.
- Total spec files written (should match components).
- Total assets downloaded (images, videos, SVGs, fonts).
- `npm run typecheck` and `npm run build` status.
- Visual QA results and remaining discrepancies.
- Known gaps or limitations.
