FROM node:14-alpine

# Maintainer: mflr0 <mflr0@onionmail.org>

# Create app directory
WORKDIR /client_web

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081
ENV HOST=0.0.0.0

CMD [ "npm", "run", "build" ]
