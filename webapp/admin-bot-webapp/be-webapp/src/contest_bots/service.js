const CompetitionBotsDB = require('./database');
class CompetitionBotsService {
    constructor() {
        this.competitionDB = new CompetitionBotsDB();
    }

    async getBotToken(bot_id) {
        console.log(bot_id)

        return new Promise((resolve, reject) => {

            this.competitionDB.getBotToken(bot_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }
}

module.exports = new CompetitionBotsService();