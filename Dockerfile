FROM node:20
COPY . .

WORKDIR /be-webapp
COPY be-webapp/package*.json ./
RUN npm install
COPY be-webapp/ ./

WORKDIR /webapp/admin-bot-webapp
COPY webapp/admin-bot-webapp/package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY webapp/admin-bot-webapp/ ./

EXPOSE 80

CMD [ "node", "server.js" ]