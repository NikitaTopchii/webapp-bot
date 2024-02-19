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
}

module.exports = new StoreService();
