const UsersService = require('./service');
const CompetitionService = require("../competition/service");

exports.checkUser = async (req, res) => {
  try {
    const user = await UsersService.getUser(req.query.participantId);
    if (user.results.length === 1) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UsersService.getUser(req.query.userid);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getUsers = async (req, res) => {
    try {
        const user = await UsersService.getUsers(req.query.userid);
        res.json(user);

    } catch (error) {
        res.status(500).send({ message: 'Error while getting user' });
    }
};

exports.authUsers = async (req, res) => {
    try {
        await UsersService.authUser(req.body);
        res.json('ok');
    } catch (error) {
        res.status(500).send({message: 'Error oops'})
    }
}
