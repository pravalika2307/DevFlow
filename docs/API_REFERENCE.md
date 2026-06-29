# API REST Reference Manual

This document details the REST API specifications for the DevFlow backend microservice (`apps/api`).

---

## 1. Request/Response Standards

- **REST Protocol**: JSON payloads transmitted over HTTPS.
- **Content-Type**: `application/json`
- **Authentication**: Token-based security using JSON Web Tokens (JWT).
- **Error Codes**:
  - `HTTP_ERROR`: Standard client error.
  - `VALIDATION_FAILED`: Dynamic query validation failed.
  - `INTERNAL_SERVER_ERROR`: Unhandled backend exception.

---

## 2. API Endpoints

### 🩺 Health Diagnostics

Returns system metrics verifying PostgreSQL and Redis connections.

- **Endpoint**: `/api/v1/health/`
- **Method**: `GET`
- **Response Format**:

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected",
  "cache": "connected",
  "timestamp": "2026-06-29T13:40:00Z"
}
```

---

### 🔑 Cryptographic Auth & Keys

Generates secure tokens for initial user setups.

- **Endpoint**: `/api/v1/auth/token`
- **Method**: `POST`
- **Headers**:
  - `Host: localhost:8000`
- **Request Format**:

```json
{
  "client_id": "devflow_web_client",
  "grant_type": "password",
  "username": "samsung_judge",
  "password": "solve_for_tomorrow_2026"
}
```

- **Response Format**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

---

## 3. Cryptographic Verification & Fernet Keys

During service initialization, the FastAPI server validates the **Fernet symmetric key** to ensure secure payload storage:

1. **Fernet Key Retrieval**: Evaluates `FERNET_KEY` from the backend environment.
2. **Boot verification**: If key parameters are missing or mathematically invalid, the server immediately throws a startup validation exception and terminates the process:

```python
@app.on_event("startup")
def validate_startup_config() -> None:
    try:
        get_fernet()
    except Exception as e:
        logger.error(f"Startup configuration validation failed: {e}")
        raise e
```
