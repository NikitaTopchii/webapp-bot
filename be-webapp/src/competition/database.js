const mysql = require("mysql");

class CompetitionDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passHashword: '',
            database: 'contests_db'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL contests');
            }
        });
    }

    createCompetition(name,
                      description,
                      channels,
                      conditions,
                      contest_id,
                      callback){
        const request = 'INSERT INTO contests SET ?';
        const newCompetition = {
            name,
            description,
            channels,
            conditions,
            contest_id
        }

        this.connection.query(request, newCompetition, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

    getCompetition(contest_id,callback) {
        const sql = 'SELECT * FROM contests WHERE contest_id';
        this.connection.query(sql, [contest_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }
}

module.exports = CompetitionDB;