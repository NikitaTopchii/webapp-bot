const TokensService = require("./service");

exports.getTokens = async (req, res) => {
  try {
    const channels = await TokensService.getTokensByOwner(req.query.owner_id);
    res.json(channels);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};

exports.addToken = async (req, res) => {
  try {
    await TokensService.addToken(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};
