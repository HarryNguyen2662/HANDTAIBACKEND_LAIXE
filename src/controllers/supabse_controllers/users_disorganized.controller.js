const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { userdisorganizedService } = require('../../services');

const createUsersdisorganized = catchAsync(async (req, res) => {
  const user = await userdisorganizedService.createUsersdisorganized(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsersdisorganized = catchAsync(async (req, res) => {
  const result = await userdisorganizedService.queryUsersdisorganized(req.body);
  res.send(result);
});

const getUserdisorganizedById = catchAsync(async (req, res) => {
  const user = await userdisorganizedService.getUsersdisorganizedById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUserdisorganized = catchAsync(async (req, res) => {
  const user = await userdisorganizedService.updateUsersdisorganizedById(req.params.userId, req.body);
  res.send(user);
});

const deleteUserdisorganized = catchAsync(async (req, res) => {
  await userdisorganizedService.deleteUsersdisorganizedById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUsersdisorganized,
  getUsersdisorganized,
  getUserdisorganizedById,
  updateUserdisorganized,
  deleteUserdisorganized,
};
