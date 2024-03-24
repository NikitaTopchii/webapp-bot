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

    console.log(user.results)

    res.json(user.results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user' });
  }
};

exports.getUserTokens = async (req, res) => {
  try {
    const tokens = await UsersService.getUserTokens(req.query.userid);

    console.log(tokens.results)

    res.json(tokens.results.map((userToken) => {
      return { id: userToken.id, token_name: userToken.token_name }
    }));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user tokens' });
  }
};

exports.getUserTokenData = async (req, res) => {
  try {
    const tokens = await UsersService.getUserTokenData(req.query.userid);
    const tokenId = req.query.tokenId;

    res.json(tokens.results.filter((userToken) => userToken.id.split(':')[1] === tokenId).map((userToken) => {
      return { tokenId: userToken.id.split(':')[1], tokenName: userToken.token_name, userTokenValue: userToken.value }
    }));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting user tokens' });
  }
};

exports.checkBoughtUserItem = async (req, res) => {
    try {
      const item = await UsersService.checkBoughtUserItem(req.query.userTokenId);
      if (item.results[0].item_id) {
        res.json({ bought: true });
      } else {
        res.json({ bought: false });
      }
    } catch (error) {
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

exports.updateUserItems = async (req, res) => {
  try {
    await UsersService.updateUserItems(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}
