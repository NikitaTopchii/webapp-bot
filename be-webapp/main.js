const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");

const token = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM'

const bot = new Telegraf(token);

const webAppUrl = 'https://8ff0-188-163-40-175.ngrok-free.app?userid=464155131';

const inlineKeyboard = Markup.inlineKeyboard([
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