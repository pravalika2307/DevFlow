# Changelog

All notable changes to the **DevFlow OS** project will be documented in this file.

---

## [1.0.0] - 2026-06-29

### Added

- **Samsung Solve for Tomorrow Design Language**: Transformed the frontend using glassmorphic cards, neon glowing progress rings, dark gradients, and smooth slide-in layouts.
- **Problem Discovery Panel**: Integrated stakeholder confidence scoring, chronological research entries, fishbone structural mapping, and the **5 Whys root cause analyzer**.
- **Design Thinking Coach**: Fully functional Empathise, Define, Ideate, Prototype, and Test tracking wizards mapping human-centered iterations.
- **NOVA AI Innovation Mentor**: Continuous contextual coach generating suggestions for risks, blind spots, SDG opportunities, and next actions.
- **3D Innovation Galaxy Map**: Fully interactive HTML5 canvas mapping projects to orbits based on their progress and development stages.
- **Impact Intelligence Hub**: Target SDG mappings, inclusivity audits, and predictive growth graphs.
- **NOVA AI Expert Council**: Automated multi-agent panel representing Software Engineers, SDG Ethicists, and Financial Advisors scoring projects across technical and social readiness.
- **Samsung Presentation mode**: Widescreen slide controller allowing teams to pitch their solutions directly to judges.
- **Operations Control Center**: Settings panel containing the About section, FAQ Help desk, system hotkey catalog, and the **Demo Reset Button**.
- **Interactive Tour Overlay**: Seamlessly routes through workspaces to showcase the Solve for Tomorrow journey.
- **6 Curated Demo Projects**: Structured realistic profiles (Smart Waste Management, AI Disaster Response, etc.) preloaded for demonstrations.

### Fixed

- **Hydration Warning in JourneyStepsBar**: Deferred `localStorage` state checks behind a React client hydration barrier (`hasHydrated`), matching Next.js App Router standards.
- **Accessibility (a11y) Polish**: Added focus-trap loops to ConfirmDialog and Milestone celebration modal. Added `aria-label` hooks to interactive canvases.
- **Animation System Controls**: Added `@media (prefers-reduced-motion)` CSS rules to instantly halt heavy gradients, keyframes, and transitions.
- **Build Compilation integrity**: Cleaned up obsolete developer comments, fixed double `aria-live` screen-reader tags, and corrected ESLint cascading state warning hooks.

---

## [0.1.0] - 2026-06-27

### Added

- **Monorepo Architecture (Milestone 1)**: Integrated Turborepo workspaces linking `apps/web` (Next.js frontend), `apps/api` (FastAPI backend), `packages/config` (shared ESLint rules), `packages/types` (shared TS schemas), and `packages/ui` (shared React UI elements).
- **Frontend App Shell (Milestone 2)**: Scaffolded dashboard navigation sidebar routing, command palette placeholder, theme configuration providers, and page layouts matching the FDD system.
- **Backend Architecture (Milestone 3)**: Structured FastAPI cleanly into layered Core, Models, Schemas, Repositories, Services, Middleware, and Dependency modules. Integrated async SQLAlchemy 2.0 engine, Alembic configuration, and Redis asynchronous pings.
- **Docker Infrastructure (Milestone 4)**: Engineered multi-stage Dockerfiles for Next.js and FastAPI, linked db/redis/web/api services in bridge networking, and added TCP socket environment verification helpers (`verify_env.py`).
- **Code Quality Pipeline (Milestone 5)**: Configured Vitest and React Testing Library for frontend testing, added sample `FlowBadge` unit test, registered Git pre-commit hooks, and expanded GitHub Actions CI pipeline checks to validate types and run testing suites.
