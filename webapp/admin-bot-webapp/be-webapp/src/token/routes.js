const express = require('express'),
  router = express.Router(),
  TokensController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
  .route('/get-tokens')
  .get(TokensController.getTokens);

router
  .route('/token-exist')
  .get(TokensController.tokenExist)

router
  .route('/delete-token')
  .get(TokensController.deleteToken)

router
  .route('/add-token')
  .post(upload.any(), TokensController.addToken);

module.exports = router;
