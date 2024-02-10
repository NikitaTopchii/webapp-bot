const express = require('express'),
    router = express.Router(),
    ChannelsController = require('./controller');

router
    .route('/my')
    .get(ChannelsController.getChannels)

router
  .route('/set-token')
  .get(ChannelsController.setGameToken)


module.exports = router;
