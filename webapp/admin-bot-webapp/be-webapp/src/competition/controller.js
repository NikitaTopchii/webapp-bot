const CompetitionService = require('./service');

exports.createCompetition = async (req, res) => {
    try {
        console.log(req.body);
        await CompetitionService.createCompetition(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}

exports.publishCompetition = async (req, res) => {
    try {
        console.log(req.body.channels);
        await CompetitionService.publishCompetition(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}

exports.getCompetition = async (req, res) => {
    try {
        console.log(req.query.contest_id)
        const competition = await CompetitionService.getCompetition(req.query.contest_id);
        res.json(competition);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
};

exports.checkSubscription = async (req, res) => {
    try {
        const checkedResult = await CompetitionService.checkSubscription(req.query.user_id, req.query.channel_id);
        res.json(checkedResult);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while check subs' });
    }
};
