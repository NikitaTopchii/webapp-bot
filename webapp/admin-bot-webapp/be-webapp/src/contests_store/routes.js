const express = require('express'),
  router = express.Router(),
  StoresController = require('./controller');

const multer = require('multer');

const upload = multer();

router
  .route('/create-store')
  .post(upload.any(), StoresController.createStore);

router
  .route('/get-store')
  .get( StoresController.getStore);

router
  .route('/get-stores')
  .get(StoresController.getStores);

router
  .route('/create-product')
  .post(upload.any(), StoresController.createProduct);

router
  .route('/get-product')
  .get(StoresController.getProduct);

router
  .route('/get-products')
  .get(StoresController.getProducts);

router
  .route('/delete-product')
  .post(StoresController.deleteProduct);

router
  .route('/edit-product')
  .post(upload.any(), StoresController.editProduct);

module.exports = router;
