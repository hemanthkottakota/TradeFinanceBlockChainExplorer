from pydantic import BaseModel

from app.models.user import RoleEnum


class OrgMeResponse(BaseModel):
    org_name: str
    role: RoleEnum
