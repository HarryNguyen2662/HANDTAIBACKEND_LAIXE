const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { hocvienService } = require('../../services');

const createHocvien = catchAsync(async (req, res) => {
  const user = await hocvienService.createHocvien(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getHocvien = catchAsync(async (req, res) => {
  const result = await hocvienService.queryHocvien(req.body);
  res.send(result);
});

const getHocvienById = catchAsync(async (req, res) => {
  const hocvien = await hocvienService.getHocvienById(req.params.hocvienId);
  if (!hocvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hoc vien not found');
  }
  res.send(hocvien);
});

const updateHocvien = catchAsync(async (req, res) => {
  const hocvien = await hocvienService.updateHocvienById(req.params.hocvienId, req.body);
  res.send(hocvien);
});

const deleteHocvien = catchAsync(async (req, res) => {
  await hocvienService.deleteHocvienById(req.params.hocvienId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updatestudydata = catchAsync(async (req, res) => {
  const hocvien = await hocvienService.UpdateStudyData(req.params.hocvienId, req.body);
  res.send(hocvien);
});

const AuthHocvien = catchAsync(async (req, res) => {
  const hocvien = await hocvienService.AuthHocvien(req.params.mahocvien);
  if (!hocvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hoc vien not found');
  }
  res.send(hocvien);
});

const createfake = catchAsync(async (req, res) => {
  await hocvienService.createFakedata(req.body);
  res.status(httpStatus.CREATED);
});

module.exports = {
  createHocvien,
  getHocvien,
  updateHocvien,
  getHocvienById,
  deleteHocvien,
  updatestudydata,
  AuthHocvien,
  createfake,
};
