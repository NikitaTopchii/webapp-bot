const express = require('express'),
    router = express.Router(),
    CompetitionController = require('./controller');

const multer = require('multer');
const fs = require("fs");

const upload = multer(); // Configure multer as needed

const mediaPath = './be-webapp/media/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(mediaPath)){
      fs.mkdirSync(mediaPath, { recursive: true }); // Створення папки, якщо вона не існує
    }
    cb(null, mediaPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // або будь-яка інша логіка для імені файлу
  }
});

const uploadMedia = multer({ storage: storage });

router
    .route('/create')
    .post(upload.any(), CompetitionController.createContestDraft)

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
  .route('/create-contest')
  .post(upload.any(), CompetitionController.createContest)

router
  .route('/public-newsletter')
  .post(upload.any(), CompetitionController.publicPost)

router
  .route('/upload-media')
  .post(uploadMedia.any(), (req, res) => {
    // req.files міститиме інформацію про завантажені файли
    console.log(req.files);
    res.json('Файл успішно завантажено');
  })


module.exports = router;
