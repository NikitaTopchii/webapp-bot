const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");

const token = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM'

const bot = new Telegraf(token);

const webAppUrl = 'https://e952-5-248-108-234.ngrok-free.app?userid=464155131';

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