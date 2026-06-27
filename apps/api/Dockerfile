# ==============================================================================
# STAGE 1: Builder
# Prepares the virtual environment and installs dependencies.
# Using a build stage avoids leaving compiler tools or package caches
# in the final production container.
# ==============================================================================
FROM python:3.13-slim AS builder
WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ==============================================================================
# STAGE 2: Runner
# Minimal python runtime copying only the virtual environment and app code.
# This keeps the image size small, reduces vulnerabilities, and starts instantly.
# ==============================================================================
FROM python:3.13-slim AS runner
WORKDIR /app
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1

# Copy virtual environment dependencies from builder
COPY --from=builder /opt/venv /opt/venv

# Copy source code and files
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
