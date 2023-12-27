const express = require('express'),
    router = express.Router(),
    ChannelsController = require('./controller');

router
    .route('/my')
    .get(ChannelsController.getChannels)



module.exports = router;