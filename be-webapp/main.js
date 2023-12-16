import { Telegraf , Markup } from "telegraf";

const token = '6903067558:AAG23R3ciW8SnvCQ6YWL4j5mferanqLEjAM'

const bot = new Telegraf(token);

const webAppUrl = 'https://b525-46-98-212-182.ngrok-free.app ';

bot.command('start', (ctx) => {
    ctx.reply('Hello world!',
        Markup.keyboard([
        Markup.button.webApp(
            'Send message',
            webAppUrl
        )]))
})

bot.launch();