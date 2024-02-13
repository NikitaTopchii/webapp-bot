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
class TokenDB {
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
        logger.trace('Connected to MySQL contests_db');
      }
    });
  }

  getTokens(owner, callback) {
    const sql = 'SELECT * FROM contest_tokens WHERE owner = ?';
    this.connection.query(sql, [owner], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getToken(owner, tokenName, callback) {
    logger.info('owner: ' + owner)
    logger.info('tokenName: ' + tokenName)
    const sql = 'SELECT * FROM contest_tokens WHERE owner = ? AND name = ?';
    this.connection.query(sql, [owner, tokenName], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  deleteToken(tokenId, callback){
    logger.info('delete token with id: ' + tokenId)
    const sql = 'DELETE FROM contest_tokens WHERE id = ?';
    this.connection.query(sql, tokenId, (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  addToken(name, owner, callback) {
    const sql = 'INSERT INTO contest_tokens SET ?';

    const token = {
      name,
      owner
    }

    this.connection.query(sql, [token], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }
}

module.exports = TokenDB;
