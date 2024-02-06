const AdminsService = require('./service');
const CompetitionService = require("../competition/service");
const {bot_webhook_url} = require("../../shared/application-context");

exports.getAdmins = async (req, res) => {
    try {
        const admins = await AdminsService.getAdmins(req.query.creators_ids);
        res.json(admins);

    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const admins = await AdminsService.getAdmin(req.query.id);
        res.json(admins);

    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
}

exports.getAdminsWithSubscription = async (req, res) => {
    try {
        const admins = await AdminsService.getAdminsWithSubscription(req.query.user_id);
        res.json(admins);

    } catch (error) {
        res.status(500).send({ message: 'Error while getting channels' });
    }
}

exports.getHiredAdmins = async (req, res) => {
  try {
    const admins = await AdminsService.getHiredAdmins(req.query.owner_id);
    res.json(admins);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting fired admins'});
  }
}

exports.getHiredAdminChats = async (req, res) => {
  try {
    const admins = await AdminsService.getHiredAdminChats(req.query.user_id, req.query.owner_id);
    res.json(admins);
  } catch (error) {
    res.status(500).send({ message: 'Error while getting fired admins'});
  }
}

exports.savePermissions = async (req, res) => {
  try {
    await AdminsService.savePermissions(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}


exports.deleteAdmin = async (req, res) => {
  try {
    await AdminsService.deleteAdmin(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}

exports.addChatForAdmin = async (req, res) => {
  try {
    await AdminsService.addChatForAdmin(req.body);
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}
