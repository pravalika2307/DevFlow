from typing import AsyncGenerator, Generator

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from app.core.database import AsyncSessionLocal, SessionLocal


def get_db() -> Generator[Session, None, None]:
    """Sync session provider (backward compatibility/sync backup tasks)"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Async database session provider dependency for FastAPI.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
