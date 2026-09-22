from fastapi import APIRouter, Depends
from app.config.database import get_db
from app.utils.auth import get_current_user
from typing import List, Dict, Any

router = APIRouter(prefix="/api/audit-logs", tags=["audit"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_audit_logs(current_user: dict = Depends(get_current_user)):
    db = get_db()
    # Fetch latest 50 audit logs
    cursor = db.audit_logs.find().sort("timestamp", -1).limit(50)
    results = await cursor.to_list(length=50)
    for r in results:
        r["_id"] = str(r["_id"])
    return results
