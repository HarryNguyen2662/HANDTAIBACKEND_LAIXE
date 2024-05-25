const express = require('express');
const nguoidungttController = require('../../controllers/supabse_controllers/nguoidungtt.controller');

const router = express.Router();

router.route('/').post(nguoidungttController.createNguoidungtt).get(nguoidungttController.getNguoidungtt);

router
  .route('/:nguoidungttId')
  .get(nguoidungttController.getNguoidungttById)
  .patch(nguoidungttController.updateNguoidungtt)
  .delete(nguoidungttController.deleteNguoidungtt);

module.exports = router;
