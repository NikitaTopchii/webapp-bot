const AdminsService = require('./service');

exports.getAdmins = async (req, res) => {
    try {
        console.log(req.query.creators_ids)
        const admins = await AdminsService.getAdmins(req.query.creators_ids);
        res.json(admins);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        console.log(req.query.id)
        const admins = await AdminsService.getAdmin(req.query.id);
        res.json(admins);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
}

exports.getAdminsWithSubscription = async (req, res) => {
    try {
        console.log(req.query.user_id)
        const admins = await AdminsService.getAdminsWithSubscription(req.query.user_id);
        res.json(admins);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
}