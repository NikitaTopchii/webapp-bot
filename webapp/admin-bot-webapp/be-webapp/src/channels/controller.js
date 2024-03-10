const ChannelsService = require('./service');

let colors = require('colors')
const {bot_webhook_url} = require("../../shared/application-context");
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgCyan,
      info: colors.green,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})

exports.getChannels = async (req, res) => {
    try {
        const channels = await ChannelsService.getChannelsWithChatIds(req.query.chat_ids, req.query.botid);
        res.json(channels);
    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
};

exports.setGameToken = async (req, res) => {
  try {
    await ChannelsService.setGameToken(req.query.token, req.query.chatid);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};

exports.setChatSecurityStatus = async (req, res) => {
  try {
    await ChannelsService.setChatSecurityStatus(req.body.chatSecurityStatus, req.body.chatId);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};


exports.setChatGamificationStatus = async (req, res) => {
  try {
    await ChannelsService.setChatGamificationStatus(req.body.chatGamificationStatus, req.body.chatId);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};


exports.setChatStopWordsStatus = async (req, res) => {
  try {
    await ChannelsService.setChatStopWordsStatus(req.body.chatStopWordsStatus, req.body.chatId);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};


exports.setChatCommandStatus = async (req, res) => {
  try {
    console.log(req.body.chatCommandStatus);
    console.log(req.body.chatId);
    await ChannelsService.setChatCommandStatus(req.body.chatCommandStatus, req.body.chatId);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};


exports.setChatCaptchaStatus = async (req, res) => {
  try {
    await ChannelsService.setChatCaptchaStatus(req.body.chatCaptchaStatus, req.body.chatId);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while set game token' });
  }
};

exports.getStopWordsByChatId = async (req, res) => {
  try {
    const words = await ChannelsService.getStopWordsByChatId(req.query.chatId);
    res.json(words);
  } catch (error) {
    res.status(500).send({ message: 'Error while get stop words by chat id'})
  }
}


exports.isChatTokenExistById = async (req, res) => {
  try{
    logger.info(req.query.tokenId)
    const chatsWithToken = await ChannelsService.isChatTokenExistById(req.query.tokenId);

    logger.info(chatsWithToken);

    if(chatsWithToken.results.length > 0){
      res.json({ chatTokenExist: true });
    }else{
      res.json({ chatTokenExist: false });
    }
  } catch (error){
    logger.error(error);
    res.status(500).send({ message: 'Error while getting chats with tokens'})
  }
}

exports.deleteSelectedStopWords = async (req, res) => {
  logger.info('post: ' + JSON.stringify(req.body));
  logger.trace('post request on url: ' + bot_webhook_url + '/settings')
  try{
    await fetch(bot_webhook_url + '/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      logger.error(response)
      res.json(response);
    })
  } catch (error) {
    logger.error(error)
  }
}


exports.deleteAllStopWords = async (req, res) => {
  logger.info('post: ' + JSON.stringify(req.body));
  logger.trace('post request on url: ' + bot_webhook_url + '/settings')
  try{
    await fetch(bot_webhook_url + '/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      logger.error(response)
      res.json(response);
    })
  } catch (error) {
    logger.error(error)
  }
}

exports.addStopWords = async (req, res) => {
  logger.info('post: ' + JSON.stringify(req.body));
  logger.trace('post request on url: ' + bot_webhook_url + '/settings')
  try{
    await fetch(bot_webhook_url + '/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      logger.error(response)
      res.json(response);
    })
  } catch (error) {
    logger.error(error)
  }
}


exports.setSettings = async (req, res) => {
  logger.info('post: ' + JSON.stringify(req.body));
  logger.trace('post request on url: ' + bot_webhook_url + '/settings')
  try{
    await fetch(bot_webhook_url + '/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      logger.error(response)
      res.json(response);
    })
  } catch (error) {
    logger.error(error)
  }
}
