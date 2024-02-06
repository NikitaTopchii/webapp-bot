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
}

module.exports = new UsersService();
