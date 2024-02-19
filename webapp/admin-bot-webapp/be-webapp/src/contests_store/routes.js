const express = require('express'),
  router = express.Router(),
  StoresController = require('./controller');

const multer = require('multer');

const upload = multer();

router
  .route('/create-store')
  .post(upload.any(), StoresController.createStore);

module.exports = router;
