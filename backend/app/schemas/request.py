from pydantic import BaseModel
from typing import Optional

class LocationModel(BaseModel):
    country: str = "India"
    state: str = "Gujarat"
    district: str = "Anand"
    subdistrict: Optional[str] = "Tarapur"
    landmark: Optional[str] = "Near Community Health Centre"

class CitizenRequestCreate(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    originalText: str
    translatedText: Optional[str] = None
    language: str = "gu"
    inputType: str = "voice"
    category: Optional[str] = "healthcare"
    urgency: Optional[str] = "Medium"
    confidenceScore: Optional[float] = 0.95
    location: Optional[LocationModel] = None

class CitizenRequestResponse(BaseModel):
    id: str
    title: str
    originalText: str
    translatedText: str
    language: str
    inputType: str
