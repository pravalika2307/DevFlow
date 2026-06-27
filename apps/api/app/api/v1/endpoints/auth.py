from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.api import deps
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from app.models.user import User
from app.repositories.user import user_repo
from app.schemas.auth import LoginRequest, RefreshRequest, Token
from app.schemas.user import UserCreate, UserOut

router = APIRouter()


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(deps.get_db)) -> Any:
    """
    Register a new local user with credentials.
    """
    existing_user = user_repo.get_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="A user with this email already exists."
        )
    existing_username = user_repo.get_by_username(db, username=user_in.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this username already exists.",
        )
    user = user_repo.create_user(db, obj_in=user_in)
    return user


@router.post("/login", response_model=Token)
def login(response: Response, login_data: LoginRequest, db: Session = Depends(deps.get_db)) -> Any:
    """
    Login user via email/username and password.
    Returns access token, sets secure refresh token in HttpOnly cookie.
    """
    user = user_repo.authenticate(
        db, username_or_email=login_data.username_or_email, password=login_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username/email or password"
        )
    elif not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    # Store refresh token in secure HttpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,  # Enforces HTTPS in production
        samesite="lax",  # Standard csrf mitigation
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 3600,
        path=f"{settings.API_V1_STR}/auth",
    )

    return Token(access_token=access_token, refresh_token=refresh_token)


@router.post("/login-form", response_model=Token)
def login_form(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    OAuth2 compatible password login for Swagger / OpenAPI automatic UI testing.
    """
    user = user_repo.authenticate(
        db, username_or_email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password"
        )
    elif not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    # Store refresh token in cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 3600,
        path=f"{settings.API_V1_STR}/auth",
    )

    return Token(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=Token)
def refresh(
    request: Request,
    response: Response,
    refresh_data: Optional[RefreshRequest] = None,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Rotates access and refresh tokens. Fallback to request body if cookie is missing.
    """
    refresh_token = None
    if "refresh_token" in request.cookies:
        refresh_token = request.cookies.get("refresh_token")
    elif refresh_data and refresh_data.refresh_token:
        refresh_token = refresh_data.refresh_token

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token missing"
        )

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_type = payload.get("type")
        user_id = payload.get("sub")

        if token_type != "refresh" or not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type"
            )
    except JWTError as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
        ) from err

    import uuid

    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token identifier"
        ) from err
    user = user_repo.get(db, id=user_uuid)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive"
        )

    new_access_token = create_access_token(subject=user.id)
    new_refresh_token = create_refresh_token(subject=user.id)

    # Set new secure refresh token in cookie
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 3600,
        path=f"{settings.API_V1_STR}/auth",
    )

    return Token(access_token=new_access_token, refresh_token=new_refresh_token)


@router.get("/me", response_model=UserOut)
def read_user_me(current_user: User = Depends(deps.get_current_active_user)) -> Any:
    """
    Get details of current active user.
    """
    return current_user


@router.post("/logout")
def logout(response: Response) -> Any:
    """
    Log out user by wiping the refresh token cookie.
    """
    response.delete_cookie(key="refresh_token", path=f"{settings.API_V1_STR}/auth")
    return {"success": True, "message": "Successfully logged out"}
