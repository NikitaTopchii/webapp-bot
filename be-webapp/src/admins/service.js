const AdminsDB           = require('./database');
const { connect } = require('./routes');


class AdminsService {
    constructor() {
        this.admins = new AdminsDB();
    }

    async getAdmins(creators_id) {
        console.log(creators_id)

        return new Promise((resolve, reject) => {

            const creatorsIdList = creators_id.split(',');

            this.admins.getAdmins(creatorsIdList, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    async getAdminsWithSubscription(user_id) {
        console.log(user_id)

        return new Promise((resolve, reject) => {

            this.admins.getAdminsWithSubscription(user_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    async getAdmin(user_id) {
        console.log(user_id)

        return new Promise((resolve, reject) => {
            this.admins.getAdmin(user_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }
}

module.exports = new AdminsService();
