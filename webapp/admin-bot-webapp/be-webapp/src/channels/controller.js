const ChannelsService = require('./service');

exports.getChannels = async (req, res) => {
    try {
        const channels = await ChannelsService.getChannelsWithChatIds(req.query.chat_ids, req.query.botid);
        res.json(channels);
    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
};
