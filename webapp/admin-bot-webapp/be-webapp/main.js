const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");
const {main_url, user_id, bot_token} = require("./shared/application-context");

const bot = new Telegraf(bot_token);
//6984676354:AAGgUpv8PjPv1eSvqBg5sGQSvrGPpmXemFA
const webAppUrl = `${main_url}?userid=${user_id}&botid=6984676354`;

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
