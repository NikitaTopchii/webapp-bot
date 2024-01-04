const express = require('express'),
    router = express.Router(),
    UserController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/check')
    .get(UserController.getUser)
    // .put(UserController.updateUser)

router
    .route('/simple-admins')
    .get(UserController.getUsers)

router
    .route('/auth')
    .post(upload.any(), UserController.authUsers)

module.exports = router;