const ChannelsDB           = require('./database');

let colors = require('colors')
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgCyan,
      info: colors.green,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})

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

  async isChatTokenExistById(tokenId){
      return new Promise((resolve, reject) => {
        this.channels.isChatTokenExistById(tokenId, (err, data) => {
          if (err) {
            logger.error(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  }
}

module.exports = new ChannelsService();
