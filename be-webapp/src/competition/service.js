const CompetitionDB = require('./database');
const {Telegraf, Markup} = require("telegraf");


const TELEGRAM_API_URL = 'https://api.telegram.org';
const BOT_TOKEN = '6624091262:AAFs5ML4CNEKNn1oP-jNSiKPqQ3zy1-1ywg';
class CompetitionService {

    channelsLinks;
    botToken;
    messageIds;
    constructor() {
        this.competitionDB = new CompetitionDB();
        this.channelsLinks = [];
        this.messageIds = [];
    }

    async createCompetition(data){
        this.botToken = await this.getBotToken(data.botid);
        console.log("bot token: ")
        console.log(this.botToken.results[0].token)

        await this.sendTelegramMessageWithKeyboard(data.channels,
            data.competitionDescription,
            data.contests_id,
            data.finishTime,
            data.winners_count,
            data.competitionName,
            data.language,
            data.channelNames.split(','));

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
                data.winners_count,
                this.channelsLinks.join(','),
                this.botToken.results[0].token,
                JSON.stringify(this.messageIds),
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

    async getBotToken(botid){
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

    async sendTelegramMessageWithKeyboard(chatId, message, contest_id, finish_time, winners_count, name, language, channelNames) {
        console.log('ChatID: ' + chatId);

        const webAppUrl = 'https://t.me/MAIN_TEST_ROBOT/contests?startapp=' + contest_id;
    
        const bot = new Telegraf(BOT_TOKEN);

        const contestDescription = name + '\n\n' + await this.generateTemplateForCompetition(message, language, chatId, finish_time, winners_count, channelNames);

        console.log(contestDescription)
    
        if(chatId.includes(',')){
            console.log('two elements')
            const chatIds = chatId.split(',');

            console.log(chatIds)

            for (const chatId1 of chatIds) {
                console.log(chatId1)
                try {
                    await bot.telegram.sendMessage(chatId1, contestDescription, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'participate', url: webAppUrl },
                                ],
                            ],
                        },
                        parse_mode: "HTML",
                        disable_web_page_preview: true
                    }).then((response) => {
                        this.messageIds.push({chatId: chatId1, messageId: response.message_id});
                        console.log('Повідомлення відправлено успішно.');
                    });
                } catch (error) {
                    console.error('Помилка під час відправлення повідомлення:', error);
                }
            }
        } else {
            console.log('one element')
            try {
                await bot.telegram.sendMessage(chatId, contestDescription, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'participate', url: webAppUrl },
                            ],
                        ],
                    },
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                }).then((response) => {
                    this.messageIds.push({chatId: chatId, messageId: response.message_id});
                });
                console.log('Повідомлення відправлено успішно.');
            } catch (error) {
                console.error('Помилка під час відправлення повідомлення:', error);
            }
        }
    }

    async generateTemplateForCompetition(message, localization, channel_id, finish_time, winners_count, channelNames) {
        if (localization === 'ru') {
            const i = message + '\n' + await this.generateRuTemplate(channel_id, finish_time.replace('T', ' ').slice(0, 16), winners_count, channelNames);
            console.log(i);
            return i;
        } else if (localization === 'en') {
            const i = message + '\n' + await this.generateEnTemplate(channel_id, finish_time.replace('T', ' ').slice(0, 16), winners_count, channelNames);
            console.log(i);
            return i;
        } else {
            return 'error';
        }
    }

    async generateRuTemplate(channelIds, finishTime, winnersCount, channelNames) {
        let channelsLinks = [];

        if (channelIds.includes(',')) {
            for (const channelId of channelIds.split(',')) {
                channelsLinks.push(await this.generateInviteLink(channelId));
            }
        } else {
            channelsLinks.push(await this.generateInviteLink(channelIds));
        }

        let channelsList = channelsLinks.map((id, index) => `- <a href="${id}">${channelNames[index]}</a>`).join('\n');
        return `
Для участия в конкурсе надо быть подписанным на эти каналы/чаты:
${channelsList}

Дата завершения конкурса:
- ${finishTime}

Количество победителей:
- ${winnersCount}
`;
    }

    async generateEnTemplate(channelIds, finishTime, winnersCount, channelNames){
        let channelsLinks = [];

        for (const channelId of channelIds.split(',')) {
            channelsLinks.push(await this.generateInviteLink(channelId));
        }

        console.log(channelsLinks);

        let channelsList = channelsLinks.map((id, index) => `- <a href="${id}">${channelNames[index]}</a>`).join('\n');
        return `
You have to be subscribed to these channels/chats to participate:
${channelsList}

Contest closing date:
- ${finishTime}

Winners amount:
- ${winnersCount}
`;
    }

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

    async generateInviteLink(channel_id) {
        console.log('channel_id: ' + channel_id)

        return new Promise((resolve, reject) => {
            const apiUrl = `https://api.telegram.org/bot${this.botToken.results[0].token}/createChatInviteLink`;
            console.log(apiUrl)
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: channel_id,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok) {
                        const inviteLink = data.result.invite_link;
                        this.channelsLinks.push(inviteLink);
                        resolve(inviteLink);
                    } else {
                        reject(`Error generating invite link: ${data.description}`);
                    }
                })
                .catch((error) => reject(error));
        });
    }

    async checkSubscription(user_id, channel_id){
        return new Promise((resolve, reject) => {
            fetch(`${TELEGRAM_API_URL}/bot${this.botToken.results[0].token}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
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