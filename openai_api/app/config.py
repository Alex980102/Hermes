from pydantic import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"
