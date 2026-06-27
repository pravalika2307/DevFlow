from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.redis import verify_redis_health
from app.dependencies import get_async_db

router = APIRouter()


async def verify_postgres_health(db: AsyncSession) -> bool:
    try:
        # Fast query execution test using async session
        result = await db.execute(text("SELECT 1"))
        return result.scalar() == 1
    except Exception:
        return False


@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_async_db)) -> dict[str, Any]:
    """
    Detailed health check assessing PostgreSQL and Redis.
    """
    pg_healthy = await verify_postgres_health(db)
    redis_healthy = await verify_redis_health()

    status_str = "healthy" if pg_healthy and redis_healthy else "unhealthy"

    return {
        "success": True,
        "data": {
            "status": status_str,
            "postgres": "connected" if pg_healthy else "disconnected",
            "redis": "connected" if redis_healthy else "disconnected",
        },
    }


@router.get("/readiness")
async def readiness_check(db: AsyncSession = Depends(get_async_db)) -> dict[str, Any]:
    """
    Readiness probe for orchestrators (Kubernetes/Load Balancer).
    Returns 503 if dependencies are down.
    """
    pg_healthy = await verify_postgres_health(db)
    redis_healthy = await verify_redis_health()

    if not pg_healthy or not redis_healthy:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "postgres": "connected" if pg_healthy else "disconnected",
                "redis": "connected" if redis_healthy else "disconnected",
            },
        )

    return {"success": True, "data": {"status": "ready"}}


@router.get("/liveness")
async def liveness_check() -> dict[str, Any]:
    """
    Basic liveness probe checking if the web application is running.
    """
    return {"success": True, "data": {"status": "alive"}}
