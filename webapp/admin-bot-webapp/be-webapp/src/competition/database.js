const mysql = require("mysql");
let colors = require('colors')
let logger = require('tracer').colorConsole({
  filters: [
    colors.underline,
    colors.white,
    {
      trace: colors.bgCyan,
      info: colors.bgGreen,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    }
  ]
})

class CompetitionDB {
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
        logger.trace('Connected to MySQL contests');
      }
    });
  }

  createContestDraft(contest_id,
                     name,
                     channels,
                     description,
                     owner_id,
                     media,
                     conditions,
                     callback){
    const sql = 'INSERT INTO contests_draft SET ?';
    const newContestDraft = {
      contest_id,
      name,
      channels,
      description,
      owner_id,
      media,
      conditions
    }
    logger.info(newContestDraft)
    logger.trace(sql)
    this.connection.query(sql, newContestDraft, (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info(results)
        callback(null, {results});
      }
    });
  }


  getCompetition(contest_id,callback) {
    const sql = 'SELECT * FROM contests WHERE contest_id = ?';

    logger.info('contest id: ' + contest_id);
    logger.trace(sql)
    this.connection.query(sql, [contest_id], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results})
        callback(null, {results});
      }
    });
  }

  getDelayedCompetitions(chatid, callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = -1';

    logger.info('chat id: ' + chatid);
    logger.trace(sql);
    this.connection.query(sql, [chatid], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }

  getFinishedCompetitions(chatid, callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = 1';

    logger.info('chat id: ' + chatid);
    logger.trace(sql);
    this.connection.query(sql, [chatid], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results})
        callback(null, {results});
      }
    });
  }

  getCompetitionCondition(contestId, callback){
    const sql = 'SELECT conditions, answer, is_closed, channels, bot_token FROM contests WHERE contest_id = ?';

    logger.info('contest id: ' + contestId)
    logger.trace(sql);
    this.connection.query(sql, [contestId], (err, results) => {
      if (err) {
        logger.error(err)
        callback(err, null);
      } else {
        logger.info({results})
        callback(null, {results});
      }
    });
  }
  getActiveCompetition(chat_id,callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = 0';

    logger.info('chat id: ' + chat_id);
    logger.trace(sql);
    this.connection.query(sql, [chat_id], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results})
        callback(null, {results});
      }
    });
  }
}

module.exports = CompetitionDB;
