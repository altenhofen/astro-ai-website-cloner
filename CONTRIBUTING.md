# Contributing

Thanks for your interest in improving the **Astro AI Website Cloner**! This guide covers how to contribute to the template itself.

> **Note:** This repository is a *template*. If you just want to clone a website, don't open a PR here — click **Use this template** to make your own copy and work there (see the [README](README.md#how-to-start)). Pull requests should improve the clone workflow, the AGENTS standard, the scaffold, or the docs.

## Ways to contribute

- **Improve the clone workflow** in `docs/research/CLONE_WORKFLOW.md` — sharper extraction, better prompts, new behaviors to detect
- **Improve the AGENTS standard** — clearer repository rules and repeatable implementation guidance
- **Fix bugs** in the Astro, Tailwind, or vanilla JavaScript scaffold
- **Improve documentation** — the README, `AGENTS.md`, or the inspection guides under `docs/research/`

Browse the [open issues](https://github.com/JCodesMore/ai-website-cloner-template/issues) for something to pick up. For substantial or potentially breaking changes, consider opening an issue first so we can align on the approach before significant work begins.

## Repository standard

`AGENTS.md` is the only repository-level agent instruction file. The clone workflow lives in `docs/research/CLONE_WORKFLOW.md`; keep both documents generic and editor-independent.

## Run and commit

From a clean checkout:

```bash
npm ci
npm run dev
```

Before committing, stop the dev server, run `npm run check`, inspect `git diff`, stage only related files, review `git diff --cached`, and commit with a focused imperative message:

```bash
npm run check
git status --short
git diff
git add <files-that-belong-to-this-change>
git diff --cached --check
git commit -m "docs: clarify local setup"
git status --short
```

The README contains the complete local run, Docker, branch, commit, and push workflow.

## Submitting a pull request

1. **Fork** the repo and create a branch off `master` (e.g. `fix/skill-hover-extraction` or `docs/clarify-setup`).
2. Make your change and update the relevant source or research document.
3. Run `npm run check` and make sure it passes.
4. Write a clear commit message that describes the change. Prefixes such as `fix:`, `feat:`, or `docs:` are welcome but not required.
5. Open a PR against `master`, fill out the PR template, and link a relevant issue when one exists (for example, `Closes #123`).
6. Keep PRs focused — one logical change per PR is much easier to review and merge.