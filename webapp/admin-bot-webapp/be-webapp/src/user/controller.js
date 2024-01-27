const UsersService = require('./service');
const CompetitionService = require("../competition/service");

exports.getUser = async (req, res) => {
  try {
    const user = await UsersService.getUser(req.query.participantId);
    if (user) {
      res.json({ exists: true, user });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getUsers = async (req, res) => {
    try {
        console.log(req.query.userid)
        const user = await UsersService.getUsers(req.query.userid);
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting user' });
    }
};

exports.authUsers = async (req, res) => {
    try {
        await UsersService.authUser(req.body);
        res.json('ok');
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error oops'})
    }
}

// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await UsersService.updateUser(req.body.user_id, req.body.userLogin, req.body.passHash);
//         res.cookie('login', userLogin);
//         res.cookie('hash', passHash);
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).send({ message: 'Error while updating user' });
//     }
// };
