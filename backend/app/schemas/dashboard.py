from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class Coordinates(BaseModel):
    x: int
    y: int
    lat: Optional[float] = None
    lng: Optional[float] = None

class CategoryBreakdown(BaseModel):
    healthcare: Optional[int] = 0
    roads: Optional[int] = 0
    water: Optional[int] = 0
    electricity: Optional[int] = 0
    digital: Optional[int] = 0
    safety: Optional[int] = 0
    environment: Optional[int] = 0

class HotspotSchema(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    district: str
    state: str
    country: str
    severity: str
    score: int
    requestCount: int
    affectedPopulation: int
    dominantCategory: str
    categoryBreakdown: CategoryBreakdown
    coordinates: Coordinates
    infrastructureGapPct: int
    existingInvestment: str
    summary: str
    
    class Config:
        populate_by_name = True

class PriorityMetrics(BaseModel):
    citizenRequests: int
    affectedPopulation: int
    infrastructureGapPct: int
    existingInvestment: str

class Evidence(BaseModel):
    primaryVoiceReq: str
    voiceQuote: str
    censusGap: str
    similarRequestsCount: int
    aiConfidence: float

class PriorityInsightSchema(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    district: str
    state: str
    category: str
    decisionScore: int
    status: str
    hotspotRef: str
    metrics: PriorityMetrics
    keyFactors: List[str]
    evidence: Evidence
    proposedBudget: str
    estimatedDuration: str
    expectedImpact: str
    
    class Config:
        populate_by_name = True
