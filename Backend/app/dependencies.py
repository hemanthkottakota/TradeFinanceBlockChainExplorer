from collections.abc import Callable

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import decode_token
from app.models.user import RoleEnum
from app.schemas.user import CurrentUserContext


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme)) -> CurrentUserContext:
    payload = decode_token(token, expected_type="access")

    user_id = payload.get("user_id")
    role = payload.get("role")
    org_name = payload.get("org_name")
    if user_id is None or role is None or org_name is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is missing required claims",
        )

    return CurrentUserContext(user_id=user_id, role=RoleEnum(role), org_name=org_name)


def require_roles(*allowed_roles: RoleEnum) -> Callable:
    def _checker(current_user: CurrentUserContext = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient role permissions",
            )
        return current_user

    return _checker


def enforce_org_scope(
    request: Request,
    current_user: CurrentUserContext = Depends(get_current_user),
) -> CurrentUserContext:
    requested_org = getattr(request.state, "org_name", None)
    if requested_org and current_user.role != RoleEnum.ADMIN and requested_org != current_user.org_name:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cross-organization access denied",
        )
    return current_user
