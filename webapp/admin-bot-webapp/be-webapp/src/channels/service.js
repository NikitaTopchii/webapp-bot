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

  async setChatSecurityStatus(chatSecurityStatus, chatId){

    return new Promise((resolve, reject) => {

      this.channels.setChatSecurityStatus(chatSecurityStatus, chatId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async setChatGamificationStatus(chatGamificationStatus, chatId){

    return new Promise((resolve, reject) => {

      this.channels.setChatGamificationStatus(chatGamificationStatus, chatId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async setChatStopWordsStatus(chatStopWordsStatus, chatId){

    return new Promise((resolve, reject) => {

      this.channels.setChatStopWordsStatus(chatStopWordsStatus, chatId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async setChatCommandStatus(chatCommandStatus, chatId){

    return new Promise((resolve, reject) => {

      this.channels.setChatCommandsStatus(chatCommandStatus, chatId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async setChatCaptchaStatus(chatCaptchaStatus, chatId){

    return new Promise((resolve, reject) => {

      this.channels.setChatCaptchaStatus(chatCaptchaStatus, chatId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async isChatTokenExistById(tokenId, botId){
      return new Promise((resolve, reject) => {
        this.channels.isChatTokenExistById(tokenId, botId, (err, data) => {
          if (err) {
            logger.error(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  }

  async getStopWordsByChatId(chatId){
      return new Promise((resolve, reject) => {
        this.channels.getStopWordsByChatId(chatId, (err, data) => {
          if(err){
            logger.error(err);
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
  }
}

module.exports = new ChannelsService();
