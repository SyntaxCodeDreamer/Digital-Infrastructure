from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "analyst"

class UserProfile(BaseModel):
    email: str
    role: str
    name: str
    title: str
    department: str
    country: str
    avatar: str

class LoginResponse(BaseModel):
    success: bool
    token: str
    user: UserProfile
