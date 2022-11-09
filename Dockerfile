FROM node:14.15.0-stretch-slim as build

WORKDIR /app
COPY . .

RUN npm ci ; npm run build ; npm run test:ci
