FROM --platform=arm64 node:lts-alpine

RUN apk add --no-cache
RUN npm install -g @nestjs/cli

USER node
WORKDIR /home/node/app
