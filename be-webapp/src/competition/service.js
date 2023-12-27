const CompetitionDB = require('./database');

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
}

module.exports = new CompetitionService();