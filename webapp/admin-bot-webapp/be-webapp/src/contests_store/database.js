const mysql = require('mysql');
const Logger = require('../../shared/logger/logger')

let colors = require('colors')
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgCyan,
      info: colors.bgGreen,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})
class StoreDB {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
      user: 'admin',
      password: 'DyadkoVitya228',
      database: 'contests_store'
    });

    this.connection.connect((err) => {
      if (err) {
        Logger.logger.error(`Error connecting to MySQL: ${err}`);
      } else {
        Logger.logger.trace('Connected to MySQL contests_store');
      }
    });
  }

  getStores(owner_id, callback) {
    Logger.logger.info('get stores with owner_id: ' + owner_id);
    const sql = 'SELECT store_id, store_name FROM stores WHERE owner_id = ?';
    Logger.logger.info(sql);

    this.connection.query(sql, owner_id, (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results})
        callback(null, {results});
      }
    });
  }

  getStore(store_id, callback){

    Logger.logger.info('get stores with owner_id: ' + store_id);
    const sql = 'SELECT store_id, store_name, store_description, game_token_id, store_name FROM stores WHERE store_id = ?';
    Logger.logger.info(sql);

    this.connection.query(sql, store_id, (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results})
        callback(null, {results});
      }
    });
  }

  createStore(store_id,
              store_name,
              store_description,
              game_token_id,
              owner_id,
              callback){

    Logger.logger.info('create store with this store_id: ' + JSON.stringify(store_id));
    Logger.logger.info('create store with this store_name: ' + JSON.stringify(store_name));
    Logger.logger.info('create store with this store_description: ' + JSON.stringify(store_description));
    Logger.logger.info('create store with this game_token_id: ' + JSON.stringify(game_token_id));
    Logger.logger.info('create store with this owner_id: ' + JSON.stringify(owner_id));

    const sql = 'INSERT INTO stores SET ?';

    const newStore = {
      store_id,
      store_name,
      store_description,
      game_token_id,
      owner_id
    }

    this.connection.query(sql, [newStore], (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results});
        callback(null, {results});
      }
    })
  }

  getProduct(product_id, callback){

    Logger.logger.info('get product with product_id: ' + product_id);
    const sql = 'SELECT * FROM products WHERE product_id = ?';
    Logger.logger.info(sql);

    this.connection.query(sql, product_id, (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results})
        callback(null, {results});
      }
    });
  }

  getProducts(store_id, callback) {
    Logger.logger.info('get products with store_id: ' + store_id);
    const sql = 'SELECT * FROM products WHERE store_id = ?';
    Logger.logger.info(sql);

    this.connection.query(sql, store_id, (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results})
        callback(null, {results});
      }
    });
  }

  createProduct(product_id,
                product_name,
                product_description,
                product_amount,
                product_price,
                product_media,
                game_token_id,
                store_id,
                callback){

    Logger.logger.info('create product with this product_id: ' + product_id);
    Logger.logger.info('create product with this product_name: ' + product_name);
    Logger.logger.info('create product with this product_description: ' + product_description);
    Logger.logger.info('create product with this product_amount: ' + product_amount);
    Logger.logger.info('create product with this product_price: ' + product_price);
    Logger.logger.info('create product with this product_media: ' + product_media);
    Logger.logger.info('create product with this game_token_id: ' + game_token_id);
    Logger.logger.info('create product with this store_id: ' + store_id);

    const sql = 'INSERT INTO products SET ?';

    const newProduct = {
      product_id,
      product_name,
      product_description,
      product_amount,
      product_price,
      product_media,
      game_token_id,
      store_id
    }

    this.connection.query(sql, [newProduct], (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results});
        callback(null, {results});
      }
    })
  }

  deleteProduct(product_id, callback){
    Logger.logger.info('delete product with product_id: ' + product_id);
    const sql = 'DELETE FROM products WHERE product_id = ?';
    Logger.logger.info(sql);

    this.connection.query(sql, product_id, (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results})
        callback(null, {results});
      }
    });
  }

  editProduct(product_id,
              product_name,
              product_description,
              product_amount,
              product_price,
              product_media,
              game_token_id,
              store_id,
              callback){

    Logger.logger.info('update product with this product_id: ' + product_id);
    Logger.logger.info('update product with this product_name: ' + product_name);
    Logger.logger.info('update product with this product_description: ' + product_description);
    Logger.logger.info('update product with this product_amount: ' + product_amount);
    Logger.logger.info('update product with this product_price: ' + product_price);
    Logger.logger.info('update product with this product_media: ' + product_media);
    Logger.logger.info('update product with this game_token_id: ' + game_token_id);
    Logger.logger.info('update product with this store_id: ' + store_id);

    const sql = 'UPDATE products SET ? WHERE product_id = ?';

    const updatedProduct = {
      product_id,
      product_name,
      product_description,
      product_amount,
      product_price,
      product_media,
      game_token_id,
      store_id
    }

    this.connection.query(sql, [updatedProduct, product_id], (err, results) => {
      if (err) {
        Logger.logger.error(err);
        callback(err, null);
      } else {
        Logger.logger.info({results});
        callback(null, {results});
      }
    })
  }
}

module.exports = StoreDB;
