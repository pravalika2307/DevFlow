# Contribution Guidelines

We welcome contributions to the DevFlow monorepo. Please adhere to these guidelines to ensure code quality and stable builds.

## 🚀 Setup & Execution

1.  **Dependency Installation**:
    ```bash
    npm install
    ```
2.  **Lint & Code Quality Check**:
    ```bash
    npm run lint
    ```
3.  **TypeScript Verification**:
    ```bash
    npm run typecheck
    ```
4.  **Production Compilation**:
    ```bash
    npx turbo run build
    ```

## 🛡 Pre-commit Hooks

The project implements strict pre-commit checks using python's `pre-commit` framework:

- Formatting checks: `prettier` and `black`.
- Python quality linting: `ruff`.
- YAML validation and trailing whitespace trimmers.

Staged modifications are auto-checked prior to every commit using:

```bash
pre-commit run --all-files
```
