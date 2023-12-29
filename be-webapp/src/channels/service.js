const ChannelsDB           = require('./database');


class ChannelsService {
    constructor() {
        this.userDB = new ChannelsDB();
    }

    async getChannelsWithChatIds(chatids){
        console.log(chatids)

        return new Promise((resolve, reject) => {

            const creatorsIdList = chatids.split(',');

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
