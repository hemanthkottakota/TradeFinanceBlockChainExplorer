from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import enforce_org_scope, get_db
from app.models.user import User, normalize_role
from app.schemas.user import CurrentUserContext, UserResponse


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def read_me(
    current_user: CurrentUserContext = Depends(enforce_org_scope),
    db: Session = Depends(get_db),
):
    db_user = db.query(User).filter(User.id == current_user.user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserResponse(
        id=db_user.id,
        name=db_user.name,
        email=db_user.email,
        role=normalize_role(db_user.role),
        org_name=db_user.org_name,
        created_at=db_user.created_at,
    )
