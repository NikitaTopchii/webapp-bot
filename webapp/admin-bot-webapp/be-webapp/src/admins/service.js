const AdminsDB           = require('./database');


class AdminsService {
    constructor() {
        this.admins = new AdminsDB();
    }

    async getAdmins(creators_id) {
        console.log(creators_id)

        return new Promise((resolve, reject) => {

            const creatorsIdList = creators_id.split(',');

            this.admins.getAdmins(creatorsIdList, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    async getAdminsWithSubscription(user_id) {
        console.log(user_id)

        return new Promise((resolve, reject) => {

            this.admins.getAdmin(user_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    async getAdmin(user_id) {
        console.log(user_id)

        return new Promise((resolve, reject) => {
            this.admins.getAdmin(user_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    getHiredAdmins(owner_id){
      return new Promise((resolve, reject) => {
        this.admins.getHiredAdmins(owner_id, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });

      });
    }

  getHiredAdminChats(user_id, owner_id){
    return new Promise((resolve, reject) => {
      this.admins.getHiredAdminChats(user_id, owner_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

    savePermissions(data){
      return new Promise((resolve, reject) => {
        console.log(data.permissions)
        console.log(data.userid)
        this.admins.savePermissions(
          data.permissions,
          data.userid,
          data.chatid,
          data.owner,
          (err, data) => {
            if(err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        )
      })
    }

  deleteAdmin(data){
    return new Promise((resolve, reject) => {
      console.log(data.admin_id)
      this.admins.deleteAdmin(
        data.admin_id,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }

  addChatForAdmin(data){
    return new Promise((resolve, reject) => {
      this.admins.addChatForAdmin(
        data.user_id,
        data.chat_id,
        data.rights,
        data.owner,
        (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
    })
  }
}

module.exports = new AdminsService();
