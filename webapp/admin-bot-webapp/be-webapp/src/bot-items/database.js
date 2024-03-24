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
class BotItemsDB {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
      user: 'admin',
      password: 'DyadkoVitya228',
      database: 'contests_db'
    });

    this.connection.connect((err) => {
      if (err) {
        logger.error(`Error connecting to MySQL: ${err}`);
      } else {
        logger.trace('Connected to MySQL contests_items');
      }
    });
  }

  getItems(callback) {
    const sql = 'SELECT * FROM contests_items';
    this.connection.query(sql, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }
}

module.exports = BotItemsDB;
