const express = require('express'),
    router = express.Router(),
    AdminsController = require('./controller');

router
    .route('/all')
    .get(AdminsController.getAdmins)

router
    .route('/one')
    .get(AdminsController.getAdmin)

module.exports = router;