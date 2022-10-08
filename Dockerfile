ARG PORT
ARG MONGODB

FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /root/dockered-nest-app
COPY package*.json .
RUN npm install

FROM node:16-alpine AS builder
WORKDIR /root/dockered-nest-app
COPY --from=deps /root/dockered-nest-app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /root/dockered-nest-app

COPY --from=builder /root/dockered-nest-app ./

EXPOSE 3500

CMD [ "npm", "run", "start" ]