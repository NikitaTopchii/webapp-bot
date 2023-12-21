const express = require('express');
const path = require('path');

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

app.get('*', (req, res) => {
  // Тут можна додати логіку для визначення поточної мови користувача, якщо потрібно
  // Наприклад, використовуючи cookies або заголовки
  // За замовчуванням відправляємо англійську версію
  res.sendFile(path.join(__dirname, 'dist/admin-bot-webapp/browser/en-US/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// //dist/admin-bot-webapp/browser/en-US
// const staticFilesPath = path.join(__dirname, 'dist/admin-bot-webapp/browser/en-US');
// console.log(`Static files path: ${staticFilesPath}`);
// app.use('/en-US', express.static(staticFilesPath));
//
// app.get('*', (req, res) => {
//   console.log('Received request:', req.path);
//   res.sendFile(path.join(staticFilesPath, 'index.html'));
// });
//
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
