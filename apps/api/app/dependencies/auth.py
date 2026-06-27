import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.dependencies.database import get_db
from app.models.user import User, UserRole
from app.repositories.user import user_repo
from app.schemas.auth import TokenPayload

# Configures OAuth2 endpoint lookup (used to extract Authorization token headers)
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login-form"  # Supports standard Swagger OAuth logins
)


def get_current_user(db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)) -> User:
    """
    Validates token credentials and yields active User matching sub claim.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_data = TokenPayload(**payload)

        # Verify access token type to prevent using refresh tokens
        if token_data.type != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
            )

        if token_data.sub is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except (JWTError, ValidationError) as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        ) from err

    try:
        user_uuid = uuid.UUID(token_data.sub)
    except ValueError as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token identifier",
        ) from err

    user = user_repo.get(db, id=user_uuid)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Enforces active user verification status."""
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return current_user


def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    """Enforces RBAC admin clearance scopes."""
    if current_user.role != UserRole.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="The user does not have enough privileges"
        )
    return current_user
