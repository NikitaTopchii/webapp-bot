const UsersCompetitionService = require('./service');

exports.getUserCompetitionIds = async (req, res) => {
  try {
    const competitionIds = await UsersCompetitionService.getUserCompetitionIds(req.query.userid);

    console.log(competitionIds.results)

    res.json(competitionIds.results.map((user_data) => user_data.contest_id));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getUserCompetitionDraft = async (req, res) => {
  try {
    const competitionDraft = await UsersCompetitionService.getUserCompetitionDraft(req.query.contestId);

    console.log(competitionDraft.results[0])

    res.json(competitionDraft.results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};


exports.getActiveUserCompetitionsPreInfo = async (req, res) => {
  try {
    const preInfo = await UsersCompetitionService.getActiveUserCompetitionsInfo(req.query.contestIds);

    res.json(preInfo.results.map((contest) => {
      return { contestId: contest.contest_id, contestName: contest.name }
    }));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getActiveUserCompetitionsInfo = async (req, res) => {
  try {
    const info = await UsersCompetitionService.getActiveUserCompetitionsInfo(req.query.contestIds);

    res.json(info.results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getFinishedUserCompetitionsPreInfo = async (req, res) => {
  try {
    const preInfo = await UsersCompetitionService.getFinishedUserCompetitionsInfo(req.query.contestIds);

    res.json(preInfo.results.map((contest) => {
      return { contestId: contest.contest_id, contestName: contest.name }
    }));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getFinishedUserCompetitionsInfo = async (req, res) => {
  try {
    const info = await UsersCompetitionService.getFinishedUserCompetitionsInfo(req.query.contestIds);

    res.json(info.results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};
