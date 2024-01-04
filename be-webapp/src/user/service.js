const UserDB           = require('./database');


class UsersService {
    constructor() {
        this.userDB = new UserDB();
    }

    async getUser(userId) {
        console.log('USER ID: ' + userId)

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
        console.log('auth user')
        return new Promise((resolve, reject) => {
            this.userDB.authUser(
                data.userid,
                data.username,
                data.language,
                data.isAdmin,
                data.subscription,
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
        console.log(userIds)

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
