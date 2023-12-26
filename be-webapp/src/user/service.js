const UserDB           = require('./database');
const { connect } = require('./routes');


class UsersService {
    constructor() {
        this.userDB = new UserDB();
    }

    async getUser(userId) {
        console.log(userId)

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
}

module.exports = new UsersService();
