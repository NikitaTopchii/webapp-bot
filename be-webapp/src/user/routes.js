const express = require('express'),
    router = express.Router(),
    UserController = require('./controller');

router
    .route('/auth')
    .get(UserController.getUser)
    // .put(UserController.updateUser)

router
    .route('/simple-admins')
    .get(UserController.getUsers)


module.exports = router;