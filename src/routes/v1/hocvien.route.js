const express = require('express');
const hocvienController = require('../../controllers/supabse_controllers/hocvien.controller');

const router = express.Router();

router.route('/').post(hocvienController.createHocvien).get(hocvienController.getHocvien);

router
  .route('/:hocvienId')
  .get(hocvienController.getHocvienById)
  .patch(hocvienController.updateHocvien)
  .delete(hocvienController.deleteHocvien);

router.route('/:hocvienId').patch(hocvienController.updatestudydata);
router.route('/fakedata').post(hocvienController.createfake);

router.route('/authhocvien/:mahocvien').get(hocvienController.AuthHocvien);

module.exports = router;
