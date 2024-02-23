  const CompetitionService = require('./service');
  const {bot_webhook_url} = require("../../shared/application-context");
  let colors = require('colors')
  let logger = require('tracer').colorConsole({
    filters: [
      colors.underline,
      colors.white,
      {
        trace: colors.bgCyan,
        info: colors.green,
        warn: colors.yellow,
        error: [colors.red, colors.bold]
      }
    ]
  })

exports.createContestDraft = async (req, res) => {
    try {
        await CompetitionService.createContestDraft(req.body);
        res.json('ok');
    } catch (error) {
        res.status(500).send({message: 'Error oops'})
    }
}

exports.updateContestDraft = async (req, res) => {
    try {
      await CompetitionService.updateContestDraft(req.body);
      res.json('ok');
    } catch (error) {
      res.status(500).send({message: 'Error oops'})
    }
}


exports.getDelayedCompetitions = async (req, res) => {
  logger.info('chat id for getting delayed competitions: ' + req.query.chatid)
  try {
    const competition = await CompetitionService.getDelayedCompetitions(req.query.chatid);
    logger.info(competition)
    res.json(competition);
  } catch (error) {
    logger.error(error)
    res.status(500).send({ message: 'Error while getting delayed competitions' });
  }
}

exports.getDelayedCompetitionsForEdit = async (req, res) => {
    logger.info('contest id for getting delayed competitions for edit: ' + req.query.contestid)
    try {
      const competition = await CompetitionService.getDelayedCompetitionForEdit(req.query.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error)
      res.status(500).send({ message: 'Error while getting delayed competitions' });
    }
  }

  exports.getCompetitionDrafts = async (req, res) => {
    logger.info('contest id for getting delayed competitions for edit: ' + req.query.ownerid)
    try {
      const competition = await CompetitionService.getCompetitionDrafts(req.query.ownerid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error)
      res.status(500).send({ message: 'Error while getting delayed competitions' });
    }
  }

exports.editDelayedCompetition = async (req, res) => {
  try {
    await CompetitionService.editDelayedCompetition(req.body);
    res.json('ok');
  } catch (error) {
    logger.error(error)
    res.status(500).send({ message: 'Error while edit delayed competition' });
  }
}

exports.getCompetitionCondition = async (req, res) => {
  logger.info('contest id for getting competition condition: ' + req.query.contest_id)
  try {
    const competition = await CompetitionService.getCompetitionCondition(req.query.contest_id);
    logger.info(competition)
    res.json(competition);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: 'Error while getting competition condition' });
  }
}

exports.getFinishedCompetitions = async (req, res) => {
  logger.info('chat id for getting finished competition: ' + req.query.chatid)
  try {
    const competition = await CompetitionService.getFinishedCompetitions(req.query.chatid);
    logger.info(competition)
    res.json(competition);
  } catch (error) {
    logger.error(error)
    res.status(500).send({ message: 'Error while getting finished competition' });
  }
}

exports.publishCompetition = async (req, res) => {
    logger.info(req.body)
    try {
        await CompetitionService.publishCompetition(req.body);
        res.json('ok');
    } catch (error) {
      logger.error(error)
        res.status(500).send({message: 'Error oops'})
    }
}

exports.getCompetition = async (req, res) => {
    logger.info('contest id for getting competition: ' + req.query.contest_id)
    try {
        const competition = await CompetitionService.getCompetition(req.query.contest_id);
        logger.info(competition)
        res.json(competition);
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Error while getting competition by id' });
    }
};

exports.getActiveCompetitions = async (req, res) => {
  logger.info('chat id for getting active competition: ' + req.query.chatid)
  try {
    const competition = await CompetitionService.getActiveCompetitions(req.query.chatid);
    logger.info(competition)
    res.json(competition);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: 'Error while getting active competitions' });
  }
};

  exports.getActiveCompetitionById = async (req, res) => {
    logger.info('contest_id for getting active competition: ' + req.query.contestid)
    try {
      const competition = await CompetitionService.getActiveCompetitionById(req.query.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ message: 'Error while getting active competition' });
    }
  };

  exports.getFinishedCompetitionById = async (req, res) => {
    logger.info('contest_id for getting active competition: ' + req.query.contestid)
    try {
      const competition = await CompetitionService.getFinishedCompetitionById(req.query.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ message: 'Error while getting active competition' });
    }
  };

  exports.getCompetitionDraftById = async (req, res) => {
    logger.info('contest_id for getting active competition: ' + req.query.contestid)
    try {
      const competition = await CompetitionService.getCompetitionDraftById(req.query.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ message: 'Error while getting active competition' });
    }
  };

  exports.deleteContest = async (req, res) => {
    logger.info('contest_id for deleting competition: ' + req.body.contestid)
    try {
      const competition = await CompetitionService.deleteContest(req.body.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ message: 'Error while getting active competition' });
    }
  };

  exports.deleteContestDraft = async (req, res) => {
    logger.info('contest_id for deleting competition draft: ' + req.body.contestid)
    try {
      const competition = await CompetitionService.deleteContestDraft(req.body.contestid);
      logger.info(competition)
      res.json(competition);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ message: 'Error while getting active competition' });
    }
  };

exports.createContestDraft = async (req, res) => {
    logger.info(req.body)
    try {
      await CompetitionService.createContestDraft(req.body);
      logger.info('contest draft was creating by id: ' + req.body.contestId)
      res.json('ok');
    } catch (error) {
      logger.error(error);
      res.status(500).send({message: 'Error oops'})
    }
}


exports.checkSubscription = async (req, res) => {
  logger.info('participant id: ' + req.query.participantId);
  logger.info('chat id: ' + req.query.chatId);
  try {
    const checkedResult = await CompetitionService.checkSubscription(req.query.participantId, req.query.chatId);
    logger.info('check subscription on channel: ' + checkedResult)
    res.json({ isSubscribed: checkedResult });
  } catch (error) {
    logger.error(error)
    res.status(500).send({ message: 'Error while checking subscription' });
  }
};

exports.uploadMedia = async (req, res) => {
  try {
    //await CompetitionService.uploadMedia(req.files);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error uploading media'})
  }
}

exports.createContest = async (req, res) => {
  logger.info(req.body);
  logger.trace('post request on url: ' + bot_webhook_url + '/create-contest')
  try{
    await fetch(bot_webhook_url + '/create-contest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    }).then((response) => {
      logger.error(response)
      res.json(response);
    })
  } catch (error) {
    logger.error(error)
  }
}


exports.publicPost = async (req, res) => {
  logger.info('post: ' + JSON.stringify(req.body));
  logger.trace('post request on url: ' + bot_webhook_url + '/public-post')
    try{
      await fetch(bot_webhook_url + '/public-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }).then((response) => {
        logger.error(response)
        res.json(response);
      })
    } catch (error) {
      logger.error(error)
    }
}

  exports.closeContest = async (req, res) => {
    try{
      await fetch(bot_webhook_url + '/close-contest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }).then((response) => {
        logger.error(response)
        res.json(response);
      })
    } catch (error) {
      logger.error(error)
    }
  }
