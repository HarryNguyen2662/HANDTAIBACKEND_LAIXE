const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a user disorganized
 * @param {Object} userBody
 * @returns {Promise<Usersdisorganized>}
 */
const queryUsersdisorganized = async (DataFields) => {
  console.log(DataFields.field);
  const { data, error } = await supabase.from('users_disorganized').select(DataFields.field);
  console.log(error);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data field');
  return data;
};

/**
 * Create a user disorganized
 * @param {Object} userBody
 * @returns {Promise<Usersdisorganized>}
 */
const createUsersdisorganized = async (userBody) => {
  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });
  // Output: '5/18/2023, 10:43:35 AM +07'
  const { data, error } = await supabase
    .from('users_disorganized')
    .insert([
      {
        id: uuidv4(),
        apple_id: userBody.apple_id,
        google_play_id: userBody.google_play_id,
        study_data: userBody.study_data,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
      },
    ])
    .select();
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
  return data;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Usersdisorganized>}
 */
const getUsersdisorganizedById = async (id) => {
  const { data, error } = await supabase.from('users_disorganized').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id');
  return data;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUsersdisorganizedById = async (userId, updateBody) => {
  const user = await getUsersdisorganizedById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { data, error } = await supabase
    .from('users_disorganized')
    .update({
      apple_id: updateBody.apple_id,
      google_play_id: updateBody.google_play_id,
      study_data: updateBody.study_data,
      created_at: updateBody.created_at,
      updated_at: currentTimestamp,
    })
    .eq('id', userId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return data;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUsersdisorganizedById = async (userId) => {
  const user = await getUsersdisorganizedById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const { error } = await supabase.from('countries').delete().eq('id', userId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return user;
};

module.exports = {
  queryUsersdisorganized,
  createUsersdisorganized,
  getUsersdisorganizedById,
  updateUsersdisorganizedById,
  deleteUsersdisorganizedById,
};
