# Contributing Guidelines

Thank you for contributing to DevFlow OS! This guide details coding standards, commit structures, code quality pipelines, and continuous integration validations.

---

## 1. Branch Naming Structure

All development branches must adhere to the naming format:
`type/short-description`

### Acceptable Branch Types:

- `feature/` — New product logic or components.
- `bugfix/` — Resolving a codebase defect.
- `hotfix/` — Critical emergency patch.
- `docs/` — Documentation updates.

---

## 2. Commit Message Conventions

We enforce the **Conventional Commits** specification. Commit messages must be structured as follows:

`<type>(<scope>): <description>`

### Allowable Commit Types:

- `feat` — A new user-facing feature.
- `fix` — Resolving a codebase bug.
- `docs` — Updates to documentation.
- `style` — Layout formatting adjustments (Prettier/Black checks).
- `refactor` — Code optimizations without behavioral modifications.
- `test` — Modifications to the testing suite (Vitest/Pytest).
- `chore` — Dependency bumps, configurations, or workflow scripts.

### Examples:

- `feat(web): add prefers-reduced-motion control query to globals`
- `fix(web): resolve hydration mismatch inside steps timeline`
- `test(web): add unit tests for ConfirmDialog button focus`

---

## 3. Pre-Commit Verification Pipelines

DevFlow utilizes Git hooks managed via `pre-commit` to prevent linting or syntax degradation from entering version history.

### Hook Check Sequencing:

1. **Trim Trailing Whitespace**: Automatically cuts dead trailing spacing lines.
2. **Fix End of Files**: Ensures clean empty lines at the bottom of files.
3. **Prettier Format Check**: Auto-formats JavaScript, TypeScript, JSX, and CSS files.
4. **ESLint Static Analysis**: Enforces clean import bounds, type signatures, and React hooks rules (e.g. no cascading `setState` calls inside raw `useEffect` bodies).
5. **FastAPI Lint Checkers**: Validates Python files using Black (formatting) and Ruff (linting).

---

## 4. Run Quality Checks Locally

To manually verify code changes before pushing, execute:

- **Format Code**: `make format`
- **Lint Code**: `make lint`
- **Run Tests**: `make test`
