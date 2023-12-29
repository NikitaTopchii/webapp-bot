const ChannelsDB           = require('./database');
const { connect } = require('./routes');


class ChannelsService {
    constructor() {
        this.userDB = new ChannelsDB();
    }

    async getChannels(creators_id) {
        console.log(creators_id)

        return new Promise((resolve, reject) => {

            const creatorsIdList = creators_id.split(',');

            this.userDB.getChannels(creatorsIdList, (err, data) => {
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
