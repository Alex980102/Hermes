from app.main import app
import uvicorn
from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0",
                port=int(os.environ.get('PORT', 8000)), reload=True)
