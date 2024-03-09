const express = require('express'),
    router = express.Router(),
    ChannelsController = require('./controller');

const multer = require('multer');

const upload = multer(); // Configure multer as needed

router
    .route('/my')
    .get(ChannelsController.getChannels)

router
  .route('/set-token')
  .get(ChannelsController.setGameToken)

router
  .route('/is-token-exist')
  .get(ChannelsController.isChatTokenExistById)

router
  .route('/chat-security-status')
  .post(upload.any(), ChannelsController.setChatSecurityStatus)

router
  .route('/chat-gamification-status')
  .post(upload.any(), ChannelsController.setChatGamificationStatus)

router
  .route('/chat-stop-words-status')
  .post(upload.any(), ChannelsController.setChatStopWordsStatus)

router
  .route('/chat-command-status')
  .post(upload.any(), ChannelsController.setChatCommandStatus)

router
  .route('/chat-captcha-status')
  .post(upload.any(), ChannelsController.setChatCaptchaStatus)

router
  .route('/stop-words')
  .get(ChannelsController.getStopWordsByChatId)

module.exports = router;
