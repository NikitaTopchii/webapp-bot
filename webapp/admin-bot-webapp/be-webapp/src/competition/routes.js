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
  .route('/update-contest-draft')
  .post(upload.any(), CompetitionController.updateContestDraft)

router
    .route('/publish')
    .post(upload.any(), CompetitionController.publishCompetition)

router
    .route('/competition')
    .get(CompetitionController.getCompetition)

router
  .route('/subscribe-verification')
  .get(CompetitionController.checkSubscription)

router
  .route('/active-competitions')
  .get(CompetitionController.getActiveCompetitions)

router
  .route('/active-competition-by-id')
  .get(CompetitionController.getActiveCompetitionById)

router
    .route('/delayed-competitions')
    .get(CompetitionController.getDelayedCompetitions)

router
  .route('/finished-competition-by-id')
  .get(CompetitionController.getFinishedCompetitionById)

router
  .route('/competition-draft-by-id')
  .get(CompetitionController.getCompetitionDraftById)

router
  .route('/delayed-competitions-for-edit')
  .get(CompetitionController.getDelayedCompetitionsForEdit)

router
  .route('/edit-delayed-competitions')
  .post(upload.any(), CompetitionController.editDelayedCompetition)

router
    .route('/finished-competitions')
    .get(CompetitionController.getFinishedCompetitions)

router
    .route('/condition')
    .get(CompetitionController.getCompetitionCondition)

router
  .route('/delete-contest')
  .get(CompetitionController.deleteContest)

router
  .route('/delete-contest-draft')
  .get(CompetitionController.deleteContestDraft)

router
  .route('/create-contest')
  .post(upload.any(), CompetitionController.createContest)

router
  .route('/public-newsletter')
  .post(upload.any(), CompetitionController.publicPost)

router
  .route('/competition-drafts')
  .get(CompetitionController.getCompetitionDrafts)

router
  .route('/edit-contest')
  .post(upload.any(), CompetitionController.editDelayedCompetition)

router
  .route('/close-contest')
  .post(upload.any(), CompetitionController.closeContest)
router
  .route('/upload-media')
  .post(uploadMedia.any(), (req, res) => {
    res.json('Файл успішно завантажено');
  })


module.exports = router;
