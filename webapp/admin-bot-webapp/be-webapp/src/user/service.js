const UserDB           = require('./database');


class UsersService {
    constructor() {
        this.userDB = new UserDB();
    }

    async getUser(userId) {

        return new Promise((resolve, reject) => {
            this.userDB.getUser(userId, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                  resolve(data);
                }
            });

        });
    }

    authUser(data){
        return new Promise((resolve, reject) => {
            this.userDB.authUser(
                data.userid,
                data.username,
                data.language,
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

    async getUsers(userIds) {

        return new Promise((resolve, reject) => {

            const adminsList = userIds.split(',');

            this.userDB.getUsers(adminsList, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

  async getUserTokens(userId) {

    return new Promise((resolve, reject) => {
      this.userDB.getUserTokens(userId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getUserTokenData(userId) {

    return new Promise((resolve, reject) => {
      this.userDB.getUserTokenData(userId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async checkBoughtUserItem(userId) {

    return new Promise((resolve, reject) => {
      this.userDB.checkBoughtUserItem(userId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async updateUserItems(data) {

    return new Promise((resolve, reject) => {
      this.userDB.updateUserItems(
        data.userTokenId,
        data.itemId,
        data.itemType,
        parseFloat(data.tokensLeft),
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

module.exports = new UsersService();
