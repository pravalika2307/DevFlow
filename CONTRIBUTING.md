# Contributing to DevFlow

Thank you for contributing to DevFlow! This guide outlines our development setup, coding standards, testing instructions, and pull request workflow. Following these guidelines ensures code remains maintainable, robust, and aligned with our system design.

---

## 1. Branch Naming Conventions

All branch names must conform to the following pattern:
`type/issue-number-short-description`

### Allowed Types:

- `feature/` — New product features or logic.
- `bugfix/` — Fixing a bug or logic error.
- `hotfix/` — Critical emergency patch for production.
- `refactor/` — Code improvement without user-facing changes.
- `docs/` — Documentation updates.

### Examples:

- `feature/101-github-webhook-ingestion`
- `bugfix/245-resolve-jwt-expiration-check`

---

## 2. Commit Message Guidelines

We enforce the **Conventional Commits** specification. Commit messages must be structured as follows:

`<type>(<scope>): <description>`

### Common Types:

- `feat` — A new feature.
- `fix` — A bug fix.
- `docs` — Documentation updates.
- `style` — Changes that do not affect code logic (whitespace, formatting).
- `refactor` — Code changes that neither fix a bug nor add a feature.
- `test` — Adding or modifying tests.
- `chore` — Updates to build configuration, dependencies, or metadata.

### Examples:

- `feat(auth): integrate github oauth callback handler`
- `fix(api): cast refresh token expiration to integer`
- `test(frontend): add FlowBadge unit render test`

---

## 3. Local Development Setup & Verification

Follow these steps to initialize the local workspaces:

1.  **Run the automated setup command**:
    ```bash
    make install
    ```
    This copies environment files, installs npm workspaces, compiles python venv, and installs Python packages.
2.  **Verify local environment configurations**:
    ```bash
    python scripts/verify_env.py
    ```
3.  **Activate Git pre-commit hooks**:
    ```bash
    apps/api/venv/Scripts/pre-commit install
    ```

---

## 4. Code Quality & Format Checks

Before committing any changes, run formatting, linting, and typecheck verifications:

- **Format Code**:
  ```bash
  make format
  ```
  _(Under the hood: formats Python code via Black and JS/TS/CSS via Prettier)_
- **Lint & Typecheck**:
  ```bash
  make lint
  ```
  _(Under the hood: validates backend code via Ruff/MyPy, and frontend code via ESLint)_

---

## 5. Testing Instructions

- **Run All Tests**:
  ```bash
  make test
  ```
  _(Under the hood: executes the backend Pytest suite and the frontend Vitest suite)_
- **Run Backend Tests**:
  ```bash
  cd apps/api
  venv\Scripts\python -m pytest
  ```
- **Run Frontend Tests**:
  ```bash
  cd apps/web
  npm run test
  ```

---

## 6. Continuous Integration (CI) Pipeline

Every pull request targeting the `main` branch triggers the **CI Pipeline** workflow which automates:

1.  **Backend Quality Checks**:
    - Black formatting check
    - Ruff linting verification
    - MyPy static typing checks
    - Pytest unit and integration test suite execution
2.  **Frontend Quality Checks**:
    - ESLint static analysis
    - TypeScript strict compilation type check (`tsc --noEmit`)
    - Vitest unit tests execution
    - Next.js production build compilation check
