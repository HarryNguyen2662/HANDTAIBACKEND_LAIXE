const express = require('express');
const giaovienController = require('../../controllers/supabse_controllers/giaovien.controller');

const router = express.Router();

router.route('/').post(giaovienController.createGiaovien).get(giaovienController.getGiaovien);

router
  .route('/:giaovienId')
  .get(giaovienController.getGiaovienById)
  .patch(giaovienController.updateGiaovien)
  .delete(giaovienController.deleteGiaovien);

router.route('/:giaovienId/listHS').get(giaovienController.getHocvienByGiaovienId);
router.route('/studydata/:giaovienId/:mahocvien').get(giaovienController.queryDataHocvien);

module.exports = router;
