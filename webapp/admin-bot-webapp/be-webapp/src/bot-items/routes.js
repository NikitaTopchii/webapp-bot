const express = require('express'),
  router = express.Router(),
  BotItemsController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
  .route('/items')
  .get(BotItemsController.getBotItems)

module.exports = router;
