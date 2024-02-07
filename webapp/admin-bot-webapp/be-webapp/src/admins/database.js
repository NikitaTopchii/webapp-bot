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

class AdminsDB {


    constructor() {
        this.connection = mysql.createConnection({
            host: 'contests.cv0o2wcwu3bw.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password : 'DyadkoVitya228',
            database: 'contests_db'
        });

        this.connection.connect((err) => {
            if (err) {
                logger.error(`Error connecting to MySQL: ${err}`);
            } else {
                logger.trace('Connected to MySQL admins_info');
            }
        });
    }

    getHiredAdmins(owner_id, callback){
      const sql = 'SELECT * FROM admins_info WHERE owner = ?';
        this.connection.query(sql, [owner_id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        })
    }

    savePermissions(rights,
                    userid,
                    chatid,
                    owner,
                    callback) {
      const sql = 'UPDATE creators_groups SET rights = ? WHERE userid = ? AND chatid = ? AND owner = ?';
      this.connection.query(sql, [rights, userid, chatid, owner], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, {results});
        }
      })
    }

  deleteAdmin(admin_id, callback) {
    const sql = 'DELETE FROM admins_info WHERE userid = ?';
    this.connection.query(sql, [admin_id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    })
  }

  // data.user_id,
  // data.chat_id,
  // data.rights,
  // data.owner,

  addChatForAdmin(userid, chatid, rights, owner, callback) {
    const sql = 'INSERT INTO creators_groups SET ?';

    const newAdminChat = {
      userid,
      chatid,
      rights,
      owner
    }

    this.connection.query(sql, [newAdminChat], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {results});
      }
    })
  }

    getAdmins(owner, callback){
        const rightsCondition = '{"create_competition": true,"show_admins": true,"edit_permissions": true}';

        const sql = 'SELECT * FROM creators_groups WHERE owner = ? AND rights != ?';
        this.connection.query(sql, [owner, rightsCondition], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        })
    }

    getAdmin(userid, callback) {
        const sql = 'SELECT * FROM creators_groups WHERE userid = ?';
        this.connection.query(sql, [userid], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {results});
            }
        });
    }

    getHiredAdminChats(userid, owner, callback){
      const sql = 'SELECT * FROM creators_groups WHERE userid = ? AND owner = ?';
      this.connection.query(sql, [userid, owner], (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, {results});
        }
      });
    }
}

module.exports = AdminsDB;
