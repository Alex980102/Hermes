# __init__.py

from pydantic import BaseModel


class MessageIn(BaseModel):
    user_id: str
    message: str
    prompt: str


class Message(BaseModel):
    user_id: str
    message: str
