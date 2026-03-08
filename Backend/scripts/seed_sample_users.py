from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import RoleEnum, User

SAMPLE_USERS = [
    {
        "name": "Admin User",
        "email": "admin@tfx.local",
        "password": "AdminPass123",
        "role": RoleEnum.ADMIN,
        "org_name": "GlobalHQ",
    },
    {
        "name": "Bank User",
        "email": "bank@tfx.local",
        "password": "BankPass123",
        "role": RoleEnum.BANK,
        "org_name": "FirstBank",
    },
    {
        "name": "Corporate User",
        "email": "corp@tfx.local",
        "password": "CorpPass123",
        "role": RoleEnum.CORPORATE,
        "org_name": "AcmeCorp",
    },
    {
        "name": "Auditor User",
        "email": "auditor@tfx.local",
        "password": "AuditPass123",
        "role": RoleEnum.AUDITOR,
        "org_name": "AuditOrg",
    },
]


def seed(db: Session) -> None:
    for payload in SAMPLE_USERS:
        existing = db.query(User).filter(User.email == payload["email"]).first()
        if existing:
            continue
        db.add(
            User(
                name=payload["name"],
                email=payload["email"],
                hashed_password=hash_password(payload["password"]),
                role=payload["role"],
                org_name=payload["org_name"],
            )
        )
    db.commit()


if __name__ == "__main__":
    session = SessionLocal()
    try:
        seed(session)
        print("Sample users inserted/verified successfully")
    finally:
        session.close()
