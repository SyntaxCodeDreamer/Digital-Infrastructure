import asyncio
import logging
from typing import Any, Dict, List, Optional
import datetime
from app.config.settings import settings

logger = logging.getLogger(__name__)

class InMemoryCursor:
    def __init__(self, docs: List[Dict[str, Any]]):
        self._docs = list(docs)

    def sort(self, key_or_list: Any, direction: int = 1):
        if isinstance(key_or_list, list):
            for k, d in reversed(key_or_list):
                self._docs.sort(key=lambda x: str(x.get(k, "")), reverse=(d == -1))
        elif isinstance(key_or_list, str):
            self._docs.sort(key=lambda x: str(x.get(key_or_list, "")), reverse=(direction == -1))
        return self

    def limit(self, n: int):
        self._docs = self._docs[:n]
        return self

    def skip(self, n: int):
        self._docs = self._docs[n:]
        return self

    async def to_list(self, length: Optional[int] = None) -> List[Dict[str, Any]]:
        if length is not None:
            return [dict(d) for d in self._docs[:length]]
        return [dict(d) for d in self._docs]

class InMemoryCollection:
    def __init__(self, name: str):
        self.name = name
        self._docs: List[Dict[str, Any]] = []

    def _matches(self, doc: Dict[str, Any], query: Dict[str, Any]) -> bool:
        if not query:
            return True
        for k, v in query.items():
            parts = k.split(".")
            curr = doc
            found = True
            for part in parts:
                if isinstance(curr, dict) and part in curr:
                    curr = curr[part]
                else:
                    found = False
                    break
            if not found:
                return False
            if isinstance(v, dict):
                if "$ne" in v and curr == v["$ne"]:
                    return False
                if "$in" in v and curr not in v["$in"]:
                    return False
            else:
                if str(curr).lower() != str(v).lower():
                    return False
        return True

    async def count_documents(self, filter: Dict[str, Any] = {}) -> int:
        return sum(1 for d in self._docs if self._matches(d, filter))

    def find(self, filter: Dict[str, Any] = {}) -> InMemoryCursor:
        matched = [d for d in self._docs if self._matches(d, filter)]
        return InMemoryCursor(matched)

    async def find_one(self, filter: Dict[str, Any] = {}) -> Optional[Dict[str, Any]]:
        for d in self._docs:
            if self._matches(d, filter):
                return dict(d)
        return None

    async def insert_one(self, document: Dict[str, Any]):
        if "_id" not in document:
            document["_id"] = f"{self.name}_{len(self._docs) + 1}_{datetime.datetime.utcnow().timestamp()}"
        self._docs.append(dict(document))
        
        class InsertResult:
            inserted_id = document["_id"]
        return InsertResult()

    async def insert_many(self, documents: List[Dict[str, Any]]):
        ids = []
        for doc in documents:
            res = await self.insert_one(doc)
            ids.append(res.inserted_id)
        class InsertManyResult:
            inserted_ids = ids
        return InsertManyResult()

    async def update_one(self, filter: Dict[str, Any], update: Dict[str, Any]):
        modified = 0
        for d in self._docs:
            if self._matches(d, filter):
                if "$set" in update:
                    for k, v in update["$set"].items():
                        parts = k.split(".")
                        target = d
                        for part in parts[:-1]:
                            if part not in target or not isinstance(target[part], dict):
                                target[part] = {}
                            target = target[part]
                        target[parts[-1]] = v
                    modified += 1
                break
        class UpdateResult:
            modified_count = modified
        return UpdateResult()

    def aggregate(self, pipeline: List[Dict[str, Any]]) -> InMemoryCursor:
        results = list(self._docs)
        for stage in pipeline:
            if "$group" in stage:
                group_spec = stage["$group"]
                groups = {}
                id_field = group_spec.get("_id", "")
                for doc in results:
                    group_val = "unknown"
                    if id_field and id_field.startswith("$"):
                        field_path = id_field[1:].split(".")
                        curr = doc
                        for p in field_path:
                            if isinstance(curr, dict) and p in curr:
                                curr = curr[p]
                            else:
                                curr = "unknown"
                                break
                        group_val = curr
                    if group_val not in groups:
                        groups[group_val] = {
                            "_id": group_val,
                            "requestCount": 0,
                            "affectedPopulation": 0,
                            "categories": []
                        }
                    groups[group_val]["requestCount"] += 1
                    groups[group_val]["affectedPopulation"] += doc.get("affectedPopulation", 0)
                    if "category" in doc:
                        groups[group_val]["categories"].append(doc["category"])
                results = list(groups.values())
            elif "$sort" in stage:
                for k, d in reversed(list(stage["$sort"].items())):
                    results.sort(key=lambda x: x.get(k, 0), reverse=(d == -1))
            elif "$limit" in stage:
                results = results[:stage["$limit"]]
        return InMemoryCursor(results)

class InMemoryDatabase:
    def __init__(self):
        self._collections: Dict[str, InMemoryCollection] = {}

    def __getitem__(self, name: str) -> InMemoryCollection:
        if name not in self._collections:
            self._collections[name] = InMemoryCollection(name)
        return self._collections[name]

    def __getattr__(self, name: str) -> InMemoryCollection:
        return self[name]

class Database:
    client = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        logger.info("Attempting connection to MongoDB (%s)...", settings.mongodb_uri)
        test_client = AsyncIOMotorClient(settings.mongodb_uri, serverSelectionTimeoutMS=1000)
        await asyncio.wait_for(test_client.admin.command('ping'), timeout=1.0)
        db_instance.client = test_client
        db_instance.db = test_client[settings.mongodb_db_name]
        logger.info("Successfully connected to live MongoDB database!")
    except Exception as e:
        logger.warning("Live MongoDB not available on localhost:27017 (%s). Initializing resilient in-memory database store.", e)
        db_instance.client = None
        db_instance.db = InMemoryDatabase()

async def close_mongo_connection():
    if db_instance.client:
        try:
            db_instance.client.close()
        except Exception:
            pass
        logger.info("Closed MongoDB connection.")

def get_db():
    if db_instance.db is None:
        db_instance.db = InMemoryDatabase()
    return db_instance.db
