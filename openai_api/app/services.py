# __init__.py

import asyncio
import openai
from aiohttp import ClientSession, ClientConnectorError
from .models import MessageIn, Message
from .database import RedisConnection
import json
from .config import Settings


class OpenAIAssistant:
    def __init__(self, redis_connection: RedisConnection):
        self.settings = Settings()
        openai.api_key = self.settings.OPENAI_API_KEY
        self.redis_connection = redis_connection

    async def async_post(self, url, headers, json_data, session):
        async with session.post(url, headers=headers, json=json_data) as resp:
            response_json = await resp.json()
            return response_json

    async def get_openai_response(self, messages, retries=5):
        async with ClientSession() as session:
            for i in range(retries):
                try:
                    headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {openai.api_key}",
                    }
                    json_data = {
                        "model": "gpt-3.5-turbo",
                        "messages": messages,
                        "temperature": 0.8,
                        "top_p": 1,
                        "frequency_penalty": 0.5,
                        "presence_penalty": 0.5,
                    }
                    url = "https://api.openai.com/v1/chat/completions"
                    response = await self.async_post(url, headers, json_data, session)
                    print(response)
                    return response
                except ClientConnectorError as e:
                    if i < retries - 1:
                        backoff_time = 2 ** i
                        await asyncio.sleep(backoff_time)
                        continue
                    else:
                        raise e
                except openai.error.OpenAIError as e:
                    raise e

    async def send_message(self, input: MessageIn):
        user_id = input.user_id
        message = input.message
        conversation_key = f"conversation:{user_id}"
        initial_message = {
            "role": "system",
            "content": input.prompt}

        # await self.redis_connection.redis.rpush(conversation_key, json.dumps(initial_message))
        user_message = {"role": "user", "content": message}
        await self.redis_connection.redis.rpush(conversation_key, json.dumps(user_message))

        conversation = [json.loads(msg) for msg in await self.redis_connection.redis.lrange(conversation_key, 0, -1)]
        # Insert the initial_message at the beginning of the conversation
        conversation.insert(0, initial_message)
        print(conversation)

        response = await self.get_openai_response(conversation)
        response_content = response['choices'][0]['message']['content']

        assistant_message = {"role": "assistant", "content": response_content}
        await self.redis_connection.redis.rpush(conversation_key, json.dumps(assistant_message))

        return {"message": response_content}
