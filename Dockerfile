FROM node:14.7-alpine

COPY ./ ./

RUN npm install && npm run build
