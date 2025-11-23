from contextlib import asynccontextmanager

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup/shutdown tasks like database connections."""
    app.state.mongo_client = AsyncIOMotorClient(settings.mongodb_uri)
    app.state.db = app.state.mongo_client[settings.mongodb_db]
    yield
    app.state.mongo_client.close()
