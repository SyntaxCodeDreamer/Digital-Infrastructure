"""
FastAPI Backend Application for BRICS Citizen Infrastructure Intelligence Platform
Refactored to modular architecture.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
from contextlib import asynccontextmanager
from app.config.database import connect_to_mongo, close_mongo_connection, get_db

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
try:
    from seed import seed_all_collections
except ImportError:
    seed_all_collections = None

# Import Routers
from app.routes import auth, requests, dashboard, projects, ai

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

# Include Routers
app.include_router(auth.router)
app.include_router(requests.router)
app.include_router(dashboard.router)
app.include_router(projects.router)
app.include_router(ai.router)

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
