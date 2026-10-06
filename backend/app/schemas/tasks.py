from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field

EnergyLevel = Literal["Morning", "Afternoon", "Night"]
TaskStatus = Literal["pending", "in_progress", "done"]


def utc_now() -> datetime:
    """The current time in UTC, time-zone aware so it serialises with a Z."""
    return datetime.now(timezone.utc)


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=140)
    description: str | None = Field(default=None, max_length=500)
    tags: list[str] = Field(default_factory=list)
    energy_level: EnergyLevel | None = Field(default=None, description="Morning/Afternoon/Night")
    mood: str | None = Field(default=None, description="User-reported mood for adaptive prompts")
    due_date: datetime | None = None


class TaskCreate(TaskBase):
    ...


class TaskResponse(TaskBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    status: TaskStatus = "pending"
    created_at: datetime = Field(default_factory=utc_now)
