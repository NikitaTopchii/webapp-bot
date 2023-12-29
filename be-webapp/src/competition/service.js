const CompetitionDB = require('./database');
const {Telegraf, Markup} = require("telegraf");


const TELEGRAM_API_URL = 'https://api.telegram.org';
const BOT_TOKEN = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM';
class CompetitionService {
    constructor() {
        this.competitionDB = new CompetitionDB();
    }

    async createCompetition(data){

        //await this.sendTelegramMessageWithKeyboard(data.channels, data.competitionDescription);

        return new Promise((resolve, reject) => {
            this.competitionDB.createCompetition(
                data.competitionName,
                data.competitionDescription,
                data.channels,
                data.conditions,
                data.contests_id,
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

    async publishCompetition(data){
        return new Promise((resolve, reject) => {
            this.competitionDB.publishCompetition(
                data.contest_id,
                data.chatid,
                data.channels,
                data.conditions,
                data.finishTime,
                (err, dbData) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(dbData);
                    }
                }
            );
        });
    }

    // async sendTelegramMessageWithKeyboard(chatId, message) {
    //     const webAppUrl = 'https://8668-46-98-213-149.ngrok-free.app/active-competition/' + chatId;
    //
    //     const bot = new Telegraf(BOT_TOKEN);
    //
    //     const inlineKeyboard = Markup.inlineKeyboard([
    //         Markup.button.webApp('open webapp', webAppUrl)
    //     ])
    //
    //     try {
    //         await bot.telegram.sendMessage(chatId, message, {
    //             reply_markup: {
    //                 inline_keyboard: [
    //                     [
    //                         { text: 'open app', web_app: { url: webAppUrl } },
    //                     ],
    //                 ],
    //             },
    //         });
    //         console.log('Повідомлення відправлено успішно.');
    //     } catch (error) {
    //         console.error('Помилка під час відправлення повідомлення:', error);
    //     }
    // }

    // async sendTelegramMessage(chatId, message) {
    //     const webAppUrl = 'https://8668-46-98-213-149.ngrok-free.app/active-competition/' + chatId;
    //
    //     console.log(chatId)
    //     console.log(message)
    //
    //     return new Promise((resolve, reject) => {
    //         console.log(`${TELEGRAM_API_URL}/bot${BOT_TOKEN}/sendMessage`)
    //
    //         fetch(`https://api.telegram.org/bot6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM/sendMessage`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 chat_id: chatId,
    //                 text: message,
    //                 reply_markup: {
    //                     inline_keyboard: [
    //                         [
    //                             {
    //                                 text: 'open',
    //                                 url: webAppUrl
    //                             }
    //                         ]
    //                     ]
    //                 }
    //             })
    //         })
    //             .then(response => {
    //                 console.log(response)
    //                 return response.json()
    //             })
    //             .then(data => {
    //                 if (data.ok) {
    //                     resolve(data);
    //                 } else {
    //                     reject('Не вдалося відправити повідомлення у Telegram');
    //                 }
    //             })
    //             .catch(error => reject(error));
    //     });
    // }

    async getCompetition(contest_id) {
        console.log(contest_id)

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

    async checkSubscription(user_id, channel_id){
        return new Promise((resolve, reject) => {
            fetch(`${TELEGRAM_API_URL}/bot${BOT_TOKEN}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
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