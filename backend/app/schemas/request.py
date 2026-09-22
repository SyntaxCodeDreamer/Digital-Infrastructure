from pydantic import BaseModel
from typing import Optional

class LocationModel(BaseModel):
    country: str = "India"
    state: str = "Gujarat"
    district: str = "Anand"
    subdistrict: Optional[str] = "Tarapur"
    landmark: Optional[str] = "Near Community Health Centre"

class CitizenRequestCreate(BaseModel):
    originalText: str
    language: str = "gu"
    inputType: str = "voice"
    category: Optional[str] = "healthcare"
    location: Optional[LocationModel] = None

class CitizenRequestResponse(BaseModel):
    id: str
    title: str
    originalText: str
    translatedText: str
    language: str
    inputType: str
