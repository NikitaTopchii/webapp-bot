const ChannelsDB           = require('./database');


class ChannelsService {
    constructor() {
        this.channels = new ChannelsDB();
    }

    async getChannelsWithChatIds(chatids, botid){

        return new Promise((resolve, reject) => {

            const creatorsIdList = chatids.split(',');

            this.channels.getChannels(creatorsIdList, botid, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

  async setGameToken(token, chatid){

    return new Promise((resolve, reject) => {

      this.channels.setGameToken(token, chatid, (err, data) => {
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
