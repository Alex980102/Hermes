from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the assistant instance from api.py
from .api import api_router, assistant
from .config import Settings

app = FastAPI()

# Configurar CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear una instancia de la clase Settings
settings = Settings()


@app.on_event("startup")
async def startup_event():
    await assistant.redis_connection.connect()


@app.on_event("shutdown")
async def shutdown_event():
    await assistant.redis_connection.close()

app.include_router(api_router)
