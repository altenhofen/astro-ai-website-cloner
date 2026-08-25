# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Replaced the Next.js + React scaffold with a static Astro + HTML + Tailwind CSS + vanilla JavaScript starter
- Updated the clone workflow, repository instructions, documentation, and Docker setup for Astro routing and static output
- Made `AGENTS.md` the only repository-level agent instruction standard

### Removed
- Generated instruction files, command copies, and synchronization tooling

## [0.4.0] - 2026-08-10

### Added
- Docker workflows for local development and multi-stage production builds
- A complete browser-assisted website clone workflow with isolated output namespaces
- Simplified Chinese and Japanese READMEs with the same onboarding and workflow guidance as the English documentation
- Contributor and security policies, including a private vulnerability-reporting path
- CI enforcement for dependency installation, linting, type checking, and builds
- Compact pipeline diagrams and a static Star History chart in every README

### Changed
- Raised the project Node.js baseline to 24 across local development, CI, Docker, and contributor-facing documentation
- Refreshed framework and tooling dependencies
- Updated the clone workflow so later runs preserve existing pages and isolate routes, research, components, assets, and downloaders for each target
- Improved multi-origin and query/fragment planning with collision-resistant output namespaces and explicit route verification
- Redesigned README onboarding around the template workflow
- Hardened repository checks and deterministic project configuration

### Fixed
- Dependency resolution and generated-file consistency issues
- Cross-platform command and configuration handling
- Vulnerable framework dependencies and repository quality checks

### Security
- Documented responsible vulnerability disclosure through GitHub private vulnerability reporting
- Updated vulnerable dependencies to patched releases

## [0.3.1] - 2026-03-29

### Fixed
- Improved cross-platform line-ending handling in repository instruction generation

## [0.3.0] - 2026-03-29

### Added
- Multi-URL support for the clone workflow — clone multiple sites in a single command with parallel processing and isolated output
- CI quality gates via GitHub Actions — automated lint, typecheck, and build on every push and pull request
- `npm run typecheck` and `npm run check` scripts for local quality validation
- `.gitattributes` for cross-platform line ending normalization
- `.nvmrc` to pin the Node.js baseline for contributor consistency

### Changed
- Streamlined the pull request template
- Improved README documentation with clearer use cases, limitations, and workflow guidance
- Refined repository instructions and inspection guidance for clarity and consistency

### Removed
- An outdated use case from README documentation

## [0.2.0] - 2026-03-28

### Added
- Repository instructions and a browser-assisted clone workflow for AI coding agents
- Contributor documentation, supported workflow guidance, and repository tooling
- Workflow guidance in the README

### Changed
- README now describes a general agent workflow rather than a single preferred client
- `AGENTS.md` established as the repository instruction source

## [0.1.1] - 2026-03-28

### Added
- Bug report and feature request issue templates
- Pull request template with checklist
- `CHANGELOG.md` following Keep a Changelog format
- Package metadata (description, repository, homepage, keywords, engines)

### Fixed
- License attribution and contributor-facing metadata

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold for website reverse-engineering with an AI coding agent
- Clone workflow for full-site reconstruction
- Parallel builder guidance with isolated worktrees
- Browser-assisted design token extraction
- Comprehensive inspection guide and project structure documentation
- Static Astro + HTML + Tailwind CSS + vanilla JavaScript base scaffold
- MIT license
- README with onboarding and project guidance

[Unreleased]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/JCodesMore/ai-website-cloner-template/releases/tag/v0.1.0
