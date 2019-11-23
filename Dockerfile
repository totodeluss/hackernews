FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

ENTRYPOINT ["node", "index.js" ]
CMD []

