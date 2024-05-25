const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { trungtamService } = require('../../services');

const createTrungtam = catchAsync(async (req, res) => {
  const user = await trungtamService.createTrungtam(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getTrungtam = catchAsync(async (req, res) => {
  const result = await trungtamService.queryTrungtam(req.body);
  res.send(result);
});

const getTrungtamById = catchAsync(async (req, res) => {
  const trungtam = await trungtamService.getTrungtamById(req.params.trungtamId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trung tam not found');
  }
  res.send(trungtam);
});

const updateTrungtam = catchAsync(async (req, res) => {
  const trungtam = await trungtamService.updateTrungtamById(req.params.trungtamId, req.body);
  res.send(trungtam);
});

const deleteTrungtam = catchAsync(async (req, res) => {
  await trungtamService.deleteTrungtamById(req.params.trungtamId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTrungtam,
  getTrungtam,
  updateTrungtam,
  getTrungtamById,
  deleteTrungtam,
};
