# DevFlow Engineering Command Center Makefile
# Supporting Windows PowerShell and standard shell environments

.PHONY: install dev build test lint format clean start stop restart logs docker-up docker-down docker-restart docker-logs migrate docker-migrate

# Setup development environment and dependencies
install:
	python scripts/setup_dev.py

# Native local development server (using turborepo workspaces)
dev:
	npx turbo run dev

# Build production bundle natively
build:
	npx turbo run build

# Docker Compose orchestration commands
start: docker-up
stop: docker-down
restart: docker-restart
logs: docker-logs

docker-up:
	docker compose up --build -d

docker-down:
	docker compose down -v

docker-restart:
	docker compose restart

docker-logs:
	docker compose logs -f

# Database migrations
migrate:
	cd apps/api && venv\Scripts\python -m alembic upgrade head

docker-migrate:
	docker compose exec backend alembic upgrade head

# Run tests
test:
	cd apps/api && venv\Scripts\python -m pytest
	npx turbo run test

# Code quality validation check
lint:
	cd apps/api && venv\Scripts\python -m ruff check app tests
	cd apps/api && venv\Scripts\python -m mypy app --explicit-package-bases
	npx eslint apps/web/src --max-warnings=0

# Auto-format codebase
format:
	cd apps/api && venv\Scripts\python -m black app tests
	npx prettier --write "apps/web/src/**/*.{ts,tsx,css,json}" "packages/**/*.{ts,tsx,css,json}"

# Clean environment cache artifacts
clean:
	@echo Cleaning cache and environments...
	-rmdir /s /q node_modules
	-rmdir /s /q apps\web\.next
	-rmdir /s /q apps\api\venv
	-rmdir /s /q apps\api\.pytest_cache
	-rmdir /s /q apps\api\app\__pycache__
	-rmdir /s /q packages\types\dist
	-rmdir /s /q packages\ui\dist
