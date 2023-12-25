const express = require('express'),
    cors = require('cors'),
    userRouter = require('./user/routes');
class IndexJs {
    constructor(app) {
        const express = require('express');


        const host = '0.0.0.0';
        const port = 3000;
        app.use(
            cors({
                credentials: true,
                ENV : "http://localhost:80/"
            }),
        );
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/users', userRouter);
    }
}

module.exports = IndexJs