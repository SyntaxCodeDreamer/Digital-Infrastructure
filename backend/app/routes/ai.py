from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.speech_service import transcribe_audio
from app.services.ai_service import analyze_citizen_request
from app.config.database import get_db

router = APIRouter(prefix="/api", tags=["ai", "voice"])

@router.post("/voice/transcribe")
async def transcribe_voice(audio: UploadFile = File(...), language: str = Form("gu")):
    # Call the speech service instead of mocking here directly
    result = await transcribe_audio(audio, language)
    return result

@router.post("/requests/{request_id}/analyze")
async def analyze_request(request_id: str):
    db = get_db()
    request = await db.requests.find_one({"id": request_id})
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
        
    # Example logic: re-analyze an existing request
    analysis_result = await analyze_citizen_request(request["originalText"], request.get("language", "gu"))
    
    # Update request in DB
    await db.requests.update_one(
        {"id": request_id}, 
        {"$set": {
            "translatedText": analysis_result["translatedText"],
            "category": analysis_result["category"],
            "urgency": analysis_result["urgency"],
            "confidenceScore": analysis_result["confidenceScore"],
            "status": "Re-analyzed"
        }}
    )
    
    return {"message": "Analysis complete", "analysis": analysis_result}
