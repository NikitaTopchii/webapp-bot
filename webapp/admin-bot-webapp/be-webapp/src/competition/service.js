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

  //
  async createContestDraft(data){
    console.log('contest data for drafts')
    console.log(data)
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
    console.log('upload media')
    return new Promise((resolve, reject) => {
      try{
        console.log(data)
        // Перевірка на наявність директорії
        console.log(folderName)
        if (!fs.existsSync(folderName)) {
          console.log(folderName)
          fs.mkdirSync(folderName, { recursive: true });
        }

        // Отримання даних файлу
        const file = data; // Переконайтеся, що це потік даних
        console.log(file)
        const filename = data.originalname || 'defaultName'; // Назва файлу для збереження
        console.log(filename)

        // Створення повного шляху для файлу
        const filePath = path.join(folderName, filename);
        console.log(filePath)

        // Запис файлу
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
    console.log("GET COMPETITION BY CONTEST_ID: " + contest_id)
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
          console.log('data competition condition')
          console.log(data)
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
    console.log("GET COMPETITION BY CONTEST_ID: " + chatid)
    return new Promise((resolve, reject) => {

      this.competitionDB.getActiveCompetition(chatid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log(data)
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
//
//   async generateInviteLink(channel_id) {
//
//     return new Promise((resolve, reject) => {
//       const apiUrl = `https://api.telegram.org/bot${this.botToken.results[0].token}/createChatInviteLink`;
//
//       fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           chat_id: channel_id,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.ok) {
//             const inviteLink = data.result.invite_link;
//             this.channelsLinks.push(inviteLink);
//             resolve(inviteLink);
//           } else {
//             reject(`Error generating invite link: ${data.description}`);
//           }
//         })
//         .catch((error) => reject(error));
//     });
//   }

  async checkSubscription(user_id, channel_id){
    console.log("TOKEN: " + this.botToken)

    return new Promise((resolve, reject) => {
      fetch(`${TELEGRAM_API_URL}/bot${this.botToken}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
        .then(response => response.json())
        .then(data => {
          if (data.ok && data.result && ['administrator', 'member', 'creator'].includes(data.result.status)) {
            console.log('this work')
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
