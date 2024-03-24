const BotItemsDB           = require('./database');


class BotItemsService {
  constructor() {
    this.botItemsDB = new BotItemsDB();
  }

  async getItems() {

    return new Promise((resolve, reject) => {
      this.botItemsDB.getItems((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = new BotItemsService();
