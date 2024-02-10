const mysql = require('mysql');
let colors = require('colors')
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgCyan,
      info: colors.green,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})
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
                logger.error(`Error connecting to MySQL: ${err}`);
            } else {
                logger.trace('Connected to MySQL contests_channels');
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

    setGameToken(token, chatid, callback) {
      const sql = 'UPDATE channels SET game_token = ? WHERE chatid = ? LIMIT 1';
      this.connection.query(sql, [token, chatid], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }
}

module.exports = ChannelsDB;
