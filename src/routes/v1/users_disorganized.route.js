const express = require('express');
const usersDisorganizedController = require('../../controllers/supabse_controllers/users_disorganized.controller');

const router = express.Router();

router
  .route('/')
  .post(usersDisorganizedController.createUsersdisorganized)
  .get(usersDisorganizedController.getUsersdisorganized);

router
  .route('/:userId')
  .get(usersDisorganizedController.getUserdisorganizedById)
  .patch(usersDisorganizedController.updateUserdisorganized)
  .delete(usersDisorganizedController.deleteUserdisorganized);

module.exports = router;
