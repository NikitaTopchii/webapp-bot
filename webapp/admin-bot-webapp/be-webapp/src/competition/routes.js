const express = require('express'),
    router = express.Router(),
    CompetitionController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/create')
    .post(upload.any(), CompetitionController.createCompetition)

router
    .route('/publish')
    .post(upload.any(), CompetitionController.publishCompetition)

router
    .route('/competition')
    .get(CompetitionController.getCompetition)

router
  .route('/active-competitions')
  .get(CompetitionController.getActiveCompetitions)

router
    .route('/subscribe-verification')
    .get(CompetitionController.checkSubscription)

router
    .route('/delayed-competitions')
    .get(CompetitionController.getDelayedCompetitions)

router
    .route('/finished-competitions')
    .get(CompetitionController.getFinishedCompetitions)

router
    .route('/condition')
    .get(CompetitionController.getCompetitionCondition)

module.exports = router;
