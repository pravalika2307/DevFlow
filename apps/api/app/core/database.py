from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

# Synchronous Engine (for migrations & sync backups)
assert settings.DATABASE_URL is not None, "DATABASE_URL settings field is not populated"
engine = create_engine(
    settings.DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Asynchronous Engine (for highly concurrent FastAPI routes)
assert settings.ASYNC_DATABASE_URL is not None, "ASYNC_DATABASE_URL settings field is not populated"
async_engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True,
)
AsyncSessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, expire_on_commit=False
)

# Standardized naming conventions for database constraints/indexes (highly recommended in Alembic migrations)
naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}
metadata = MetaData(naming_convention=naming_convention)


class Base(DeclarativeBase):
    metadata = metadata
