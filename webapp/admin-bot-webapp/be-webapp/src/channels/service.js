const ChannelsDB           = require('./database');


class ChannelsService {
    constructor() {
        this.userDB = new ChannelsDB();
    }

    async getChannelsWithChatIds(chatids, botid){

        return new Promise((resolve, reject) => {

            const creatorsIdList = chatids.split(',');

            this.userDB.getChannels(creatorsIdList, botid, (err, data) => {
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
