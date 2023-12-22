const express = require('express'),
    app = express(),
    cors = require('cors'),
    userRouter = require('./user/routes');


const host = '127.0.0.1';
const port = 3000;
app.use(
    cors({
        credentials: true,
        ENV : "http://localhost:4200/"
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: "*"
    }),
)

app.use('/users', userRouter);
app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);