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
class ChannelsDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'DyadkoVitya228',
            database: 'contests_channels'
        });

        this.connection.connect((err) => {
            if (err) {
                logger.error(`Error connecting to MySQL: ${err}`);
            } else {
                logger.trace('Connected to MySQL contests_channels');
            }
        });
    }

    getChannels(creators_id, botid, callback) {
        const sql = 'SELECT * FROM channels WHERE chatid IN (?) AND bot_token LIKE ?';
        this.connection.query(sql, [creators_id, botid + ':%'], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

    setGameToken(token, chatid, callback) {
      const sql = 'UPDATE channels SET game_token = ? WHERE chatid = ? LIMIT 1';
      this.connection.query(sql, [token, chatid], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }

    setChatSecurityStatus(chatSecurityStatus, chatId, callback){
      logger.info(chatSecurityStatus)
      logger.info(chatId)
      const sql = 'UPDATE channels SET chatguard = ? WHERE chatid = ? LIMIT 1';

      this.connection.query(sql, [chatSecurityStatus, chatId], (err, results) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }

    setChatGamificationStatus(chatGamificationStatus, chatId, callback){
      logger.info(chatGamificationStatus)
      logger.info(chatId)
      const sql = 'UPDATE channels SET gemification = ? WHERE chatid = ? LIMIT 1';

      this.connection.query(sql, [chatGamificationStatus, chatId], (err, results) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }

    setChatStopWordsStatus(chatStopWordsState, chatId, callback) {
      logger.info(chatStopWordsState)
      logger.info(chatId)
      const sql = 'UPDATE channels SET stop_words = ? WHERE chatid = ? LIMIT 1';

      this.connection.query(sql, [chatStopWordsState, chatId], (err, results) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, {results});
        }
      })
    }

    setChatCommandsStatus(chatCommandsState, chatId, callback){
      logger.info(chatCommandsState)
      logger.info(chatId)
      const sql = 'UPDATE channels SET commands = ? WHERE chatid = ? LIMIT 1';

      this.connection.query(sql, [chatCommandsState, chatId], (err, results) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, {results});
        }
      })
    }

    setChatCaptchaStatus(chatCaptchaState, chatId, callback){
      logger.info(chatCaptchaState)
      logger.info(chatId)
      const sql = 'UPDATE channels SET captcha = ? WHERE chatid = ? LIMIT 1';

      this.connection.query(sql, [chatCaptchaState, chatId], (err, results) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, {results});
        }
      })
    }

    isChatTokenExistById(tokenId, callback){
      const sql = 'SELECT * FROM channels WHERE game_token = ?';
      this.connection.query(sql, tokenId, (err, results) => {
        if (err) {
          logger.error(err);
          callback(err, null);
        } else {
          callback(null, {results})
        }
      })
    }

    getStopWordsByChatId(chatId, callback){
      const sql = 'SELECT words FROM stopwords WHERE chatid = ?';

      this.connection.query(sql, chatId, (err, results) => {
        if(err){
          logger.error(err);
          callback(err, null);
        } else {
          callback(null, {results});
        }
      })
    }
}

module.exports = ChannelsDB;
