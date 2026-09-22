from fastapi import APIRouter, HTTPException, Depends
from app.schemas.user import LoginRequest, LoginResponse
from app.config.database import get_db
from app.utils.auth import create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
async def login(req: LoginRequest):
    email = req.email.strip().lower()
    db = get_db()
    
    # Check if user exists and verify password
    user = await db.users.find_one({"email": email})
    
    if not user or not verify_password(req.password, user.get("hashed_password", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    access_token = create_access_token(data={"sub": user["email"]})
    return {
        "success": True,
        "token": access_token,
        "user": {
            "email": user["email"],
            "role": user["role"],
            "name": user["name"],
            "title": user["title"],
            "department": user["department"],
            "country": user["country"],
            "avatar": user.get("avatar", "👨‍💼")
        }
    }
    raise HTTPException(status_code=401, detail="Invalid email or password")
