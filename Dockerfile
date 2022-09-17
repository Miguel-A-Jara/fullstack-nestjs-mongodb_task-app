ARG PORT
ARG MONGODB

FROM node:16-alpine

WORKDIR /dockered-nest-app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3500

CMD [ "npm", "run", "start:prod" ]