# For NodeJS 16
FROM node:16

# Maintainer: mflr0 <mflr0@onionmail.org>

# Create app directory
WORKDIR /server

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

# Create app directory

# CMD [ "node", "index.js" ]

