const mysql = require('mysql');

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
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL users');
            }
        });
    }

    getUser(userId, callback) {
        const sql = 'SELECT * FROM users WHERE userid = ?';
        this.connection.query(sql, [userId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                console.log('results: ' + results)
                callback(null, {results});
            }
        });
    }

    authUser(userid,
                      username,
                      language,
                      is_admin,
                      subscription,
                      callback){

        console.log(username)
        console.log(userid)
        const request = 'INSERT INTO users SET ?';
        const newUser = {
            userid,
            username,
            language,
            is_admin,
            subscription
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
