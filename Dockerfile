FROM node:8.7.0-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache git
WORKDIR /usr/src/app

COPY package.json /usr/src/app
EXPOSE 3000
COPY . /usr/src/app
RUN "yarn"
CMD [ "yarn", "start" ]
