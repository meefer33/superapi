# Use Node 16 alpine as parent image
FROM node:16-alpine
WORKDIR /app
COPY . ./
RUN yarn
CMD yarn dev