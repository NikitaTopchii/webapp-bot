const ParticipationDB = require('./database');
const {Telegraf, Markup} = require("telegraf");


const TELEGRAM_API_URL = 'https://api.telegram.org';
const BOT_TOKEN = '6740264492:AAFwwteh_3c9QXg3deVymVvM8DhQGZW8CK0';
class ParticipationService {
    constructor() {
        this.participationDB = new ParticipationDB();
    }

    async addParticipant(data){

        return new Promise((resolve, reject) => {
            this.participationDB.addParticipant(
                data.userid,
                data.contests_id,
                data.username,
                (err, data) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            )
        })
    }

  async addParticipantWithAnswer(data){

    return new Promise((resolve, reject) => {
      this.participationDB.addParticipantWithAnswer(
        data.user_id,
        data.contest_id,
        data.username,
        data.answer,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

    async getParticipant(userid, contests_id){
        return new Promise((resolve, reject) => {
            this.participationDB.getParticipant(userid, contests_id, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = new ParticipationService();
