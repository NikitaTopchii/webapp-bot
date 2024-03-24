const { Telegraf , Markup } = require("telegraf");
const {message} = require("telegraf/filters");
const {main_url, user_id, bot_token} = require("./shared/application-context");

const bot = new Telegraf(bot_token);
// main bot: 6403334140:AAGsbvlry9VRLi1X70Fln9Th3CDx7vICWgU
//6984676354:AAGgUpv8PjPv1eSvqBg5sGQSvrGPpmXemFA
const webAppUrlAdmin = `${main_url}?userid=${user_id}&botid=6403334140`;
const webAppUrlUser = `${main_url}?userid=${user_id}&botid=6403334140`;

const inlineKeyboard = Markup.keyboard([
    Markup.button.webApp('open admin webapp', webAppUrlAdmin)
])

const inlineKeyboard2 = Markup.keyboard([
  Markup.button.webApp('open user webapp', webAppUrlUser)
])
bot.command('admin', (ctx) => {
    ctx.reply('Hello world admin!',
        inlineKeyboard,
        Markup.keyboard([
        Markup.button.webApp(
            'Send message',
            webAppUrlAdmin
        )]))
})

bot.command('user', (ctx) => {
  ctx.reply('Hello world user!',
    inlineKeyboard2,
    Markup.keyboard([
      Markup.button.webApp(
        'Send message',
        webAppUrlUser
      )]))
})

bot.launch();
