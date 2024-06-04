const express = require('express');
const trungtamController = require('../../controllers/supabse_controllers/trungtam.controller');

const router = express.Router();

router.route('/').post(trungtamController.createTrungtam).get(trungtamController.getTrungtam);

router
  .route('/:trungtamId')
  .get(trungtamController.getTrungtamById)
  .patch(trungtamController.updateTrungtam)
  .delete(trungtamController.deleteTrungtam);

router.route('/authtrungtam/:matrungtam').get(trungtamController.AuthTrungtam);
router.route('/:trungtamId/listHS').get(trungtamController.getHocvienByTrungtamId);
router.route('/:trungtamId/listGV').get(trungtamController.getGiaovienByTrungtamId);

module.exports = router;
