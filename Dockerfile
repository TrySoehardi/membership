# Base Image
FROM node:14-alpine

WORKDIR /usr/app
# install dependencies
COPY ./package.json ./
COPY ./src /usr/app/src
COPY ./tsconfig.json /usr/app/tsconfig.json

RUN npm install
COPY ./ ./
EXPOSE 3000

# Default command
CMD npm run start