const mysql = require('mysql');

class ChannelsDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'DyadkoVitya228',
            database: 'contests_channels'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL contests_channels');
            }
        });
    }

    getChannels(creators_id, botid, callback) {
        const sql = 'SELECT * FROM channels WHERE chatid IN (?) AND bot_token LIKE ?';
        this.connection.query(sql, [creators_id, botid + ':%'], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = ChannelsDB;
