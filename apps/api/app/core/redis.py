import redis.asyncio as aioredis

from app.core.config import settings

# Global redis connection pool
assert settings.REDIS_URL is not None, "REDIS_URL settings field is not populated"
redis_pool = aioredis.ConnectionPool.from_url(
    settings.REDIS_URL,
    max_connections=20,
    retry_on_timeout=True,
)


async def verify_redis_health() -> bool:
    """
    Ping Redis to verify connection health.
    """
    client = aioredis.Redis(connection_pool=redis_pool)
    try:
        return await client.ping()
    except Exception:
        return False
    finally:
        await client.close()
