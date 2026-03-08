from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.dependencies import get_db
from app.models.user import User, normalize_role
from app.schemas.auth import TokenPair, TokenRefreshRequest, UserLogin, UserRegister
from app.schemas.user import UserResponse


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User.id).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=user.role.value,
        org_name=user.org_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=TokenPair)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == credentials.email).first()
    if not db_user or not verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    claims = {
        "user_id": db_user.id,
        "role": normalize_role(db_user.role).value,
        "org_name": db_user.org_name,
    }
    return TokenPair(
        access_token=create_access_token(claims),
        refresh_token=create_refresh_token(claims),
    )


@router.post("/refresh", response_model=TokenPair)
def refresh_tokens(payload: TokenRefreshRequest):
    decoded = decode_token(payload.refresh_token, expected_type="refresh")
    claims = {
        "user_id": decoded["user_id"],
        "role": decoded["role"],
        "org_name": decoded["org_name"],
    }
    return TokenPair(
        access_token=create_access_token(claims),
        refresh_token=create_refresh_token(claims),
    )
