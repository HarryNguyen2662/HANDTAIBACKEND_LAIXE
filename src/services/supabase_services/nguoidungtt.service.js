const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a datafield at nguoidungtt table
 * @param {Object} nguoidungttBody
 * @returns {Promise<QueryResuls>}
 */
const queryNguoidungtt = async (DataFields) => {
  const { data, error } = await supabase.from('nguoi_dung_thong_thuong').select(DataFields.field);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data field');
  return data;
};

/**
 * Create a nguoi dung tt
 * @param {Object} nguoidungttBody
 * @returns {Promise<nguoi dung tt>}
 */
const createNguoidungtt = async (nguoidungttBody) => {
  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });
  const { data, error } = await supabase
    .from('nguoi_dung_thong_thuong')
    .insert({
      id: uuidv4(),
      ma_may: nguoidungttBody.mamay,
      he_dieu_hanh: nguoidungttBody.hedieuhanh,
      du_lieu_hoc_tap: nguoidungttBody.dulieuhoctap,
      ngay_tao: currentTimestamp,
      ngay_cap_nhat: currentTimestamp,
    })
    .select();
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
  return data;
};

/**
 * Get nguoi_dung_tt by id
 * @param {ObjectId} id
 * @returns {Promise<nguoi dung tt>}
 */
const getNguoidungttById = async (id) => {
  const { data, error } = await supabase.from('nguoi_dung_thong_thuong').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id');
  return data;
};

/**
 * Update nguoi dung tt by id
 * @param {ObjectId} nguoidungttId
 * @param {Object} updateBody
 * @returns {Promise<nguoidungtt>}
 */
const updateNguoidungttById = async (nguoidungttId, updateBody) => {
  const nguoidungtt = await getNguoidungttById(nguoidungttId);
  if (!nguoidungtt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nguoi dung not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { data, error } = await supabase
    .from('nguoi_dung_thong_thuong')
    .update({
      ma_may: updateBody.mamay,
      he_dieu_hanh: updateBody.hedieuhanh,
      du_lieu_hoc_tap: updateBody.dulieuhoctap,
      ngay_cap_nhat: currentTimestamp,
    })
    .eq('id', nguoidungttId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return data;
};

/**
 * Delete nguoidung tt by id
 * @param {ObjectId} trungtamId
 * @returns {Promise<trung tam>}
 */
const deleteNguoidungttById = async (nguoidungttId) => {
  const nguoidungtt = await getNguoidungttById(nguoidungttId);
  if (!nguoidungtt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nguoi dung not found');
  }
  const { error } = await supabase.from('nguoi_dung_thong_thuong').delete().eq('id', nguoidungttId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return nguoidungtt;
};

module.exports = {
  queryNguoidungtt,
  createNguoidungtt,
  updateNguoidungttById,
  getNguoidungttById,
  deleteNguoidungttById,
};
