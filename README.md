## Índice

### [1.-Archivos a editar](#archivos-a-editar)

### [2.-Edición de archivos](#1-edición-de-archivos)

### [3.-Iniciar tu proyecto](#iniciar-tu-proyecto)

### Archivos a editar

Para lanzar la aplicación se editarán 2 archivos clave.

- openai_api.env
- whats_main/.env

<br>

### Edición de archivos
<br>

whats_main/.env

Solo copiamos el archivo _.env.template_ y creas uno llamado _.env_ 

Aquí puedes cambiar los puertos y nombre de la DB


<br>
openai_api.env

Igualmente copiamos el archivo _.env.template_ y creas uno llamado _.env_


```
PORT=8000
REDIS_URL=redis://tuIp:6379
OPENAI_API_KEY=ApiKey
```

<br>

### Iniciar tu proyecto

Descargamos globalmente yarn

```bash
npm i yarn -g
```

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
npm run start
```


###  Troubleshoot

En caso de tener problemas al montar la img de docker en almacenamiento externo, comentar la línea en de volumes en docker-compose.yaml
```yaml
  redis:
    image: redis
    ports:
      - "6379:6379"

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    # volumes:
    #   - ./mongo:/data/db
```
