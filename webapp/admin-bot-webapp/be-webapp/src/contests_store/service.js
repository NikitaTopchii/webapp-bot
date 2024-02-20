const StoreDB = require('./database');
class StoreService {

  constructor() {
    this.storeDB = new StoreDB();
  }

  async createStore(data){
    return new Promise((resolve, reject) => {
      this.storeDB.createStore(
        data.store_id,
        data.store_name,
        data.store_description,
        data.game_token_id,
        data.owner_id,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async getStores(owner_id){
    return new Promise((resolve, reject) => {
      this.storeDB.getStores(
        owner_id,
        (err, data) => {
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async getStore(store_id){
    return new Promise((resolve, reject) => {
      this.storeDB.getStore(
        store_id,
        (err, data) => {
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async createProduct(data){
    return new Promise((resolve, reject) => {
      this.storeDB.createProduct(
        data.product_id,
        data.product_name,
        data.product_description,
        data.product_amount,
        data.product_price,
        data.product_media,
        data.game_token_id,
        data.store_id,
        (err, data) => {
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async getProduct(product_id){
    return new Promise((resolve, reject) => {
      this.storeDB.getProduct(
        product_id,
        (err, data) => {
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async getProducts(store_id){
    return new Promise((resolve, reject) => {
      this.storeDB.getProducts(
        store_id,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async deleteProduct(product_id){
    return new Promise((resolve, reject) => {
      this.storeDB.deleteProduct(
        product_id,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  async editProduct(data){
    return new Promise((resolve, reject) => {
      this.storeDB.editProduct(
        data.product_id,
        data.product_name,
        data.product_description,
        data.product_amount,
        data.product_price,
        data.product_media,
        data.game_token_id,
        data.store_id,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }
}

module.exports = new StoreService();
