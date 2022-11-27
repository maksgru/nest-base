FROM node:16.17.0-bullseye-slim

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile --only=prod
