const express = require('express'),
    router = express.Router(),
    CompetitionController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './be-webapp/media/') // Здесь 'uploads/' - это папка, в которой будут сохраняться файлы
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Здесь file.originalname - это имя файла, с которым он был загружен
  }
})
const uploadMedia = multer({ storage: storage });

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

router
  .route('/create-competition')
  .post(upload.any(), CompetitionController.createContest)



module.exports = router;
