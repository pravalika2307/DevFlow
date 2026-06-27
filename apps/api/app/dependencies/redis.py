from typing import AsyncGenerator

import redis.asyncio as aioredis

from app.core.redis import redis_pool


async def get_redis_client() -> AsyncGenerator[aioredis.Redis, None]:
    """
    FastAPI dependency yielding an async Redis connection.
    """
    client = aioredis.Redis(connection_pool=redis_pool)
    try:
        yield client
    finally:
        await client.close()
