const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes'),
    competitionRouter = require('./competition/routes'),
    channelsRouter = require('./channels/routes'),
    adminsRouter = require('./admins/routes'),
    participationRouter = require('./contests_data/routes'),
    competitionBotRouter = require('./contest_bots/routes');
const {main_url} = require("../shared/application-context");

const path = require('path');

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
        app.use('/media', express.static(path.join(__dirname, '..', 'media')));
        console.log(path.join(__dirname, 'be-webapp', 'media'));
        app.use((req, res, next) => {
          console.log(`Request URL: ${req.url}`);
          next();
        });
    }
}

module.exports = IndexJs
