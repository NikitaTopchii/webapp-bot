const express = require('express'),
    router = express.Router(),
    UserCompetitionsController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
  .route('/user-competition-ids')
  .get(UserCompetitionsController.getUserCompetitionIds)

router
  .route('/user-active-competitions-pre-info')
  .get(UserCompetitionsController.getActiveUserCompetitionsPreInfo)

router
  .route('/user-active-competitions-info')
  .get(UserCompetitionsController.getActiveUserCompetitionsInfo)

router
  .route('/user-finished-competitions-pre-info')
  .get(UserCompetitionsController.getFinishedUserCompetitionsPreInfo)

router
  .route('/user-finished-competitions-info')
  .get(UserCompetitionsController.getFinishedUserCompetitionsInfo)

router
  .route('/user-competition-draft')
  .get(UserCompetitionsController.getUserCompetitionDraft)

module.exports = router;
