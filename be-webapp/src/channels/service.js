const ChannelsDB           = require('./database');
const { connect } = require('./routes');


class ChannelsService {
    constructor() {
        this.userDB = new ChannelsDB();
    }

    async getChannels(creators_id) {
        console.log(creators_id)

        return new Promise((resolve, reject) => {
            this.userDB.getChannels(creators_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }
}

module.exports = new ChannelsService();
