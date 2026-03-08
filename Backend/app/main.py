from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.api.routes.health import router as health_router
from app.api.routes.orgs import router as org_router
from app.api.routes.users import router as user_router
from app.core.config import ALLOWED_ORIGINS


app = FastAPI(title="Trade Finance Explorer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def org_scope_middleware(request: Request, call_next):
    request.state.org_name = request.headers.get("X-Org-Name")
    return await call_next(request)


app.include_router(health_router)
app.include_router(auth_router)
app.include_router(org_router)
app.include_router(user_router)
