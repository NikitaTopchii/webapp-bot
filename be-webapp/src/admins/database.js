const mysql = require('mysql');

class AdminsDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
            database: 'contests_admin'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL admins_info');
            }
        });
    }

    getAdmins(creators_id, callback){
        const sql = 'SELECT * FROM admins_info WHERE creators_id = ?';
        this.connection.query(sql, [creators_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        })
    }

    getAdmin(userid, callback) {
        const sql = 'SELECT * FROM admins_info WHERE userid = ?';
        this.connection.query(sql, [userid], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = AdminsDB;
