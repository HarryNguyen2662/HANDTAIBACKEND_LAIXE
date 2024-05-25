const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a datafield at hoc_vien table
 * @param {Object} hocvienBody
 * @returns {Promise<QueryResuls>}
 */
const queryHocvien = async (DataFields) => {
  const { data, error } = await supabase.from('hoc_vien').select(DataFields.field);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data field');
  return data;
};

/**
 * Create a hoc vien
 * @param {Object} hocvienBody
 * @returns {Promise<hoc vien>}
 */
const createHocvien = async (hocvienBody) => {
  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });
  const { data, error } = await supabase
    .from('hoc_vien')
    .insert({
      id: uuidv4(),
      ma_hoc_vien: hocvienBody.mahocvien,
      ma_trung_tam: hocvienBody.matrungtam,
      ma_giao_vien_quan_ly: hocvienBody.magiaovienquanly,
      ten_hoc_vien: hocvienBody.tenhocvien,
      so_dien_thoai: hocvienBody.sodienthoai,
      email: hocvienBody.email,
      kich_hoat: hocvienBody.kichhoat,
      du_lieu_hoc_tap: hocvienBody.dulieuhoctap,
      ngay_gio_cap_nhat: currentTimestamp,
      da_tot_nghiep: hocvienBody.datotnghiep,
      ngay_tao: currentTimestamp,
    })
    .select();
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
  return data;
};

/**
 * Get hoc vien by id
 * @param {ObjectId} id
 * @returns {Promise<hoc vien>}
 */
const getHocvienById = async (id) => {
  const { data, error } = await supabase.from('hoc_vien').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid id');
  return data;
};

/**
 * Update hoc vien by id
 * @param {ObjectId} hocvienId
 * @param {Object} updateBody
 * @returns {Promise<hoc vien>}
 */
const updateHocvienById = async (hocvienId, updateBody) => {
  const trungtam = await getHocvienById(hocvienId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hoc vien not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { data, error } = await supabase
    .from('hoc_vien')
    .update({
      ma_hoc_vien: updateBody.mahocvien,
      ma_trung_tam: updateBody.matrungtam,
      ma_giao_vien_quan_ly: updateBody.magiaovienquanly,
      ten_hoc_vien: updateBody.tenhocvien,
      so_dien_thoai: updateBody.sodienthoai,
      email: updateBody.email,
      kich_hoat: updateBody.kichhoat,
      du_lieu_hoc_tap: updateBody.dulieuhoctap,
      ngay_gio_cap_nhat: currentTimestamp,
      da_tot_nghiep: updateBody.datotnghiep,
    })
    .eq('id', hocvienId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return data;
};

/**
 * Delete hoc vien by id
 * @param {ObjectId} hocvienId
 * @returns {Promise<hocvien>}
 */
const deleteHocvienById = async (hocvienId) => {
  const trungtam = await getHocvienById(hocvienId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'trung tam not found');
  }
  const { error } = await supabase.from('hoc_vien').delete().eq('id', hocvienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return trungtam;
};

const UpdateStudyData = async (hocvienId, updateBody) => {
  const trungtam = await getHocvienById(hocvienId);
  if (!trungtam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hoc vien not found');
  }

  const { error } = await supabase
    .from('hoc_vien')
    .update({
      du_lieu_hoc_tap: updateBody.dulieuhoctap,
    })
    .eq('id', hocvienId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid id');
  return 'Cap Nhat Thanh Cong';
};

const AuthHocvien = async (Mahocvien) => {
  const { data, error } = await supabase.from('hoc_vien').select().eq('ma_hoc_vien', Mahocvien);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid ma hoc vien');
  return data;
};

module.exports = {
  queryHocvien,
  createHocvien,
  getHocvienById,
  updateHocvienById,
  deleteHocvienById,
  UpdateStudyData,
  AuthHocvien,
};
