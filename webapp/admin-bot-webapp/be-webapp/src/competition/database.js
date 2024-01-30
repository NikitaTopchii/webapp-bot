const mysql = require("mysql");

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
    const request = 'INSERT INTO contests_draft SET ?';
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

  createContestDraft(contest_id,
                     name,
                     channels,
                     description,
                     owner_id,
                     media,
                     conditions,
                     callback){
    const request = 'INSERT INTO contests_draft SET ?';
    const newContestDraft = {
      contest_id,
      name,
      channels,
      description,
      owner_id,
      media,
      conditions
    }

    this.connection.query(request, newContestDraft, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }


  getCompetition(contest_id,callback) {
    const sql = 'SELECT * FROM contests WHERE contest_id = ?';
    this.connection.query(sql, [contest_id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getDelayedCompetitions(chatid, callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = -1';
    this.connection.query(sql, [chatid], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getFinishedCompetitions(chatid, callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = 1';
    this.connection.query(sql, [chatid], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getCompetitionCondition(contestId, callback){
    const sql = 'SELECT conditions, answer, is_closed, channels, bot_token FROM contests WHERE contest_id = ?';
    this.connection.query(sql, [contestId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }
  getActiveCompetition(chat_id,callback) {
    const sql = 'SELECT * FROM contests WHERE chatid = ? AND is_closed = 0';
    this.connection.query(sql, [chat_id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    });
  }

  getBotToken(bot_id,callback) {
    if(/^[0-9]+$/.test(bot_id)){
      const sql = 'SELECT * FROM contests_bots WHERE token LIKE ?';
      console.log(sql)
      this.connection.query(sql, [bot_id + ':%'], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }
  }
}

module.exports = CompetitionDB;
