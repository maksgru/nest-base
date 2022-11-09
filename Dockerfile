FROM node:16 as build

WORKDIR /app
COPY . .

RUN npm ci ; npm run build ; npm run test:ci
