const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { giaovienService } = require('../../services');

const createGiaovien = catchAsync(async (req, res) => {
  const user = await giaovienService.createGiaovien(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getGiaovien = catchAsync(async (req, res) => {
  const result = await giaovienService.queryGiaovien(req.body);
  res.send(result);
});

const getGiaovienById = catchAsync(async (req, res) => {
  const giaovien = await giaovienService.getGiaovienById(req.params.giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trung tam not found');
  }
  res.send(giaovien);
});

const updateGiaovien = catchAsync(async (req, res) => {
  const giaovien = await giaovienService.updateGiaovienById(req.params.giaovienId, req.body);
  res.send(giaovien);
});

const deleteGiaovien = catchAsync(async (req, res) => {
  await giaovienService.deleteGiaovienById(req.params.giaovienId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getHocvienByGiaovienId = catchAsync(async (req, res) => {
  const result = await giaovienService.queryHocvienByGiaovienId(req.params.giaovienId);
  res.send(result);
});

const queryDataHocvien = catchAsync(async (req, res) => {
  const dulieuhoctap = await giaovienService.queryDataHocvienPhuTrach(req.params.giaovienId, req.params.mahocvien);
  res.send(dulieuhoctap);
});

module.exports = {
  createGiaovien,
  getGiaovien,
  updateGiaovien,
  getGiaovienById,
  deleteGiaovien,
  getHocvienByGiaovienId,
  queryDataHocvien,
};
