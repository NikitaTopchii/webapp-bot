const mysql = require("mysql");
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
class ParticipationDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'DyadkoVitya228',
            database: 'contests_users'
        });

        this.connection.connect((err) => {
            if (err) {
                logger.error(`Error connecting to MySQL: ${err}`);
            } else {
                logger.trace('Connected to MySQL contests_data');
            }
        });
    }

    addParticipant(userid,
                      contest_id,
                      username,
                      callback){
        const request = 'INSERT INTO users_data SET ?';
        const participant = {
            userid,
            contest_id,
            username
        }

        this.connection.query(request, participant, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

  addParticipantWithAnswer(userid,
                 contest_id,
                 username,
                 conditions,
                 text,
                 callback){
    const request = 'INSERT INTO users_data SET ?';
    const participant = {
      userid,
      contest_id,
      username,
      text
    }

    this.connection.query(request, participant, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

    getParticipant(userid, contests_id,callback) {
        const sql = 'SELECT * FROM users_data WHERE userid = ? AND contest_id = ?';
        this.connection.query(sql, [userid, contests_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = ParticipationDB;
