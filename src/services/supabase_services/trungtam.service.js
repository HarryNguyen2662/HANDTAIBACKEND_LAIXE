const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a datafield at trung_tam table
 * @param {Object} trungtamBody
 * @returns {Promise<QueryResuls>}
 */
const queryTrungtam = async (DataFields) => {
  const { data, error } = await supabase.from('trung_tam').select(DataFields.field);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data field');
  return data;
};

/**
 * Create a trung tam
 * @param {Object} trungtamBody
 * @returns {Promise<trung tam>}
 */
const createTrungtam = async (trungtamBody) => {
  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });
  const { data, error } = await supabase
    .from('trung_tam')
    .insert({
      id: uuidv4(),
      ma_trung_tam: trungtamBody.matrungtam,
      ten_trung_tam: trungtamBody.tentrungtam,
      dia_chi: trungtamBody.diachi,
      so_dien_thoai: trungtamBody.sodienthoai,
      email: trungtamBody.email,
      website: trungtamBody.urlwebsite,
      ngay_cong_tac: trungtamBody.ngaycongtac,
      ghi_chu: trungtamBody.ghichu,
      ngay_tao: currentTimestamp,
      ngay_cap_nhat: currentTimestamp,
    })
    .select();
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
  return data;
};

/**
 * Get trung tam by id
 * @param {ObjectId} id
 * @returns {Promise<Trung tam>}
 */
const getTrungtamById = async (id) => {
  const { data, error } = await supabase.from('trung_tam').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id');
  return data;
};

/**
 * Update trung tam by id
 * @param {ObjectId} trungtamId
 * @param {Object} updateBody
 * @returns {Promise<trung tam>}
 */
const updateTrungtamById = async (trungtamId, updateBody) => {
  const trungtam = await getTrungtamById(trungtamId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trung tam not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { data, error } = await supabase
    .from('trung_tam')
    .update({
      ma_trung_tam: updateBody.matrungtam,
      ten_trung_tam: updateBody.tentrungtam,
      dia_chi: updateBody.diachi,
      so_dien_thoai: updateBody.sodienthoai,
      email: updateBody.email,
      website: updateBody.urlwebsite,
      ngay_cong_tac: updateBody.ngaycongtac,
      ghi_chu: updateBody.ghichu,
      ngay_cap_nhat: currentTimestamp,
    })
    .eq('id', trungtamId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return data;
};

/**
 * Delete trung tam by id
 * @param {ObjectId} trungtamId
 * @returns {Promise<trung tam>}
 */
const deleteTrungtamById = async (trungtamId) => {
  const trungtam = await getTrungtamById(trungtamId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'trung tam not found');
  }
  const { error } = await supabase.from('trung_tam').delete().eq('id', trungtamId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return trungtam;
};

module.exports = {
  queryTrungtam,
  createTrungtam,
  getTrungtamById,
  updateTrungtamById,
  deleteTrungtamById,
};
