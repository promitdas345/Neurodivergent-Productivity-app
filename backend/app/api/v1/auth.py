from fastapi import APIRouter

from app.schemas.auth import AuthResponse, LoginRequest, RegisterRequest

router = APIRouter()


@router.post("/register", response_model=AuthResponse, summary="Register a new user")
async def register_user(payload: RegisterRequest) -> AuthResponse:
    # TODO: persist user and return JWT
    return AuthResponse(
        message="Registration placeholder; connect to MongoDB and add auth later.",
        access_token="demo-token",
    )


@router.post("/login", response_model=AuthResponse, summary="Authenticate a user")
async def login_user(payload: LoginRequest) -> AuthResponse:
    # TODO: validate credentials and issue real token
    return AuthResponse(
        message="Login placeholder; implement auth provider next.",
        access_token="demo-token",
    )
