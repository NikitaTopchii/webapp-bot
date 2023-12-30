const mysql = require('mysql');

class AdminsDB {


    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
            database: 'contests'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL admins_info');
            }
        });
    }

    getHiresAdmins(user_id, callback){
            const sql = 'SELECT * FROM creators_groups WHERE owner = ?';
        this.connection.query(sql, [user_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        })
    }

    getAdmins(owner, callback){
        const rightsCondition = '{"create_competition": true,"show_admins": true,"edit_permissions": true}';

        const sql = 'SELECT * FROM creators_groups WHERE owner = ? AND rights != ?';
        this.connection.query(sql, [owner, rightsCondition], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        })
    }

    getAdmin(userid, callback) {
        const sql = 'SELECT * FROM creators_groups WHERE userid = ?';
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
