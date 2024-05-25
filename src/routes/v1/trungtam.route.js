const express = require('express');
const trungtamController = require('../../controllers/supabse_controllers/trungtam.controller');

const router = express.Router();

router.route('/').post(trungtamController.createTrungtam).get(trungtamController.getTrungtam);

router
  .route('/:trungtamId')
  .get(trungtamController.getTrungtamById)
  .patch(trungtamController.updateTrungtam)
  .delete(trungtamController.deleteTrungtam);

module.exports = router;
