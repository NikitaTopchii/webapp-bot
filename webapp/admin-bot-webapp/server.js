const express = require('express');
const path = require('path');
const http = require("http");

const app = express();

const serveStaticFiles = (lang) => {
  const staticFilesPath = path.join(__dirname, `dist/admin-bot-webapp/browser/${lang}`);
  console.log(`Static files path for ${lang}: ${staticFilesPath}`);
  app.use(`/${lang}`, express.static(staticFilesPath));
};

// Налаштування маршрутів для кожної локалізації
serveStaticFiles('en-US');
serveStaticFiles('ru');
serveStaticFiles('hi');

// Обробка запитів на зміну мови
app.get('/api/language/:lang', (req, res) => {
  const lang = req.params.lang;
  const supportedLangs = ['en-US', 'ru', 'hi'];
  if (supportedLangs.includes(lang)) {
    // Тут можна додати логіку для збереження вибору мови користувача, якщо потрібно
    res.status(200).send({ message: `Language switched to ${lang}` });
  } else {
    res.status(400).send({ error: 'Unsupported language' });
  }
});

const port = 80, host = '0.0.0.0';

const index = require("../../be-webapp/src/index");

let server_back = new index(app);

const server = http.createServer(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/admin-bot-webapp/browser/en-US/index.html'));
});

server.listen(port, host, () => console.log(`App running on: http://0.0.0.0:${port}`));
