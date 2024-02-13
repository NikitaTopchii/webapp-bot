const TokensService = require("./service");

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


exports.getTokens = async (req, res) => {
  try {
    const channels = await TokensService.getTokensByOwner(req.query.owner_id);
    res.json(channels);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};

exports.getToken = async (req, res) => {
  try {
    const channels = await TokensService.getToken(req.query.owner_id, req.query.token);
    res.json(channels);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};

exports.deleteToken = async (req, res) => {
  try {
    const channels = await TokensService.deleteToken(req.query.tokenId);
    res.json(channels);
  } catch (error) {
    res.status(500).send({ message: 'Error while deleting token' });
  }
}

exports.tokenExist = async (req, res) => {
  try {
    const channels = await TokensService.getToken(req.query.owner, req.query.name);

    logger.info(channels)

    if(channels.results.length >= 1){
      res.json({tokenExist: true})
    }else{
      res.json({tokenExist: false})
    }
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};

exports.addToken = async (req, res) => {
  try {
    const response = await TokensService.addToken(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting tokens' });
  }
};
