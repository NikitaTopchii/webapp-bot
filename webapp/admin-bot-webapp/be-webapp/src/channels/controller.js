const ChannelsService = require('./service');

exports.getChannels = async (req, res) => {
    try {
        console.log('Chatids: ' + req.query.creators_id)
        const channels = await ChannelsService.getChannelsWithChatIds(req.query.creators_id);
        res.json(channels);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
};