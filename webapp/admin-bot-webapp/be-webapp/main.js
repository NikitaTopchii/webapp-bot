const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");
const {main_url, user_id, bot_token} = require("./shared/application-context");

const bot = new Telegraf(bot_token);
// main bot: 6403334140:AAGsbvlry9VRLi1X70Fln9Th3CDx7vICWgU
//6984676354:AAGgUpv8PjPv1eSvqBg5sGQSvrGPpmXemFA
const webAppUrl = `${main_url}?userid=${user_id}&botid=6403334140`;

const inlineKeyboard = Markup.keyboard([
    Markup.button.webApp('open webapp', webAppUrl)
])
bot.command('start', (ctx) => {
    ctx.reply('Hello world!',
        inlineKeyboard,
        Markup.keyboard([
        Markup.button.webApp(
            'Send message',
            webAppUrl
        )]))
})

bot.launch();
