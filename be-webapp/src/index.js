const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes');

const url = require('../shared/application-context')
class IndexJs {
    constructor(app) {
        app.use(
            cors({
                origin: url.main_url
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
    }
}

module.exports = IndexJs