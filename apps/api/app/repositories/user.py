from typing import Any, Dict, Optional, Union, cast

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.models.user import User, UserProfile
from app.repositories.base import BaseRepository
from app.schemas.user import UserCreate, UserUpdate


class UserRepository(BaseRepository[User]):
    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get_by_username(self, db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    def create_user(self, db: Session, *, obj_in: UserCreate) -> User:
        """Create a user with hashed password and initial UserProfile."""
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            hashed_password=get_password_hash(obj_in.password),
            role=obj_in.role,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        # Automatically build a linked empty profile
        profile = UserProfile(user_id=db_obj.id)
        db.add(profile)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update_user(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        """Update user attributes, hashing password if updated."""
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        if "password" in update_data and update_data["password"]:
            update_data["hashed_password"] = get_password_hash(update_data["password"])
            del update_data["password"]

        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, username_or_email: str, password: str) -> Optional[User]:
        """Authenticate a user by username or email and match against bcrypt hash."""
        # Try fetching by email first
        user = self.get_by_email(db, email=username_or_email)
        if not user:
            # Fall back to username
            user = self.get_by_username(db, username=username_or_email)

        if not user or not user.hashed_password:
            return None

        if not verify_password(password, cast(str, user.hashed_password)):
            return None

        return user


user_repo = UserRepository(User)
