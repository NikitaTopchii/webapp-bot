const ParticipationService = require('./service');
const {bot_webhook_url} = require("../../shared/application-context");

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

exports.addParticipationWithPhoneNumber = async (req, res) => {
  try{
    await fetch(bot_webhook_url + '/confirm-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      res.json(response);
    })
  } catch (error) {
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

