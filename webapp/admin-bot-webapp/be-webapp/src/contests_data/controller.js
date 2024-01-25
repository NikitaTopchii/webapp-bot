const ParticipationService = require('./service');

exports.addParticipation = async (req, res) => {
    try {
        console.log('this is is');
        await ParticipationService.addParticipant(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}

exports.addParticipationWithAnswer = async (req, res) => {
  try {
    console.log('this is is');
    await ParticipationService.addParticipantWithAnswer(req.body);
    res.json('ok');
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Error oops'})
  }
}

exports.getParticipant = async (req, res) => {
    try {
        console.log('THIS IS CONSOLE LOG')
        console.log(req.query.userid);
        const user = await ParticipationService.getParticipant(req.query.userid, req.query.contests_id);
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}
