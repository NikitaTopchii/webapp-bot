const express = require('express'),
    router = express.Router(),
    CompetitionBotsController = require('./controller');


router
    .route('/bot')
    .get(CompetitionBotsController.getBotToken)


module.exports = router;