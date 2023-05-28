import aioredis
from aioredis import Redis
import os


class RedisConnection:
    def __init__(self):
        self.redis: Redis = None

    async def connect(self):
        self.redis = await aioredis.from_url(os.environ.get('REDIS_URL'))

    async def close(self):
        if self.redis:
            self.redis.close()
            await self.redis.wait_closed()
