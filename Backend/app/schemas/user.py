from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models.user import RoleEnum


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: RoleEnum
    org_name: str
    created_at: datetime

    class Config:
        from_attributes = True


class CurrentUserContext(BaseModel):
    user_id: int
    role: RoleEnum
    org_name: str
