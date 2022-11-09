FROM node:16.17.0-bullseye-slim as build

WORKDIR /app
COPY . .

RUN yarn ;  yarn build ; yarn test:unit
