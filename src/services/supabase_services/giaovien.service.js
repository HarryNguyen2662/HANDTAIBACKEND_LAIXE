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
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data field');
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
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
  return data;
};

/**
 * Get giao vien by id
 * @param {ObjectId} id
 * @returns {Promise<giao vien>}
 */
const getGiaovienById = async (id) => {
  const { data, error } = await supabase.from('giao_vien').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id by GET method');
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

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
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
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return giaovien;
};

const queryHocvienByGiaovienId = async (giaovienId) => {
  const giaovien = await getGiaovienById(giaovienId);
  if (!giaovien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'giao vien not found');
  }
  const { data, error } = await supabase.from('giao_vien').select('*,hoc_vien(*))').eq('id', giaovienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
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
    throw new ApiError(httpStatus.NOT_FOUND, 'hoc vien not found');
  }

  return hocVienCanTim;
};

module.exports = {
  queryGiaovien,
  createGiaovien,
  getGiaovienById,
  updateGiaovienById,
  deleteGiaovienById,
  queryHocvienByGiaovienId,
  queryDataHocvienPhuTrach,
};
