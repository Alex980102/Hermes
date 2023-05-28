## Índice

### [1.-Archivos a editar](#archivos-a-editar)

### [1.-Edición de archivos](#1-edición-de-archivos)

### [2.-Iniciar tu proyecto](#iniciar-tu-proyecto)

### Archivos a editar

Para lanzar la aplicación se editarán 3 archivos clave.

- docker-compose.yaml
- bot-1/.env
- openai-api/app/database.py

### Edición de archivos

docker-compose.yaml

En este archivo agregas tu IP y la Api Key de OpenAi

```jsx
- REDIS_URL=redis://tuIp:6379
- OPENAI_API_KEY=12io3JDAK24...
```

bot-1/.env

Copias el archivo _.env.template_ y creas uno llamado _.env_

El archivo _.env_ tendrás que resgistrar tu IP:

```jsx
API_URL=http://tuIp:8000
```

openai-api/app/database.py

En el archivo registraras también tu ip, para poder conectarte a la DB

```jsx
import aioredis
from aioredis import Redis

class RedisConnection:
    def __init__(self):
        self.redis: Redis = None

    async def connect(self):
        self.redis = await aioredis.from_url("redis://tuIp:6379")

    async def close(self):
        if self.redis:
            self.redis.close()
            await self.redis.wait_closed()
```

### Iniciar tu proyecto

Preparas docker

```bash
docker compose build
```

Inicias la aplicación con docker

```bash
docker compose up
```

Descargas los paquetes de node.

```bash
cd .\bot-1\
npm i
```

Lanzas el bot

```bash
node index.js
```
