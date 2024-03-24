const express = require('express');
const path = require('path');
const http = require("http");

const app = express();

const serveStaticFilesForUserWebApp = (lang) => {
  const staticFilesPath = path.join(__dirname, `dist/user-webapp/browser/${lang}`);
  app.use(`/used-webapp/${lang}`, express.static(staticFilesPath));
};

const serveStaticFilesForAdminWebApp = (lang) => {
  const staticFilesPath = path.join(__dirname, `dist/admin-bot-webapp/browser/${lang}`);
  app.use(`/${lang}`, express.static(staticFilesPath));
};
// const serveStaticFiles = (packageName, lang) => {
//   const staticFilesPath = path.join(__dirname, `dist/${packageName}/browser/${lang}`);
//   app.use(`/${packageName}/${lang}`, express.static(staticFilesPath));
// };


// const setupRoutes = (packageName) => {
//   serveStaticFiles(packageName, 'en-US');
//   serveStaticFiles(packageName, 'ru');
//   serveStaticFiles(packageName, 'hi');
// };
serveStaticFilesForUserWebApp('en-US');
serveStaticFilesForUserWebApp('ru');
serveStaticFilesForUserWebApp('hi');

serveStaticFilesForAdminWebApp('en-US');
serveStaticFilesForAdminWebApp('ru');
serveStaticFilesForAdminWebApp('hi');

// setupRoutes('admin-bot-webapp');

// app.get('/api/language/:packageName/:lang', (req, res) => {
//   const packageName = req.params.packageName;
//   const lang = req.params.lang;
//   const supportedLangs = ['en-US', 'ru', 'hi'];
//   if (supportedLangs.includes(lang)) {
//     // Тут можна додати логіку для збереження вибору мови користувача, якщо потрібно
//     res.status(200).send({ message: `Language switched to ${lang} for ${packageName}` });
//   } else {
//     res.status(400).send({ error: 'Unsupported language' });
//   }
// });


// app.get('/api/language/:lang', (req, res) => {
//   const lang = req.params.lang;
//   const supportedLangs = ['en-US', 'ru', 'hi'];
//   if (supportedLangs.includes(lang)) {
//     // Тут можна додати логіку для збереження вибору мови користувача, якщо потрібно
//     res.status(200).send({ message: `Language switched to ${lang}` });
//   } else {
//     res.status(400).send({ error: 'Unsupported language' });
//   }
// });

const port = 80, host = '0.0.0.0';

const index = require("./be-webapp/src/index");

let server_back = new index(app);

const server = http.createServer(app);


// app.get('/:packageName/*', (req, res) => {
//   const packageName = req.params.packageName;
//   console.log(packageName)
//   const lang = 'en-US'; // Для спрощення обробки мови, використовуємо англійську
//   res.sendFile(path.join(__dirname, `dist/${packageName}/browser/${lang}/index.html`));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/admin-bot-webapp/browser/en-US/index.html'));
});

server.listen(port, host, () => console.log(`App running on: http://0.0.0.0:${port}`));
