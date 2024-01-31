const UsersService = require('./service');
const CompetitionService = require("../competition/service");

exports.checkUser = async (req, res) => {
  try {
    console.log('participantID = ' + req.query.participantId)
    const user = await UsersService.getUser(req.query.participantId);
    console.log('user exist while check auth user')
    console.log(user)
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
