const CompetitionDB = require('./database');


const TELEGRAM_API_URL = 'https://api.telegram.org';
const BOT_TOKEN = 'YOUR_BOT_TOKEN';
class CompetitionService {
    constructor() {
        this.competitionDB = new CompetitionDB();
    }

    async createCompetition(data){

        console.log(data.competitionName);

        return new Promise((resolve, reject) => {
            this.competitionDB.createCompetition(
                data.competitionName,
                data.competitionDescription,
                data.channels,
                data.conditions,
                data.contests_id,
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

    async getCompetition(contest_id) {
        console.log(contest_id)

        return new Promise((resolve, reject) => {

            this.competitionDB.getCompetition(contest_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });

        });
    }

    async checkSubscription(user_id, channel_id){
        return new Promise((resolve, reject) => {
            fetch(`${TELEGRAM_API_URL}/bot${BOT_TOKEN}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.ok && data.result && ['administrator', 'member', 'creator'].includes(data.result.status)) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(error => reject(error));
        });
    }
}

module.exports = new CompetitionService();