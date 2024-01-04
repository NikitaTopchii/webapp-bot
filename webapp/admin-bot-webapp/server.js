const express = require('express');
const path = require('path');
const http = require("http");
const fs = require('fs');

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

const port = process.env.PORT;

const index = require("../../be-webapp/src/index");

let server_back = new index(app, process.env.SERVER_URL);

const server = http.createServer(app);

writeENV();
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/admin-bot-webapp/browser/en-US/index.html'));
});

function writeENV() {
  if (process.env.NODE_ENV) {
    let content = "(function (window) {" +
      "window.__env = window.__env || {};" +
      "window.__env.SERVER_URL = '" + process.env.SERVER_URL + "';" +
      "}(this));"
    fs.writeFile(path.join(__dirname.replace(/\\/g, "/"), '/view/dist/assets/environments/env.js'), content, (err) => {
      if (err) throw err;
      console.log('SERVER_URL :', process.env.SERVER_URL)
      console.log('Successfully saved env.js file.');
    });
  }
}
server.listen(port, () => console.log(`App running on: http://0.0.0.0:${port}`));
