# Deployment Guide

DevFlow is optimized to build and run containerized on Linux environments or deploy directly to Netlify/Vercel and render backend APIs on Heroku/AWS.

## 🐳 Docker Integration

To spin up all monorepo client and server containers together:

```bash
docker-compose up --build
```

## ⚙ Environment Configuration

Configure environment parameters in `apps/api/.env`:

- `PORT`: Port binding for FastAPI (default: `8000`).
- `FERNET_KEY`: 32 url-safe base64-encoded bytes cryptography key.
- `SECRET_KEY`: JWT authentication signature key.

## 🤖 CI/CD Pipeline

GitHub Actions automatically verifies every pull request on Ubuntu virtual machines, running `npm run lint`, `npm run build`, `npm run typecheck`, and python `pytest` suites to ensure zero compilation or quality failures.
