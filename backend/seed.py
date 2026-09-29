import asyncio
import logging
import datetime
from app.config.database import connect_to_mongo, close_mongo_connection, get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DEMO_USERS = []
DEMO_CITIZEN_REQUESTS = []
DEMO_AI_ANALYSIS = []
DEMO_LOCATIONS = []
DEMO_DEMOGRAPHICS = []
DEMO_INFRASTRUCTURE = []
DEMO_INVESTMENT_PLANS = []
DEMO_PROJECTS = []
DEMO_IMPACT_METRICS = []
DEMO_RECOMMENDATIONS = []
DEMO_NOTIFICATIONS = []
DEMO_AUDIT_LOGS = []


async def seed_collection(db, collection_name, data):
    if not data:
        logger.info(f"No data to seed for '{collection_name}'. Skipping.")
        return
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
    await seed_collection(db, "recommendations", DEMO_RECOMMENDATIONS)
    await seed_collection(db, "notifications", DEMO_NOTIFICATIONS)
    await seed_collection(db, "audit_logs", DEMO_AUDIT_LOGS)
    logger.info("Database seeding complete!")

async def seed_database():
    logger.info("Connecting to MongoDB for full architecture seeding...")
    await connect_to_mongo()
    db = get_db()
    await seed_all_collections(db)
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_database())
