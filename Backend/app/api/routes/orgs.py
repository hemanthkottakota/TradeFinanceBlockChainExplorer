from fastapi import APIRouter, Depends

from app.dependencies import enforce_org_scope
from app.schemas.org import OrgMeResponse
from app.schemas.user import CurrentUserContext


router = APIRouter(prefix="/orgs", tags=["organizations"])


@router.get("/me", response_model=OrgMeResponse)
def read_my_organization(
    current_user: CurrentUserContext = Depends(enforce_org_scope),
):
    return OrgMeResponse(org_name=current_user.org_name, role=current_user.role)
