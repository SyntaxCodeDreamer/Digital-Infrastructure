import asyncio
import logging
import datetime
from app.config.database import connect_to_mongo, close_mongo_connection, get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Dummy Data for ALL Collections defined in Architecture

DEMO_USERS = [
    {
        "email": "analyst@brics.gov",
        "role": "analyst",
        "name": "Dr. Rajesh Verma",
        "title": "Senior Infrastructure Planning Analyst",
        "department": "Gujarat State Infrastructure Planning Board",
        "country": "India"
    }
]

DEMO_CITIZEN_REQUESTS = [
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
            "subdistrict": "Tarapur"
        },
        "affectedPopulation": 42000,
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "status": "Prioritized in Hotspot"
    }
]

DEMO_AI_ANALYSIS = [
    {
        "request_id": "REQ-8492",
        "detectedLanguage": "gu",
        "entities": ["Tarapur", "Community Health Centre"],
        "sentiment": "urgent",
        "infrastructureGapMatch": "GAP-04",
        "confidenceScore": 0.96
    }
]

DEMO_LOCATIONS = [
    {
        "district": "Anand",
        "state": "Gujarat",
        "country": "India",
        "coordinates": {"lat": 22.56, "lng": 72.96},
        "regionType": "Rural"
    }
]

DEMO_DEMOGRAPHICS = [
    {
        "district": "Anand",
        "totalPopulation": 2090276,
        "healthcareAccessIndex": 64.5,
        "roadDensityIndex": 72.1,
        "lastUpdated": "2025-01-01"
    }
]

DEMO_INFRASTRUCTURE = [
    {
        "id": "INF-CHC-TARAPUR",
        "type": "Healthcare",
        "name": "Tarapur Community Health Centre",
        "district": "Anand",
        "status": "Operational",
        "connectivityStatus": "Poor"
    }
]

DEMO_INVESTMENT_PLANS = [
    {
        "id": "INV-2026-GUJ",
        "title": "Gujarat Rural Roads Renewal 2026",
        "allocatedBudget": 50000000,
        "currency": "INR",
        "targetDistricts": ["Anand", "Kheda"]
    }
]

DEMO_PROJECTS = [
    {
        "id": "PRJ-2026-1",
        "title": "Tarapur CHC Emergency Road Connectivity",
        "category": "healthcare",
        "budget": "$1.2M",
        "timeline": "6 Months",
        "status": "In Progress",
        "createdAt": datetime.datetime.utcnow().isoformat()
    }
]

DEMO_IMPACT_METRICS = [
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

DEMO_NOTIFICATIONS = [
    {
        "userId": "analyst@brics.gov",
        "title": "New Critical Hotspot Detected",
        "message": "High volume of requests near Tarapur CHC.",
        "isRead": False,
        "createdAt": datetime.datetime.utcnow().isoformat()
    }
]

DEMO_AUDIT_LOGS = [
    {
        "action": "PROJECT_CREATED",
        "userId": "analyst@brics.gov",
        "details": "Created PRJ-2026-1 for Tarapur road repair.",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }
]


async def seed_collection(db, collection_name, data):
    count = await db[collection_name].count_documents({})
    if count == 0:
        logger.info(f"Seeding '{collection_name}' collection...")
        await db[collection_name].insert_many(data)
    else:
        logger.info(f"'{collection_name}' collection already has data. Skipping.")

async def seed_all_collections(db):
    await seed_collection(db, "users", DEMO_USERS)
    await seed_collection(db, "requests", DEMO_CITIZEN_REQUESTS)
    await seed_collection(db, "ai_analysis", DEMO_AI_ANALYSIS)
    await seed_collection(db, "locations", DEMO_LOCATIONS)
    await seed_collection(db, "demographics", DEMO_DEMOGRAPHICS)
    await seed_collection(db, "infrastructure", DEMO_INFRASTRUCTURE)
    await seed_collection(db, "investment_plans", DEMO_INVESTMENT_PLANS)
    await seed_collection(db, "projects", DEMO_PROJECTS)
    await seed_collection(db, "impact", DEMO_IMPACT_METRICS)
    await seed_collection(db, "recommendations", [{"id":"INS-01", "title":"Rural Healthcare Connectivity", "district":"Anand", "category":"healthcare"}])
    await seed_collection(db, "notifications", DEMO_NOTIFICATIONS)
    await seed_collection(db, "audit_logs", DEMO_AUDIT_LOGS)
    logger.info("Database seeding complete for ALL 11 tables/collections!")

async def seed_database():
    logger.info("Connecting to MongoDB for full architecture seeding...")
    await connect_to_mongo()
    db = get_db()
    await seed_all_collections(db)
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_database())
