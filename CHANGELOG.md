# Changelog

All notable changes to the **DevFlow** project will be documented in this file.

---

## [0.1.0] - 2026-06-27

### Added

- **Monorepo Architecture (Milestone 1)**: Integrated Turborepo workspaces linking `apps/web` (Next.js frontend), `apps/api` (FastAPI backend), `packages/config` (shared ESLint rules), `packages/types` (shared TS schemas), and `packages/ui` (shared React UI elements).
- **Frontend App Shell (Milestone 2)**: Scaffolded dashboard navigation sidebar routing, command palette placeholder, theme configuration providers, and page layouts matching the FDD system.
- **Backend Architecture (Milestone 3)**: Structured FastAPI cleanly into layered Core, Models, Schemas, Repositories, Services, Middleware, and Dependency modules. Integrated async SQLAlchemy 2.0 engine, Alembic configuration, and Redis asynchronous pings.
- **Docker Infrastructure (Milestone 4)**: Engineered multi-stage Dockerfiles for Next.js and FastAPI, linked db/redis/web/api services in bridge networking, and added TCP socket environment verification helpers (`verify_env.py`).
- **Code Quality Pipeline (Milestone 5)**: Configured Vitest and React Testing Library for frontend testing, added sample `FlowBadge` unit test, registered Git pre-commit hooks, and expanded GitHub Actions CI pipeline checks to validate types and run testing suites.
