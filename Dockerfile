FROM node:14.7-alpine

RUN npm install && npm run build
