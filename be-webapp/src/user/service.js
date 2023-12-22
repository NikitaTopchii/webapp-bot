const UserDB           = require('./database');
const { connect } = require('./routes');


class UsersService {
    constructor() {
        this.userDB = new UserDB();
    }

    async getUser(userId) {
        // console.log(userLogin , passwordHash)

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

    async updateUser(userId, userLogin, pass , userIdMemberStack) {
        console.log(userId)
        const result = await this.memberstack.members.update({
            id: userIdMemberStack,
            data: {
                email: userLogin,
                metaData: {
                    language: 'Swedish'
                },
                customFields: {
                    country: 'Swedish'
                },
            }
        });

        console.log(result)
        return new Promise((resolve, reject) => {
            this.userDB.updateUser(userId, userLogin, pass, (err, data) => {
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
