const BotItemsService = require('./service');

exports.getBotItems = async (req, res) => {
  try {
    const botItems = await BotItemsService.getItems();

    console.log(botItems.results)

    res.json(botItems.results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while getting bot items' });
  }
};
