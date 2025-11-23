from datetime import datetime
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=140)
    description: str | None = Field(default=None, max_length=500)
    tags: list[str] = Field(default_factory=list)
    energy_level: str | None = Field(default=None, description="Morning/Afternoon/Night")
    mood: str | None = Field(default=None, description="User-reported mood for adaptive prompts")
    due_date: datetime | None = None


class TaskCreate(TaskBase):
    ...


class TaskResponse(TaskBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    status: Literal["pending", "in_progress", "done"] = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
