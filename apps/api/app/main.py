import logging
import os

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging
from app.middleware import LoggingMiddleware

# Configure production-ready structured loggers on startup
configure_logging()
logger = logging.getLogger("app.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="DevFlow Engineering Intelligence Platform API",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# 1. Enforce Trusted Hosts parameters
app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1", "testserver", "*.devflow.io"]
)

# 2. Configure CORS origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# 3. Add Custom RequestID and Performance Monitoring Middleware
app.add_middleware(LoggingMiddleware)

# --- Standardized Error Handling Middleware ---


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {"code": "HTTP_ERROR", "message": exc.detail, "details": None},
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    errors = exc.errors()
    # Format details into readable JSON dictionary
    details = [{"loc": err["loc"], "msg": err["msg"], "type": err["type"]} for err in errors]
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_FAILED",
                "message": "Input validation failed.",
                "details": details,
            },
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled server exception occurred")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred on the server.",
                "details": str(exc) if not os.environ.get("PRODUCTION") else None,
            },
        },
    )


# Mount Routers
app.include_router(api_router, prefix=settings.API_V1_STR)
