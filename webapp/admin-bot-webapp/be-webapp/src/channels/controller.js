const ChannelsService = require('./service');

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
