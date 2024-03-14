
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

  async getToken(owner_id, tokenName){

    return new Promise((resolve, reject) => {

      this.tokenDB.getToken(owner_id, tokenName, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  deleteToken(tokenId){
    return new Promise((resolve, reject) => {

      this.tokenDB.deleteToken(tokenId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async addToken(data){

    const shortName = data.shortName.toUpperCase();

    return new Promise((resolve, reject) => {

      this.tokenDB.addToken(
        data.name,
        shortName,
        data.owner,
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
