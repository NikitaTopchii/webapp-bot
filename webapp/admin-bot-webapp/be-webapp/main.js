const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");

const token = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM'

const bot = new Telegraf(token);

const webAppUrl = 'https://f737-2a02-2378-11b9-3208-3122-92a7-51b3-dfb2.ngrok-free.app?userid=464155131&botid=6740264492';

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
