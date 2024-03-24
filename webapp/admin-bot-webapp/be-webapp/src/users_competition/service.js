const UserCompetitions           = require('./database');


class UsersCompetitionService {
    constructor() {
        this.userCompetitions = new UserCompetitions();
    }

    async getUserCompetitionIds(userId) {

        return new Promise((resolve, reject) => {
            this.userCompetitions.getUserCompetitionIds(userId, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                  resolve(data);
                }
            });

        });
    }

  async getActiveUserCompetitionsInfo(contestIds) {

    return new Promise((resolve, reject) => {
      this.userCompetitions.getActiveUserCompetitionsInfo(contestIds, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getFinishedUserCompetitionsInfo(contestIds) {

    return new Promise((resolve, reject) => {
      this.userCompetitions.getFinishedUserCompetitionsInfo(contestIds, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }

  async getUserCompetitionDraft(contestId) {

    return new Promise((resolve, reject) => {
      this.userCompetitions.getUserCompetitionDraft(contestId, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

    });
  }
}

module.exports = new UsersCompetitionService();
