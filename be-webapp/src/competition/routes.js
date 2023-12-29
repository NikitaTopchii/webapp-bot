const express = require('express'),
    router = express.Router(),
    CompetitionController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/create')
    .post(upload.any(), CompetitionController.createCompetition)

router
    .route('/competition')
    .get(CompetitionController.getCompetition)

router
    .route('/subscribe-verification')
    .get(CompetitionController.checkSubscription)

module.exports = router;