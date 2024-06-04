const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a datafield at giao_vien table
 * @param {Object} giaovienBody
 * @returns {Promise<QueryResuls>}
 */
const queryGiaovien = async (DataFields) => {
  const { data, error } = await supabase.from('giao_vien').select(DataFields.field);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data field, ${error.message}`);
  return data;
};

/**
 * Create a giao vien
 * @param {Object} giaovienBody
 * @returns {Promise<giao vien>}
 */
const createGiaovien = async (giaovienBody) => {
  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });
  const { data, error } = await supabase
    .from('giao_vien')
    .insert({
      id: uuidv4(),
      ma_trung_tam: giaovienBody.matrungtam,
      ma_giao_vien: giaovienBody.magiaovien,
      ten_giao_vien: giaovienBody.tengiaovien,
      so_dien_thoai: giaovienBody.sodienthoai,
      ghi_chu: giaovienBody.ghichu,
      ngay_tao: currentTimestamp,
      ngay_cap_nhat: currentTimestamp,
    })
    .select();
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data to insert, ${error.message}`);
  return data;
};

/**
 * Get giao vien by id
 * @param {ObjectId} id
 * @returns {Promise<giao vien>}
 */
const getGiaovienById = async (id) => {
  const { data, error } = await supabase.from('giao_vien').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, `Invalid id by GET method, ${error.message}`);
  return data;
};
/**
 * Update giao vien by id
 * @param {ObjectId} giaovienId
 * @param {Object} updateBody
 * @returns {Promise<giao vien>}
 */
const updateGiaovienById = async (giaovienId, updateBody) => {
  const giaovien = await getGiaovienById(giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Giao vien not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { data, error } = await supabase
    .from('giao_vien')
    .update({
      ma_trung_tam: updateBody.matrungtam,
      ma_giao_vien: updateBody.magiaovien,
      ten_giao_vien: updateBody.tengiaovien,
      so_dien_thoai: updateBody.sodienthoai,
      ghi_chu: updateBody.ghichu,
      ngay_cap_nhat: currentTimestamp,
    })
    .eq('id', giaovienId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data to update, ${error.message}`);
  return data;
};

/**
 * Delete giao vien by id
 * @param {ObjectId} giaovienId
 * @returns {Promise<giao vien>}
 */
const deleteGiaovienById = async (giaovienId) => {
  const giaovien = await getGiaovienById(giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'giao vien not found');
  }
  const { error } = await supabase.from('giao_vien').delete().eq('id', giaovienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid id, ${error.message}`);
  return giaovien;
};

const queryHocvienByGiaovienId = async (giaovienId) => {
  const giaovien = await getGiaovienById(giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'giao vien not found');
  }
  const { data, error } = await supabase.from('giao_vien').select('*,hoc_vien(*))').eq('id', giaovienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid id, ${error.message}`);
  const hocVienArray = data[0].hoc_vien;
  return hocVienArray;
};

const queryDataHocvienPhuTrach = async (giaovienId, mahocvien) => {
  const giaovien = await getGiaovienById(giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'giao vien not found');
  }
  const { data, error } = await supabase.from('giao_vien').select('*,hoc_vien(*))').eq('id', giaovienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  const hocVienArray = data[0].hoc_vien;
  const hocVienCanTim = hocVienArray.find((hocVien) => hocVien.ma_hoc_vien === mahocvien);

  if (!hocVienCanTim) {
    throw new ApiError(httpStatus.NOT_FOUND, `hoc vien not found, ${error.message}`);
  }

  return hocVienCanTim;
};

const AuthGiaovien = async (Magiaovien) => {
  const { data, error } = await supabase.from('giao_vien').select().eq('ma_hoc_vien', Magiaovien);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, `Invalid ma giao vien, ${error.message}`);
  return data;
};

module.exports = {
  queryGiaovien,
  createGiaovien,
  getGiaovienById,
  updateGiaovienById,
  deleteGiaovienById,
  queryHocvienByGiaovienId,
  queryDataHocvienPhuTrach,
  AuthGiaovien,
};
