from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Union, cast

import bcrypt
from cryptography.fernet import Fernet
from jose import jwt

from app.core.config import settings

# Setup encryption context for GitHub tokens
_fernet: Optional[Fernet] = None


def get_fernet() -> Fernet:
    """Lazily initialize and return the Fernet instance using settings configuration."""
    global _fernet
    if _fernet is None:
        key = settings.ENCRYPTION_KEY
        if not key:
            raise ValueError("ENCRYPTION_KEY must be configured in settings.")
        encoded_key = key.encode() if isinstance(key, str) else key
        try:
            _fernet = Fernet(encoded_key)
        except ValueError as e:
            raise ValueError(
                f"Invalid ENCRYPTION_KEY: must be a 32-byte url-safe base64-encoded key. Detail: {e}"
            ) from e
    return _fernet


def get_password_hash(password: str) -> str:
    """Hash password using bcrypt directly."""
    parent_salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), parent_salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify raw password against bcrypt hash directly."""
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a short-lived access JWT."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return cast(str, encoded_jwt)


def create_refresh_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """Create a long-lived refresh JWT."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return cast(str, encoded_jwt)


def encrypt_token(token: str) -> str:
    """Encrypt a sensitive API token (e.g. GitHub OAuth token) using Fernet AES-256."""
    return get_fernet().encrypt(token.encode()).decode()


def decrypt_token(encrypted_token: str) -> str:
    """Decrypt an encrypted API token using Fernet AES-256."""
    return get_fernet().decrypt(encrypted_token.encode()).decode()
