from fastapi import APIRouter, HTTPException
from typing import List, Optional, Dict, Any
from app.schemas.request import CitizenRequestCreate
from app.config.database import get_db
from app.services.ai_service import analyze_citizen_request
from app.routes.ws import manager
import datetime

router = APIRouter(prefix="/api/requests", tags=["requests"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_requests(category: Optional[str] = None, urgency: Optional[str] = None):
    db = get_db()
    query = {}
    if category and category != "all":
        query["category"] = category
    if urgency and urgency != "all":
        query["urgency"] = urgency
    
    cursor = db.requests.find(query).sort("createdAt", -1)
    results = await cursor.to_list(length=100)
    for r in results:
        r["_id"] = str(r["_id"])
    return results

@router.get("/{request_id}")
async def get_request_by_id(request_id: str):
    db = get_db()
    request = await db.requests.find_one({"id": request_id})
    if request:
        request["_id"] = str(request["_id"])
        return request
    raise HTTPException(status_code=404, detail="Request not found")

@router.post("")
async def create_request(req: CitizenRequestCreate):
    db = get_db()
    total = await db.requests.count_documents({})
    new_id = f"REQ-{total + 8493}"
    
    # Analyze request using Gemini AI
    ai_result = await analyze_citizen_request(req.originalText, req.language)

    record = {
        "id": new_id,
        "title": req.originalText[:50] + ("..." if len(req.originalText) > 50 else ""),
        "originalText": req.originalText,
        "translatedText": ai_result["translatedText"],
        "language": req.language,
        "inputType": req.inputType,
        "category": ai_result["category"],
        "urgency": ai_result["urgency"],
        "confidenceScore": ai_result["confidenceScore"],
        "location": req.location.model_dump() if req.location else {"country": "India", "state": "Gujarat", "district": "Anand"},
        "affectedPopulation": 35000,
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "status": "Submitted & Analyzed"
    }
    
    await db.requests.insert_one(record)
    record["_id"] = str(record["_id"])
    
    # Broadcast real-time notification
    if record["urgency"] in ["High", "Critical"]:
        await manager.broadcast({
            "type": "NEW_CRITICAL_REQUEST",
            "message": f"New {record['urgency']} {record['category']} request in {record['location'].get('district', 'unknown')}",
            "data": record
        })
        
    return record
