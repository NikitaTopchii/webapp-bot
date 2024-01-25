const mysql = require("mysql");

class CompetitionBotsDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'DyadkoVitya228',
            database: 'contests_db'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to MySQL: ${err}`);
            } else {
                console.log('Connected to MySQL contests_bots');
            }
        });
    }

    getBotToken(bot_id,callback) {
        if(/^[0-9]+$/.test(bot_id)){
            const sql = 'SELECT * FROM contests_bots WHERE token LIKE = ?';
            this.connection.query(sql, [bot_id+':%'], (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, {results});
                }
            });
        }
    }
}

module.exports = CompetitionBotsDB;