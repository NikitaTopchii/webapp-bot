const mysql = require('mysql');

class UserDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
            database: 'landscape'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL');
            }
        });
    }

    // Получение всех пользователей
    getUsers(callback) {
        const sql = 'SELECT * FROM users';
        this.connection.query(sql, (err, results) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
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

    updateUser(userId, userLogin, passHash, callback) {
        let sql;
        if (userLogin && passHash) {
            sql = 'UPDATE users SET userLogin = ?, passHash = ? WHERE id = ?';
        } else if (userLogin) {
            sql = 'UPDATE users SET userLogin = ? WHERE id = ?';
        } else if (passHash) {
            sql = 'UPDATE users SET passHash = ? WHERE id = ?';
        } else {
            callback("No data to change", null);
        }
        this.connection.query(sql, [userLogin, passHash, userId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = UserDB;
