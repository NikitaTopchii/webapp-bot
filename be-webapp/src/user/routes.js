const express = require('express'),
    router = express.Router(),
    UserController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/auth')
    .get(UserController.getUser)
    // .put(UserController.updateUser)



module.exports = router;