const ParticipationService = require('./service');

exports.addParticipation = async (req, res) => {
    try {
        await ParticipationService.addParticipant(req.body);
        res.json('ok');
    } catch (error) {
        res.status(500).send({message: 'Error oops'})
    }
}

exports.addParticipationWithAnswer = async (req, res) => {
  try {
    await ParticipationService.addParticipantWithAnswer(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}

exports.getParticipant = async (req, res) => {
    try {
        const user = await ParticipationService.getParticipant(req.query.userid, req.query.contests_id);
        res.json(user);
    } catch (error) {
        res.status(500).send({message: 'Error oops'})
    }
}

exports.checkParticipation = async (req, res) => {
  try {
    const user = await ParticipationService.getParticipant(req.query.userid, req.query.contests_id);
    if(user.results.length === 1){
      res.json({isParticipant: true})
    }else{
      res.json({isParticipant: false})
    }
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}

