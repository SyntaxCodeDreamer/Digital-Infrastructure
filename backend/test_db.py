import asyncio
import logging
from app.config.database import connect_to_mongo, close_mongo_connection, get_db
from app.main import DEMO_REQUESTS

logging.basicConfig(level=logging.INFO)

async def test_db():
    print("Testing MongoDB connection...")
    try:
        await connect_to_mongo()
        db = get_db()
        
        # Test inserting dummy data if empty
        count = await db.requests.count_documents({})
        print(f"Current document count in 'requests' collection: {count}")
        
        if count == 0:
            print("Inserting DEMO_REQUESTS...")
            await db.requests.insert_many(DEMO_REQUESTS)
            count = await db.requests.count_documents({})
            print(f"Insertion successful. New count: {count}")
        else:
            print("Database already contains data.")
            
        # Verify read
        cursor = db.requests.find()
        docs = await cursor.to_list(length=2)
        print("Sample data fetched:")
        for doc in docs:
            print(f"- {doc['id']}: {doc['title']}")
            
        await close_mongo_connection()
        print("Database connection test passed successfully!")
    except Exception as e:
        print(f"Database connection failed: {e}")
        print("Please ensure MongoDB is running locally on port 27017.")

if __name__ == "__main__":
    asyncio.run(test_db())
