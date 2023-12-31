const ParticipationService = require('./service');

exports.addParticipation = async (req, res) => {
    try {
        console.log(req.body.channels);
        await ParticipationService.addParticipant(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}

exports.getParticipant = async (req, res) => {
    try {
        console.log(req.query.userid);
        await ParticipationService.getParticipant(req.query.userid);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}