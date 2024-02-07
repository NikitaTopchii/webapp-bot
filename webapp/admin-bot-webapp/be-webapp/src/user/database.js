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
class UserDB {
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
                logger.trace('Connected to MySQL users');
            }
        });
    }

    getUser(userId, callback) {
        const sql = 'SELECT * FROM users WHERE userid = ?';
        this.connection.query(sql, [userId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

    authUser(userid,
                      username,
                      language,
                      callback){
        const request = 'INSERT INTO users SET ?';
        const newUser = {
            userid,
            username,
            language
        }

        this.connection.query(request, newUser, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
    getUsers(userIds, callback) {
        const sql = 'SELECT * FROM users WHERE userid IN (?)';
        this.connection.query(sql, [userIds], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = UserDB;
