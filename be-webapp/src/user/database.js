const mysql = require('mysql');

class UserDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
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
