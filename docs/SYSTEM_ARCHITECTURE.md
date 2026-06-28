# System Architecture Guide

DevFlow is designed as a production-grade Turborepo monorepo using standard npm workspaces.

## 🏗 Package Structure

```
├── apps
│   ├── api          # FastAPI Python backend (lifespan configurations, auth endpoints)
│   └── web          # Next.js TypeScript App Router client application
├── packages
│   ├── config       # Shared ESLint, Prettier, and TypeScript configurations
│   ├── types        # Global TypeScript interfaces and model variables
│   └── ui           # Shared web UI layout components and placeholders
├── package.json     # Monorepo root workspace orchestrator
└── turbo.json       # Turborepo task pipeline configs (build, lint, typecheck)
```

## 💻 Frontend Client Stack

- **Core Architecture**: Next.js App Router with React Server/Client Components.
- **State Management**: LocalStorage database services syncing dashboard logs dynamically.
- **Styling**: Dark glassmorphism vanilla CSS gradients, and responsive layouts.
- **A11y Standards**: Focus highlights and ARIA controls mapped across interactive modal layers.
