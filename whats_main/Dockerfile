FROM node:16-alpine3.14 as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production


FROM node:16-alpine3.14 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
RUN npm i -g @nestjs/cli
COPY . .
RUN npm i --save-dev @types/node # Aquí se agrega la instalación de las definiciones de tipos
RUN npm run build


FROM node:16-alpine3.14 as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main" ]
