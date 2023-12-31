const mysql = require("mysql");

class ParticipationDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
            database: 'contests_data'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL contests_data');
            }
        });
    }

    addParticipant(userid,
                      contest_id,
                      callback){
        const request = 'INSERT INTO users_data SET ?';
        const participant = {
            userid,
            contest_id
        }

        this.connection.query(request, participant, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

    getParticipant(userid,callback) {
        const sql = 'SELECT * FROM users_data WHERE userid = ?';
        this.connection.query(sql, [userid], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = ParticipationDB;