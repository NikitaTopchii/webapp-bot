const express = require('express'),
    router = express.Router(),
    UserController = require('./controller');

router
    .route('/auth')
    .get(UserController.getUser)
    // .put(UserController.updateUser)



module.exports = router;