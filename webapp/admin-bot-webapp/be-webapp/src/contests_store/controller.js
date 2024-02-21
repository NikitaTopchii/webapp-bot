const StoresService = require("./service");

exports.createStore = async (req, res) => {
  try {
    await StoresService.createStore(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}

exports.getStores = async (req, res) => {
  try {
    const stores = await StoresService.getStores(req.query.owner_id);
    res.json(stores);
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}

exports.getStore = async (req, res) => {
  try {
    const store = await StoresService.getStore(req.query.store_id);
    res.json(store);
  } catch (error) {
    res.status(500).send({ message: 'Error oops'});
  }
}

exports.createProduct = async (req, res) => {
  try {
    await StoresService.createProduct(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({ message: 'Error oops'})
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await StoresService.getProducts(req.query.store_id);
    res.json(products);
  } catch (error) {
    res.status(500).send({message: 'Error oops'});
  }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await StoresService.getProduct(req.query.product_id);
    res.json(product);
  } catch (error) {
    res.status(500).send({message: 'Error oops'});
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await StoresService.deleteProduct(req.query.product_id);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'});
  }
}

exports.editProduct = async (req, res) => {
  try {
    await StoresService.editProduct(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'});
  }
}
