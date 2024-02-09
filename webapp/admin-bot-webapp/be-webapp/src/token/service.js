
const TokenDB = require('./database')

class TokensService {
  constructor() {
    this.tokenDB = new TokenDB();
  }

  async getTokensByOwner(owner_id){

    return new Promise((resolve, reject) => {

      this.tokenDB.getTokens(owner_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async addToken(data){

    return new Promise((resolve, reject) => {

      this.tokenDB.addToken(
        data.name,
        data.owner,
        data.chats,
        (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }
}

module.exports = new TokensService();
