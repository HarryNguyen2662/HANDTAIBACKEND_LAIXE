const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { nguoidungttService } = require('../../services');

const createNguoidungtt = catchAsync(async (req, res) => {
  const user = await nguoidungttService.createNguoidungtt(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getNguoidungtt = catchAsync(async (req, res) => {
  const result = await nguoidungttService.queryNguoidungtt(req.body);
  res.send(result);
});

const getNguoidungttById = catchAsync(async (req, res) => {
  const nguoidungtt = await nguoidungttService.getNguoidungttById(req.params.nguoidungttId);
  if (!nguoidungtt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trung tam not found');
  }
  res.send(nguoidungtt);
});

const updateNguoidungtt = catchAsync(async (req, res) => {
  const nguoidungtt = await nguoidungttService.updateNguoidungttById(req.params.nguoidungttId, req.body);
  res.send(nguoidungtt);
});

const deleteNguoidungtt = catchAsync(async (req, res) => {
  await nguoidungttService.deleteNguoidungttById(req.params.nguoidungttId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNguoidungtt,
  getNguoidungtt,
  updateNguoidungtt,
  getNguoidungttById,
  deleteNguoidungtt,
};
