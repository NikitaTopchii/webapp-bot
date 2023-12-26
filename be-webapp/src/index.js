const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes');
class IndexJs {
    constructor(app) {
        app.use(
            cors({
                origin: 'https://4edd-46-98-213-149.ngrok-free.app'
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
    }
}

module.exports = IndexJs