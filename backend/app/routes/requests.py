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
    new_id = req.id or f"REQ-{total + 8493}"
    
    # Analyze request using Gemini AI (with fallback if key not configured)
    ai_result = await analyze_citizen_request(req.originalText, req.language)

    category = req.category if (req.category and req.category != "auto") else ai_result.get("category", "healthcare")
    urgency = req.urgency or ai_result.get("urgency", "Medium")
    translated = req.translatedText or ai_result.get("translatedText", req.originalText)
    confidence = req.confidenceScore or ai_result.get("confidenceScore", 0.95)

    record = {
        "id": new_id,
        "title": req.title or (req.originalText[:50] + ("..." if len(req.originalText) > 50 else "")),
        "originalText": req.originalText,
        "translatedText": translated,
        "language": req.language,
        "inputType": req.inputType,
        "category": category,
        "urgency": urgency,
        "confidenceScore": confidence,
        "location": req.location.model_dump() if req.location else {"country": "India", "state": "Gujarat", "district": "Anand"},
        "affectedPopulation": 35000,
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "status": "Submitted & Analyzed"
    }
    
    await db.requests.insert_one(record)
    record["_id"] = str(record.get("_id", record.get("id", "")))
    
    # Broadcast real-time notification
    if record["urgency"] in ["High", "Critical"]:
        try:
            await manager.broadcast({
                "type": "NEW_CRITICAL_REQUEST",
                "message": f"New {record['urgency']} {record['category']} request in {record['location'].get('district', 'unknown')}",
                "data": record
            })
        except Exception:
            pass
        
    return record
