const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes'),
    competitionRouter = require('./competition/routes'),
    channelsRouter = require('./channels/routes'),
    adminsRouter = require('./admins/routes'),
    participationRouter = require('./contests_data/routes'),
    competitionBotRouter = require('./contest_bots/routes');


class IndexJs {
    constructor(app) {
        app.use(
            cors({
              origin: "https://prizebot.online"
              //origin: 'https://310e-2a02-2378-1205-ab27-426-9f7d-32b2-a17c.ngrok-free.app',
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
        app.use('/competitions', competitionRouter);
        app.use('/channels', channelsRouter);
        app.use('/admins', adminsRouter);
        app.use('/participant', participationRouter);
        app.use('/bots', competitionBotRouter)
    }
}

module.exports = IndexJs
