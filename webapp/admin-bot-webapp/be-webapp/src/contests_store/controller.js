const StoresService = require("./service");

exports.createStore = async (req, res) => {
  try {
    await StoresService.createStore(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}
