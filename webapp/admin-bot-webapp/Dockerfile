FROM node:20
COPY . .

WORKDIR /be-webapp
COPY be-webapp/package*.json ./
RUN npm install
COPY be-webapp/ ./

WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .

EXPOSE 80

CMD [ "node", "server.js" ]