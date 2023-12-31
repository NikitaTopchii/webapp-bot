const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes'),
    competitionRouter = require('./competition/routes'),
    channelsRouter = require('./channels/routes'),
    adminsRouter = require('./admins/routes'),
    participationRouter = require('./contests_data/routes');
    

class IndexJs {
    constructor(app) {
        app.use(
            cors({
                origin: "https://3c02-169-150-218-79.ngrok-free.app"
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
        app.use('/competitions', competitionRouter);
        app.use('/channels', channelsRouter);
        app.use('/admins', adminsRouter);
        app.use('/participant', participationRouter);
    }
}

module.exports = IndexJs