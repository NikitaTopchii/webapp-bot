const ChannelsService = require('./service');

exports.getChannels = async (req, res) => {
    try {
        console.log(req.query.creators_id)
        const channels = await ChannelsService.getChannels(req.query.creators_id);
        res.json(channels);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
};