from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.user import RoleEnum, User


def run_checks(db: Session) -> None:
    for role in RoleEnum:
        count = db.query(User).filter(User.role == role).count()
        print(f"Role={role.value} count={count}")

    org = "FirstBank"
    scoped_users = db.query(User).filter(User.org_name == org).all()
    print(f"Org={org} users={[u.email for u in scoped_users]}")


if __name__ == "__main__":
    session = SessionLocal()
    try:
        run_checks(session)
    finally:
        session.close()
