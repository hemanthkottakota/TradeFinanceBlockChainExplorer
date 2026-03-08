"""add role enum type

Revision ID: 20260308_0002
Revises: 20260308_0001
Create Date: 2026-03-08 00:00:02
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "20260308_0002"
down_revision: Union[str, None] = "20260308_0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


role_enum = postgresql.ENUM("ADMIN", "BANK", "CORPORATE", "AUDITOR", name="role_enum")


def upgrade() -> None:
    role_enum.create(op.get_bind(), checkfirst=True)
    op.alter_column(
        "users",
        "role",
        existing_type=sa.String(length=20),
        type_=role_enum,
        postgresql_using="role::role_enum",
    )


def downgrade() -> None:
    op.alter_column(
        "users",
        "role",
        existing_type=role_enum,
        type_=sa.String(length=20),
        postgresql_using="role::text",
    )
    role_enum.drop(op.get_bind(), checkfirst=True)
