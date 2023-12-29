const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");

const token = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM'

const bot = new Telegraf(token);

const webAppUrl = 'https://8668-46-98-213-149.ngrok-free.app';

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

bot.on(message('web_app_data'), async (ctx) => {
    console.log(ctx.webAppData.data.json());
    const data = ctx.webAppData.data.json()
    ctx.reply(`HIS IS YOUR MESSAGE MOTHERFUCKER ${data?.channels}` ?? 'empty_message')
})

bot.launch();