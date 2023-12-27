const mysql = require('mysql');

class ChannelsDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
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

    getChannels(creators_id, callback) {
        const sql = 'SELECT * FROM channels WHERE creators_id = ?';
        this.connection.query(sql, [creators_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = ChannelsDB;
