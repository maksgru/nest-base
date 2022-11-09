FROM node:16 as build

WORKDIR /app
COPY . .

RUN yarn ;  yarn build ; yarn test:unit
