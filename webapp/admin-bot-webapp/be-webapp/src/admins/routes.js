const express = require('express'),
    router = express.Router(),
    AdminsController = require('./controller');

const multer = require('multer');

const upload = multer();

router
    .route('/all-subscription')
    .get(AdminsController.getAdminsWithSubscription)

router
    .route('/all')
    .get(AdminsController.getAdmins)

router
    .route('/one')
    .get(AdminsController.getAdmin)

router
  .route('/hired-admins')
  .get(AdminsController.getHiredAdmins)

router
  .route('/save-admin-permissions')
  .post(upload.any(), AdminsController.savePermissions)

router
  .route('/delete')
  .post(upload.any(), AdminsController.deleteAdmin)

router
  .route('/add-chat')
  .post(upload.any(), AdminsController.addChatForAdmin)

router
  .route('/get-chats')
  .get(AdminsController.getHiredAdminChats)

module.exports = router;
