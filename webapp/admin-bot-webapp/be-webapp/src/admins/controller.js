const AdminsService = require('./service');
const colors = require("colors");

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

exports.getAdmins = async (req, res) => {
  logger.info('creators ids: ' + req.query.creators_ids)
    try {
      const admins = await AdminsService.getAdmins(req.query.creators_ids);
      logger.info(admins)
      res.json(admins);
    } catch (error) {
      logger.error(error)
      res.status(500).send({ message: 'Error while getting channels' });
    }
};

exports.getAdmin = async (req, res) => {
  logger.info('admin id: ' + req.query.id);
    try {
        const admins = await AdminsService.getAdmin(req.query.id);
        logger.info(admins)
        res.json(admins);
    } catch (error) {
      logger.error(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
}

exports.getAdminsWithSubscription = async (req, res) => {
  logger.info('user id: ' + req.query.user_id);
    try {
        const admins = await AdminsService.getAdminsWithSubscription(req.query.user_id);
        logger.info(admins)
        res.json(admins);
    } catch (error) {
      logger.error(error)
        res.status(500).send({ message: 'Error while getting channels' });
    }
}

exports.getHiredAdmins = async (req, res) => {
  logger.info('owner id: ' + req.query.owner_id);
  try {
    const admins = await AdminsService.getHiredAdmins(req.query.owner_id);
    logger.info(admins);
    res.json(admins);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: 'Error while getting hired admins'});
  }
}

exports.getHiredAdminChats = async (req, res) => {
  logger.info('hired admin id: ' + req.query.user_id);
  logger.info('owner id: ' + req.query.owner_id);
  try {
    const admins = await AdminsService.getHiredAdminChats(req.query.user_id, req.query.owner_id);
    logger.info(admins)
    res.json(admins);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: 'Error while getting fired admins'});
  }
}

exports.savePermissions = async (req, res) => {
  logger.info(req.body)
  try {
    await AdminsService.savePermissions(req.body);
    logger.info('save permissions')
    res.json('ok');
  } catch (error) {
    res.status(500).send({message: 'Error oops'})
  }
}


exports.deleteAdmin = async (req, res) => {
  logger.info(req.body)
  try {
    await AdminsService.deleteAdmin(req.body);
    logger.info('admin with id: ' + req.body.admin_id + ' was deleted')
    res.json('ok');
  } catch (error) {
    logger.error(error)
    res.status(500).send({message: 'Error oops'})
  }
}

exports.addChatForAdmin = async (req, res) => {
  logger.info(req.body)
  try {
    await AdminsService.addChatForAdmin(req.body);
    logger.info('add chat for admin: ' + req.body.user_id);
    res.json('ok');
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: 'Error oops'})
  }
}
