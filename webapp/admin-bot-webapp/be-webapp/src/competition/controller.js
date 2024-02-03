  const CompetitionService = require('./service');
  const {bot_webhook_url} = require("../../shared/application-context");

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

exports.getDelayedCompetitions = async (req, res) => {
  try {
    const competition = await CompetitionService.getDelayedCompetitions(req.query.chatid);
    res.json(competition);

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error while getting channels' });
  }
}

exports.getCompetitionCondition = async (req, res) => {
  try {
    const competition = await CompetitionService.getCompetitionCondition(req.query.contest_id);
    res.json(competition);

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error while getting channels' });
  }
}

exports.getFinishedCompetitions = async (req, res) => {
  try {
    const competition = await CompetitionService.getFinishedCompetitions(req.query.chatid);
    res.json(competition);

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error while getting channels' });
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

exports.getActiveCompetitions = async (req, res) => {
  try {
    console.log(req.query.chatid)
    const competition = await CompetitionService.getActiveCompetitions(req.query.chatid);
    res.json(competition);

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error while getting channels' });
  }
};

exports.createContestDraft = async (req, res) => {
    try {
      console.log(req.body);
      await CompetitionService.createContestDraft(req.body);
      res.json('ok');
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'Error oops'})
    }
}


exports.checkSubscription = async (req, res) => {
  try {
    console.log(req.query.participantId)
    console.log(req.query.chatId)
    const checkedResult = await CompetitionService.checkSubscription(req.query.participantId, req.query.chatId);
    res.json({ isSubscribed: checkedResult });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while checking subscription' });
  }
};

exports.uploadMedia = async (req, res) => {
  try {
    console.log(req.files);
    //await CompetitionService.uploadMedia(req.files);
    res.json('ok');
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Error uploading media'})
  }
}

exports.createContest = async (req, res) => {
  console.log(bot_webhook_url + '/create-contest')

  console.log('///////////')
  console.log(req.body)
  console.log('///////////')
  try{
    await fetch(bot_webhook_url + '/create-contest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      console.log('its okay')
      console.log(response)
      res.json(response);
    })
  } catch (error) {
    console.log(error)
  }
}


exports.publicPost = async (req, res) => {
    console.log(req.body)
    try{
      await fetch(bot_webhook_url + '/public-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }).then((response) => {
        console.log('its okay')
        console.log(response)
        res.json(response);
      })
    } catch (error) {
      console.log(error)
    }
}
