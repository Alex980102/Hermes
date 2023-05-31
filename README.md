![Stable Diffusion Image about Hermes AI](https://i.imgur.com/qrFGhPX.png)


## Índice

### [1.-Archivos a editar](#archivos-a-editar)

### [2.-Edición de archivos](#1-edición-de-archivos)

### [3.-Iniciar tu proyecto](#iniciar-tu-proyecto)

### Archivos a editar

Para lanzar la aplicación se editarán 4 archivos clave.

- docker-compose.yaml
- bot-1/.env
- whats_main/.env
- openai_api/.env

<br>

### Edición de archivos
<br>

docker-compose.yaml

En este archivo agregas tu IP y la Api Key de OpenAi
```jsx
- REDIS_URL=redis://tuIp:6379
- OPENAI_API_KEY=ApiKey
```
<br>

bot-1/.env

Copias el archivo _.env.template_ y creas uno llamado _.env_

El archivo _.env_ tendrás que resgistrar tu IP:
```jsx
API_URL=http://tuIp:8000
```

<br>

whats_main/.env

Solo copiamos el archivo _.env.template_ y creas uno llamado _.env_ 

Aquí puedes cambiar los puertos y nombre de la DB


<br>
openai_api/.env

Igualmente copiamos el archivo _.env.template_ y creas uno llamado _.env_


```jsx
REDIS_URL=redis://tuIP:6379
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
