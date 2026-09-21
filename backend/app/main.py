"""
FastAPI Backend Application for BRICS Citizen Infrastructure Intelligence Platform
As specified in ARCHITECTURE.md
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import datetime
import uvicorn
from contextlib import asynccontextmanager
from app.config.database import connect_to_mongo, close_mongo_connection, get_db
from app.services.ai_service import analyze_citizen_request

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
try:
    from seed import seed_all_collections
except ImportError:
    seed_all_collections = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    db = get_db()
    if seed_all_collections:
        await seed_all_collections(db)
    yield
    await close_mongo_connection()

app = FastAPI(
    title="BRICS Citizen Infrastructure Intelligence Platform API",
    description="Digital Public Good bridging grassroots citizen development needs and public infrastructure planning.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas
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

class ProjectCreate(BaseModel):
    title: str
    category: str
    budget: str
    timeline: str
    status: str = "Planning"

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "analyst"

class UserProfile(BaseModel):
    email: str
    role: str
    name: str
    title: str
    department: str
    country: str
    avatar: str

class LoginResponse(BaseModel):
    success: bool
    token: str
    user: UserProfile

DEMO_USERS = {
    "analyst@brics.gov": {
        "password": "analyst123",
        "role": "analyst",
        "name": "Dr. Rajesh Verma",
        "title": "Senior Infrastructure Planning Analyst",
        "department": "Gujarat State Infrastructure Planning Board",
        "country": "India",
        "avatar": "👨‍💼"
    },
    "admin@brics.gov": {
        "password": "admin123",
        "role": "admin",
        "name": "Elena Rostova",
        "title": "Chief Model Governance & Systems Architect",
        "department": "BRICS Digital Public Infrastructure Authority",
        "country": "BRICS Secretariat",
        "avatar": "👩‍💻"
    }
}

# In-Memory seed database matching PRD Section 12
DEMO_REQUESTS = [
    {
        "id": "REQ-8492",
        "title": "Rural Healthcare & Tarapur CHC Emergency Road Connectivity",
        "originalText": "અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે, દર્દીઓ અને એમ્બ્યુલન્સ સમયસર હોસ્પિટલ પહોંચી શકતા નથી.",
        "translatedText": "The road from our Tarapur village to the Community Health Centre is broken since the monsoon, patients and ambulances cannot reach the hospital in time.",
        "language": "gu",
        "inputType": "voice",
        "category": "healthcare",
        "urgency": "Critical",
        "confidenceScore": 0.96,
        "location": {
            "country": "India",
            "state": "Gujarat",
            "district": "Anand",
            "subdistrict": "Tarapur",
            "landmark": "Near Tarapur CHC Junction"
        },
        "affectedPopulation": 42000,
        "createdAt": "2026-09-20T08:14:00Z",
        "status": "Prioritized in Hotspot"
    }
]

@app.get("/")
def root():
    return {
        "platform": "BRICS Citizen Infrastructure Intelligence Platform",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.datetime.utcnow().isoformat()}

# Authentication Endpoint
@app.post("/api/auth/login")
def login(req: LoginRequest):
    email = req.email.strip().lower()
    user = DEMO_USERS.get(email)
    if user and user["password"] == req.password:
        return {
            "success": True,
            "token": f"jwt_brics_token_{int(datetime.datetime.utcnow().timestamp())}",
            "user": {
                "email": email,
                "role": user["role"],
                "name": user["name"],
                "title": user["title"],
                "department": user["department"],
                "country": user["country"],
                "avatar": user["avatar"]
            }
        }
    return {"success": False, "error": "Invalid email or password"}

# Requests Endpoints
@app.get("/api/requests", response_model=List[Dict[str, Any]])
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

@app.get("/api/requests/{request_id}")
async def get_request_by_id(request_id: str):
    db = get_db()
    request = await db.requests.find_one({"id": request_id})
    if request:
        request["_id"] = str(request["_id"])
        return request
    return {"error": "Request not found", "id": request_id}

@app.post("/api/requests")
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
        "location": req.location.dict() if req.location else {"country": "India", "state": "Gujarat", "district": "Anand"},
        "affectedPopulation": 35000,
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "status": "Submitted & Analyzed"
    }
    
    await db.requests.insert_one(record)
    record["_id"] = str(record["_id"])
    return record

# Speech-to-Text Endpoint
@app.post("/api/voice/transcribe")
async def transcribe_voice(audio: UploadFile = File(...), language: str = Form("gu")):
    return {
        "transcript": "અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે, દર્દીઓ અને એમ્બ્યુલન્સ સમયસર હોસ્પિટલ પહોંચી શકતા નથી.",
        "detectedLanguage": language,
        "confidence": 0.96,
        "duration": "0:22"
    }

# Dashboard Analytics
@app.get("/api/dashboard/summary")
async def get_dashboard_summary():
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

@app.get("/api/dashboard/hotspots")
async def get_dashboard_hotspots():
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
            "requestCount": res["requestCount"] + 183,  # added base offset for demo visual impact
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

@app.get("/api/recommendations")
async def get_recommendations():
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

@app.get("/api/projects")
async def get_projects():
    db = get_db()
    cursor = db.projects.find().sort("createdAt", -1)
    results = await cursor.to_list(length=20)
    for r in results:
        r["_id"] = str(r["_id"])
    return results

@app.post("/api/projects")
async def create_project(req: ProjectCreate):
    db = get_db()
    total = await db.projects.count_documents({})
    new_id = f"PRJ-2026-{total + 1}"
    
    record = {
        "id": new_id,
        "title": req.title,
        "category": req.category,
        "budget": req.budget,
        "timeline": req.timeline,
        "status": req.status,
        "createdAt": datetime.datetime.utcnow().isoformat()
    }
    
    await db.projects.insert_one(record)
    record["_id"] = str(record["_id"])
    return record

@app.get("/api/impact")
async def get_impact_metrics():
    db = get_db()
    cursor = db.impact.find()
    results = await cursor.to_list(length=10)
    if not results:
        return [
            {
                "metric": "Projects Completed",
                "value": "12",
                "trend": "+3 this quarter"
            },
            {
                "metric": "Citizens Impacted",
                "value": "450,000",
                "trend": "+12% yoy"
            }
        ]
    for r in results:
        r["_id"] = str(r["_id"])
    return results

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
