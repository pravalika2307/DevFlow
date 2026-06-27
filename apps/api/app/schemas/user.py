from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserProfileBase(BaseModel):
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None


class UserProfileOut(UserProfileBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime


class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=100)
    role: str = "DEVELOPER"


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=100)
    password: Optional[str] = Field(None, min_length=8, max_length=128)
    role: Optional[str] = None
    is_active: Optional[bool] = None


class UserOut(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    is_active: bool
    github_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    profile: Optional[UserProfileOut] = None
