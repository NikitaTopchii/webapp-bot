const CompetitionService = require('./service');

exports.createCompetition = async (req, res) => {
    try {
        console.log(req.body.channels);
        await CompetitionService.createCompetition(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}