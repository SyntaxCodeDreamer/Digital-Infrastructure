from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class LocationSchema(BaseModel):
    country: str
    state: str
    district: str
    subdistrict: Optional[str] = None
    landmark: Optional[str] = None

class CitizenRequestSchema(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    inputType: str
    language: str
    languageName: str
    originalText: str
    translatedText: str
    location: LocationSchema
    category: str
    subcategory: str
    urgency: str
    confidenceScore: float
    entities: List[str]
    affectedPopulation: Optional[int] = 0
    status: str
    similarRequests: List[str]
    createdAt: str
    audioDuration: Optional[str] = None
    verified: bool
    audioWaveform: Optional[List[int]] = None
    
    class Config:
        populate_by_name = True
