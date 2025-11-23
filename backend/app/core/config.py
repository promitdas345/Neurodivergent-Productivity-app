import os
from functools import lru_cache
from pydantic import BaseModel, ConfigDict, Field


def _parse_csv_env(raw_value: str) -> list[str]:
    return [item.strip() for item in raw_value.split(",") if item.strip()]


class Settings(BaseModel):
    """Lightweight settings loader for environment-driven config."""

    app_name: str = "Neurodivergent Productivity API"
    api_prefix: str = "/api"
    mongodb_uri: str = Field(
        default_factory=lambda: os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    )
    mongodb_db: str = Field(
        default_factory=lambda: os.getenv("MONGODB_DB", "neuro_productivity")
    )
    groq_api_key: str = Field(default_factory=lambda: os.getenv("GROQ_API_KEY", ""))
    cors_origins: list[str] = Field(
        default_factory=lambda: _parse_csv_env(
            os.getenv("CORS_ORIGINS", "http://localhost:3000")
        )
    )

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @property
    def allowed_origins(self) -> list[str]:
        return [origin for origin in self.cors_origins if origin]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
