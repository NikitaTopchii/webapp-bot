const CompetitionBotsService = require('./service');

exports.getBotToken = async (req, res) => {
    try {
        const competition = await CompetitionBotsService.getBotToken(req.query.botId);
        res.json(competition);
    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
};
