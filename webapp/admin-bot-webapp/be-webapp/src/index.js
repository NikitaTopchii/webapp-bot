const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes'),
    competitionRouter = require('./competition/routes'),
    channelsRouter = require('./channels/routes'),
    adminsRouter = require('./admins/routes'),
    participationRouter = require('./contests_data/routes'),
    competitionBotRouter = require('./contest_bots/routes');
    tokenRouter = require('./token/routes');
const {main_url} = require("../shared/application-context");

const path = require('path');

let colors = require('colors')
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgYellow,
      info: colors.green,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})

class IndexJs {
    constructor(app) {
        app.use(
            cors({
              //origin: "https://prizebot.online"
              origin: main_url,
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
        app.use('/competitions', competitionRouter);
        app.use('/channels', channelsRouter);
        app.use('/admins', adminsRouter);
        app.use('/participant', participationRouter);
        app.use('/bots', competitionBotRouter);
        app.use('/token', tokenRouter);
        app.use('/media', express.static(path.join(__dirname, '..', 'media')));
        app.use((req, res, next) => {
          logger.trace(`Request URL: ${req.url}`);
          next();
        });
    }
}

module.exports = IndexJs
