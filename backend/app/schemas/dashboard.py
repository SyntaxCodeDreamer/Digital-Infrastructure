from pydantic import BaseModel

class DashboardSummaryResponse(BaseModel):
    totalRequests: int
    activeHotspots: int
    infrastructureGapsIdentified: int
    projectsTracked: int
    populationImpacted: int
    averageConfidence: float
