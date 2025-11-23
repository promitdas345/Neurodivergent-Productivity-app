from datetime import datetime

from fastapi import APIRouter

from app.schemas.tasks import TaskCreate, TaskResponse

router = APIRouter()


@router.post("/create", response_model=TaskResponse, summary="Create a task")
async def create_task(task: TaskCreate) -> TaskResponse:
    # TODO: insert into MongoDB; stub returns in-memory response.
    return TaskResponse(
        **task.model_dump(),
        id="demo-id",
        status="pending",
        created_at=datetime.utcnow(),
    )


@router.get("/list", response_model=list[TaskResponse], summary="List tasks")
async def list_tasks() -> list[TaskResponse]:
    # TODO: query MongoDB; stub returns sample data.
    sample_task = TaskResponse(
        id="demo-id",
        title="Try focus mode",
        description="Start with a 25-minute focus block.",
        tags=["focus", "onboarding"],
        status="in_progress",
        created_at=datetime.utcnow(),
    )
    return [sample_task]
