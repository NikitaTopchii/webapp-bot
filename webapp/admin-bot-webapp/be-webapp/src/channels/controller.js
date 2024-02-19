const ChannelsService = require('./service');

let colors = require('colors')
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
