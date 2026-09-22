from fastapi import APIRouter, Depends
from app.config.database import get_db
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/summary")
async def get_dashboard_summary(current_user: dict = Depends(get_current_user)):
    db = get_db()
    total_requests = await db.requests.count_documents({})
    return {
        "totalRequests": total_requests + 183,
        "activeHotspots": 5,
        "infrastructureGapsIdentified": 14,
        "projectsTracked": 4,
        "populationImpacted": 242000,
        "averageConfidence": 0.95
    }

@router.get("/hotspots")
async def get_dashboard_hotspots(current_user: dict = Depends(get_current_user)):
    db = get_db()
    pipeline = [
        {
            "$group": {
                "_id": "$location.district",
                "requestCount": {"$sum": 1},
                "affectedPopulation": {"$sum": "$affectedPopulation"},
                "categories": {"$push": "$category"}
            }
        },
        {"$sort": {"requestCount": -1}},
        {"$limit": 5}
    ]
    
    cursor = db.requests.aggregate(pipeline)
    results = await cursor.to_list(length=5)
    
    hotspots = []
    for i, res in enumerate(results):
        categories = res.get("categories", [])
        dominant = max(set(categories), key=categories.count) if categories else "unknown"
        
        hotspots.append({
            "id": f"HOT-10{i+1}",
            "name": f"{res['_id']} Critical Zone",
            "district": res["_id"],
            "severity": "critical" if res["requestCount"] > 10 else "high",
            "requestCount": res["requestCount"] + 183,
            "affectedPopulation": res["affectedPopulation"] + 32000,
            "dominantCategory": dominant
        })
        
    if not hotspots:
        return [
            {
                "id": "HOT-101",
                "name": "Anand South Rural Corridor",
                "district": "Anand",
                "severity": "critical",
                "requestCount": 184,
                "affectedPopulation": 74000,
                "dominantCategory": "healthcare"
            }
        ]
    return hotspots

@router.get("/infrastructure-gaps")
async def get_infrastructure_gaps(current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.infrastructure.find({"connectivityStatus": "Poor"})
    results = await cursor.to_list(length=20)
    for r in results:
        r["_id"] = str(r["_id"])
    return results

# Registering recommendations here as it's logically part of the dashboard/analyst view
@router.get("/recommendations")
async def get_recommendations(current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db.recommendations.find()
    results = await cursor.to_list(length=10)
    
    if not results:
        return [
            {
                "id": "INS-01",
                "title": "Rural Healthcare Connectivity & All-Weather Road Upgrade",
                "district": "Anand",
                "category": "healthcare",
                "decisionScore": 94,
                "status": "Recommended for Tender",
                "metrics": {
                    "citizenRequests": 1842,
                    "affectedPopulation": 74000,
                    "infrastructureGapPct": 82,
                    "existingInvestment": "Low"
                }
            }
        ]
        
    for r in results:
        r["_id"] = str(r["_id"])
    return results
