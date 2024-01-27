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
  async createCompetition(data){
    this.botToken = await this.getBotToken(data.botid);
    console.log(this.botToken)
    console.log("BOT TOKEN IN CREATE COMPETITION: " + this.botToken)

    return new Promise((resolve, reject) => {
      resolve('ok');
      reject('not ok');
    })
  }

//   async publishCompetition(data){
//     return new Promise((resolve, reject) => {
//       this.competitionDB.publishCompetition(
//         data.contest_id,
//         data.chatid,
//         data.channels,
//         data.conditions,
//         data.finishTime,
//         data.winners_count,
//         this.channelsLinks.join(','),
//         this.botToken.results[0].token,
//         JSON.stringify(this.messageIds),
//         data.language,
//         (err, dbData) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(dbData);
//           }
//         }
//       );
//     });
//   }
//
  async getBotToken(botid){
    console.log("GET BOT TOKEN BY BOTID: " + botid)
    return new Promise((resolve, reject) => {

      this.competitionDB.getBotToken(botid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
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
//
//   async sendTelegramMessageWithKeyboard(chatId, message, contest_id, finish_time, winners_count, name, language, channelNames) {
//     this.messageIds = [];
//
//     const webAppUrl = 'https://t.me/MAIN_TEST_ROBOT/contests?startapp=' + contest_id;
//
//     const bot = new Telegraf(this.botToken.results[0].token);
//
//     const contestDescription = name + '\n\n' + await this.generateTemplateForCompetition(message, language, chatId, finish_time, winners_count, channelNames);
//
//     for (const chatId1 of chatId.split(',')) {
//       try {
//         await bot.telegram.sendMessage(chatId1, contestDescription, {
//           reply_markup: {
//             inline_keyboard: [
//               [
//                 { text: this.selectLocalizationForButton(language), url: webAppUrl },
//               ],
//             ],
//           },
//           parse_mode: "HTML",
//           disable_web_page_preview: true
//         }).then((response) => {
//           this.messageIds.push({chatId: chatId1, messageId: response.message_id});
//         });
//       } catch (error) {
//         console.error('Помилка під час відправлення повідомлення:', error);
//       }
//     }
//     // if(chatId.includes(',')){
//     //   const chatIds = chatId.split(',');
//     //
//     //   for (const chatId1 of chatIds) {
//     //     try {
//     //       await bot.telegram.sendMessage(chatId1, contestDescription, {
//     //         reply_markup: {
//     //           inline_keyboard: [
//     //             [
//     //               { text: this.selectLocalizationForButton(language), url: webAppUrl },
//     //             ],
//     //           ],
//     //         },
//     //         parse_mode: "HTML",
//     //         disable_web_page_preview: true
//     //       }).then((response) => {
//     //         this.messageIds.push({chatId: chatId1, messageId: response.message_id});
//     //       });
//     //     } catch (error) {
//     //       console.error('Помилка під час відправлення повідомлення:', error);
//     //     }
//     //   }
//     // } else {
//     //   try {
//     //     await bot.telegram.sendMessage(chatId, contestDescription, {
//     //       reply_markup: {
//     //         inline_keyboard: [
//     //           [
//     //             { text: this.selectLocalizationForButton(language), url: webAppUrl },
//     //           ],
//     //         ],
//     //       },
//     //       parse_mode: 'HTML',
//     //       disable_web_page_preview: true
//     //     }).then((response) => {
//     //       this.messageIds.push({chatId: chatId, messageId: response.message_id});
//     //     });
//     //   } catch (error) {
//     //     console.error('Помилка під час відправлення повідомлення:', error);
//     //   }
//     // }
//   }
//
//   selectLocalizationForButton(language){
//     if(language === 'en'){
//       return 'Participate';
//     } else if(language === 'ru'){
//       return 'Учавствовать';
//     }
//   }
//
//   async generateTemplateForCompetition(message, localization, channel_id, finish_time, winners_count, channelNames) {
//     if (localization === 'ru') {
//       return message + '\n' + await this.generateRuTemplate(channel_id, finish_time.replace('T', ' ').slice(0, 16), winners_count, channelNames);
//     } else if (localization === 'en') {
//       return message + '\n' + await this.generateEnTemplate(channel_id, finish_time.replace('T', ' ').slice(0, 16), winners_count, channelNames);
//     } else {
//       return 'error';
//     }
//   }
//
//   async generateRuTemplate(channelIds, finishTime, winnersCount, channelNames) {
//     let channelsLinks = [];
//
//     for (const channelId of channelIds.split(',')) {
//       channelsLinks.push(await this.generateInviteLink(channelId));
//     }
//
//     let channelsList = channelsLinks.map((id, index) => `- <a href="${id}">${channelNames[index]}</a>`).join('\n');
//     return `
// Для участия в конкурсе надо быть подписанным на эти каналы/чаты:
// ${channelsList}
//
// Дата завершения конкурса:
// - ${finishTime}
//
// Количество победителей:
// - ${winnersCount}
// `;
//   }
//
//   async generateEnTemplate(channelIds, finishTime, winnersCount, channelNames){
//     let channelsLinks = [];
//
//     for (const channelId of channelIds.split(',')) {
//       channelsLinks.push(await this.generateInviteLink(channelId));
//     }
//
//     let channelsList = channelsLinks.map((id, index) => `- <a href="${id}">${channelNames[index]}</a>`).join('\n');
//     return `
// You have to be subscribed to these channels/chats to participate:
// ${channelsList}
//
// Contest closing date:
// - ${finishTime}
//
// Winners amount:
// - ${winnersCount}
// `;
//   }
//
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
          resolve(data);
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
    console.log("TOKEN: " + this.botToken.results[0].token)

    return new Promise((resolve, reject) => {
      fetch(`${TELEGRAM_API_URL}/bot${this.botToken.results[0].token}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
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
