const express = require('express'),
    router = express.Router(),
    ParticipationController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/add')
    .post(upload.any(), ParticipationController.addParticipation);

router
    .route('/check')
    .get(ParticipationController.getParticipant)


module.exports = router;