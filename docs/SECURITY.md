# Security Policy & Protocols

This document outlines DevFlow OS security procedures, cryptographic configurations, middleware rules, and reporting protocols.

---

## 1. Symmetric Data Encryption via Fernet

To secure sensitive configurations and credentials, DevFlow OS uses symmetric Fernet encryption keys on startup:

- **Algorithm**: Fernet uses AES-128 in CBC mode with HMAC-SHA256 signatures for message authentication.
- **Boot Validation**: The backend application validates `FERNET_KEY` variables on startup. If key formats mismatch or keys are missing, the server halts boot execution:

```python
@app.on_event("startup")
def validate_startup_config() -> None:
    try:
        get_fernet()
    except Exception as e:
        logger.error(f"Startup configuration validation failed: {e}")
        raise e
```

---

## 2. Network Security Middleware

### Allowed Host Headers

To prevent Host Header Injection attacks, the FastAPI REST Gateway implements `TrustedHostMiddleware`, locking network request processing to verified hosts:

- **Default configurations**: `localhost`, `127.0.0.1`, `*.devflow.io`.

### Cross-Origin Resource Sharing (CORS)

CORS rules restrict browser requests to allowed hosts using exact origins:

- Configured via `BACKEND_CORS_ORIGINS` parsed from environment arrays.
- Wildcards (`*`) are disabled in production configurations.

---

## 3. Vulnerability Reporting

If you discover a security vulnerability in DevFlow OS, please do not open a public issue. Instead, report it privately to our security team:

- **Email**: `security@devflow.io`
- **PGP Key**: Fingerprint signature is updated in our release certificates.
- **Response Timeline**: The team aims to triage and patch reported security issues within 72 hours.
