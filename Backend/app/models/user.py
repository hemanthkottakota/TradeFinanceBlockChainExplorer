import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, Index, Integer, String

from app.core.database import Base


class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    BANK = "BANK"
    CORPORATE = "CORPORATE"
    AUDITOR = "AUDITOR"


def normalize_role(value: str | RoleEnum) -> RoleEnum:
    if isinstance(value, RoleEnum):
        return value
    return RoleEnum(value.upper())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False, unique=True)
    # Maps to legacy "password" column in existing trade_finance DB.
    hashed_password = Column("password", String(255), nullable=False)
    # Keep String here to stay compatible with legacy rows (e.g. "bank").
    role = Column(String(20), nullable=False)
    org_name = Column(String(100), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        Index("ix_users_email", "email"),
        Index("ix_users_org_name", "org_name"),
    )
