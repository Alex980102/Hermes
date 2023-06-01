from fastapi import APIRouter, Depends
from .models import MessageIn, Message
from .services import OpenAIAssistant, RedisConnection

api_router = APIRouter()

# Create a RedisConnection instance
redis_connection = RedisConnection()

# Pass the redis_connection instance to the OpenAIAssistant constructor
assistant = OpenAIAssistant(redis_connection)


@api_router.post("/message/")
async def send_message(input: MessageIn):
    print(input.prompt)
    return await assistant.send_message(input)
