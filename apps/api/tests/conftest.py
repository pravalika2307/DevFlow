from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.database import Base
from app.dependencies import get_db
from app.main import app

# Standard SQLite in-memory or file database for unit test isolation
# Since PostgreSQL features are standard, we can use SQLite for fast local unit testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    """Initializes schema on SQLite database."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db() -> Generator[Session, None, None]:
    """Provides a transactional database session rolled back after each test run."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db: Session) -> Generator[TestClient, None, None]:
    """Provides a FastAPI test client with database dependency overridden."""

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture
def test_user_data() -> dict:
    """Standard test user creation input data."""
    return {
        "email": "testuser@devflow.io",
        "username": "testuser",
        "password": "strong_test_password123",
        "role": "DEVELOPER",
    }


@pytest.fixture
def normal_user(db: Session, test_user_data: dict):
    """Inserts a standard active user into the test database."""
    from app.repositories.user import user_repo
    from app.schemas.user import UserCreate

    user = user_repo.get_by_email(db, email=test_user_data["email"])
    if not user:
        user_in = UserCreate(**test_user_data)
        user = user_repo.create_user(db, obj_in=user_in)
    return user
