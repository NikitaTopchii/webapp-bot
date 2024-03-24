const mysql = require('mysql');
let colors = require('colors')
const {tokenExist} = require("../token/controller");
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
class UserCompetitionsDB {
    constructor() {
        this.connectionUsers = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'DyadkoVitya228',
            database: 'contests_users'
        });

        this.connectionUsers.connect((err) => {
            if (err) {
                logger.error(`Error connecting to MySQL: ${err}`);
            } else {
                logger.trace('Connected to MySQL users in user competition');
            }
        });

      this.connectionContests = mysql.createConnection({
        host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
        user: 'admin',
        password: 'DyadkoVitya228',
        database: 'contests_db'
      });

      this.connectionContests.connect((err) => {
        if (err) {
          logger.error(`Error connecting to MySQL: ${err}`);
        } else {
          logger.trace('Connected to MySQL contests in user competition');
        }
      });
    }

   getUserCompetitionIds(userId, callback) {
       const sql = 'SELECT contest_id FROM users_data WHERE userid = ?';
       this.connectionUsers.query(sql, [userId], (err, results) => {
           if (err) {
               callback(err, null);
           } else {
              callback(null, {results});
           }
       });
   }

  getActiveUserCompetitionsInfo(contestIds, callback) {
    const contestIdsArr = contestIds.split(',');

    const placeholders = contestIdsArr.map(() => '?').join(',');
    const sql = `SELECT * FROM contests WHERE contest_id IN (${placeholders}) AND is_closed = 0`;

    logger.info('contests ids for active competitions: ' + contestIdsArr.join(', '));
    logger.trace(sql);

    this.connectionContests.query(sql, chatIds, (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }

  getUserCompetitionDraft(contest_id, callback) {
    const sql = 'SELECT * FROM contests_draft WHERE contest_id = ?';
    this.connectionContests.query(sql, [contest_id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getFinishedUserCompetitionsInfo(contestIds, callback) {
    const contestIdsArr = contestIds.split(',');

    const placeholders = contestIdsArr.map(() => '?').join(',');
    const sql = `SELECT * FROM contests WHERE contest_id IN (${placeholders}) AND is_closed = 1`;

    logger.info('contests ids for finished competitions: ' + contestIdsArr.join(', '));
    logger.trace(sql);

    this.connectionContests.query(sql, chatIds, (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }
}

module.exports = UserCompetitionsDB;
