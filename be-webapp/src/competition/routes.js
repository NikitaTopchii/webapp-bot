const express = require('express'),
    router = express.Router(),
    CompetitionController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/create')
    .post(upload.any(), CompetitionController.createCompetition)
// .put(UserController.updateUser)



module.exports = router;