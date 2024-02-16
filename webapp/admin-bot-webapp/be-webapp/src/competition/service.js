const CompetitionDB = require('./database');
const {Telegraf, Markup} = require("telegraf");

const folderName = '../media/';
const fs = require('node:fs');
const path = require('path');

const TELEGRAM_API_URL = 'https://api.telegram.org';
class CompetitionService {

  channelsLinks;
  botToken;
  messageIds;
  constructor() {
    this.competitionDB = new CompetitionDB();
    this.channelsLinks = [];
    this.messageIds = [];
  }

  async createContestDraft(data){
    return new Promise((resolve, reject) => {
      this.competitionDB.createContestDraft(
        data.contestId,
        data.contestName,
        data.channels,
        data.contestDescription,
        data.userId,
        data.media,
        data.conditions,
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

  async updateContestDraft(data){
    return new Promise((resolve, reject) => {
      this.competitionDB.updateContestDraft(
        data.contestId,
        data.contestName,
        data.channels,
        data.contestDescription,
        data.userId,
        data.media,
        data.conditions,
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

  async deleteMedia(data){
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '..', 'media', data);

      fs.unlink(filePath, (err, data) => {
        if (err) {
          console.error(err);
          // Якщо файл не знайдено, повернути 404
          if (err.code === 'ENOENT') {
            reject(err + ' file not found');
          }
          // Інші помилки
          reject(data);
        }
      });
      resolve('file deleted')
    });
  }
  async uploadMedia(data){
    return new Promise((resolve, reject) => {
      try{
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName, { recursive: true });
        }

        const file = data;
        const filename = data.originalname || 'defaultName';

        const filePath = path.join(folderName, filename);

        fs.writeFile(filePath, file, (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(`File saved to ${filePath}`);
          }
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
  async getCompetition(contest_id) {
    return new Promise((resolve, reject) => {

      this.competitionDB.getCompetition(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getCompetitionCondition(contest_id){
    return new Promise((resolve, reject) => {
      this.competitionDB.getCompetitionCondition(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const conditions = data.results[0];
          this.botToken = conditions.bot_token;

          resolve({
            conditions: conditions.conditions,
            answer: conditions.answer,
            is_closed: conditions.is_closed,
            channels: conditions.channels
          });
        }
      });
    });
  }

  async getActiveCompetitions(chatid) {
    return new Promise((resolve, reject) => {

      this.competitionDB.getActiveCompetitions(chatid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getActiveCompetitionById(contest_id) {
    return new Promise((resolve, reject) => {

      this.competitionDB.getActiveCompetitionById(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getFinishedCompetitionById(contest_id) {
    return new Promise((resolve, reject) => {

      this.competitionDB.getFinishedCompetitionById(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getCompetitionDraftById(contest_id) {
    return new Promise((resolve, reject) => {

      this.competitionDB.getCompetitionDraftById(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getDelayedCompetitions(chatid) {
    return new Promise((resolve, reject) => {
      this.competitionDB.getDelayedCompetitions(chatid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  async getCompetitionDrafts(owner_id) {
    return new Promise((resolve, reject) => {
      this.competitionDB.getCompetitionDrafts(owner_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  async getDelayedCompetitionForEdit(contest_id){
    return new Promise((resolve, reject) => {
      this.competitionDB.getDelayedCompetitionForEdit(contest_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  async editDelayedCompetition(data){
    return new Promise((resolve, reject) => {
      this.competitionDB.editDelayedCompetition(
        data,
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

  async getFinishedCompetitions(chatid) {
    return new Promise((resolve, reject) => {
      this.competitionDB.getFinishedCompetitions(chatid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  async checkSubscription(user_id, channel_id){

    return new Promise((resolve, reject) => {
      fetch(`${TELEGRAM_API_URL}/bot${this.botToken}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
        .then(response => response.json())
        .then(data => {
          if (data.ok && data.result && ['administrator', 'member', 'creator'].includes(data.result.status)) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = new CompetitionService();
