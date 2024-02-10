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

  updateContestDraft(contest_id,
                     name,
                     channels,
                     description,
                     owner_id,
                     media,
                     conditions,
                     callback){
    const sql = 'UPDATE contests_draft SET ? WHERE contest_id = ?';
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

    this.connection.query(sql, [newContestDraft, contest_id], (err, results) => {
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

  getDelayedCompetitions(chatIdsStr, callback) {
    const chatIds = chatIdsStr.split(',');

    const placeholders = chatIds.map(() => '?').join(',');
    const sql = `SELECT * FROM contests WHERE chatid IN (${placeholders}) AND is_closed = -1`;

    logger.info('chat ids: ' + chatIds.join(', '));
    logger.trace(sql);

    this.connection.query(sql, [chatIds], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }

  getDelayedCompetitionForEdit(contest_id, callback){
    const sql = 'SELECT contests_draft.name, contests_draft.description, contests_draft.channels, contests_draft.conditions, contests.start_time, contests.finish_time, contests.winners_amount, contests.language, contests.answer FROM contests_draft JOIN contests ON contests.contest_id = contests_draft.contest_id WHERE contests.contest_id = ? AND contests.is_closed = -1 GROUP BY contests.contest_id LIMIT 1;';

    logger.info('contest id: ' + data);
    logger.trace(sql);
    this.connection.query(sql, [contest_id], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }

  editDelayedCompetition(data, callback){
    const sql = 'UPDATE contest_draft SET name = ?, description = ?, conditions = ? WHERE contest_id = ?';
    logger.info('contest id: ' + data);
    logger.trace(sql);
    this.connection.query(sql, [data.contestName, data.contestDescription, data.conditions, data.contestId], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        const sql = 'UPDATE contests SET start_time = ?, finish_time = ?, winner_amount = ?, language = ?, answer = ? WHERE contest_id = ?';
        logger.info({results});
        this.connection.query(sql, [data.start_time, data.finish_time, data.winner_amount, data.language, data.answer, data.contestId], (err, results) => {
          if (err) {
            logger.error(err);
            callback(err, null);
          } else {
            logger.info({results});
            callback(null, {results});
          }
        });
        callback(null, {results});
      }
    });
  }

  editCompetitions(data, callback){
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = -1';

    logger.info('chat id: ' + data);
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

  getFinishedCompetitions(chatIdsStr, callback) {
    const chatIds = chatIdsStr.split(',');

    const placeholders = chatIds.map(() => '?').join(',');
    const sql = `SELECT * FROM contests WHERE chatid IN (${placeholders}) AND is_closed = 1`;

    logger.info('chat ids: ' + chatIds.join(', '));
    logger.trace(sql);

    this.connection.query(sql, [chatIds], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
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

  getActiveCompetitionById(contest_id, callback) {
    const sql = `SELECT contests_draft.name, contests_draft.description, contests_draft.channels, contests_draft.conditions, contests.start_time, contests.finish_time, contests.winners_amount, contests.language, contests.answer FROM contests_draft JOIN contests ON contests.contest_id = contests_draft.contest_id WHERE contests.contest_id = ? AND contests.is_closed = 0 GROUP BY contests.contest_id LIMIT 1;`;

    logger.info('contest_id: ' + contest_id);
    logger.trace(sql);

    this.connection.query(sql, [contest_id], (err, results) => {
      if (err) {
        logger.error(err);
        callback(err, null);
      } else {
        logger.info({results});
        callback(null, {results});
      }
    });
  }

  getActiveCompetitions(chatIdsStr, callback) {
    const chatIds = chatIdsStr.split(',');

    const placeholders = chatIds.map(() => '?').join(',');
    const sql = `SELECT * FROM contests WHERE chatid IN (${placeholders}) AND is_closed = 0`;

    logger.info('placeholders: ' + placeholders)
    logger.info('chat ids: ' + chatIds.join(', '));
    logger.trace(sql);

    this.connection.query(sql, chatIds, (err, results) => {
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

module.exports = CompetitionDB;
