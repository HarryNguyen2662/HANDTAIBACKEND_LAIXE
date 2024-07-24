const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { readFileSync } = require('node:fs');
const ApiError = require('../../utils/ApiError');
const supabase = require('../../config/supabase');

/**
 * query a datafield at hoc_vien table
 * @param {Object} hocvienBody
 * @returns {Promise<QueryResuls>}
 */
const queryHocvien = async (DataFields) => {
  const { data, error } = await supabase.from('hoc_vien').select(DataFields.field);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data filed, ${error.message}`);
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
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data to insert, ${error.message}`);
  return data;
};

/**
 * Get hoc vien by id
 * @param {ObjectId} id
 * @returns {Promise<hoc vien>}
 */
const getHocvienById = async (id) => {
  const { data, error } = await supabase.from('hoc_vien').select().eq('id', id);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, `Invalid id, ${error.message}`);
  return data;
};

/**
 * Update hoc vien by id
 * @param {ObjectId} hocvienId
 * @param {Object} updateBody
 * @returns {Promise<hoc vien>}
 */
const updateHocvienById = async (hocvienId, updateBody) => {
  const hocvien = await getHocvienById(hocvienId);
  if (!hocvien) {
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

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid data to update, ${error.message}`);
  return data;
};

/**
 * Delete hoc vien by id
 * @param {ObjectId} hocvienId
 * @returns {Promise<hocvien>}
 */
const deleteHocvienById = async (hocvienId) => {
  const hocvien = await getHocvienById(hocvienId);
  if (!hocvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'hoc vien not found');
  }
  const { error } = await supabase.from('hoc_vien').delete().eq('id', hocvienId);
  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid id, ${error.message}`);
  return hocvien;
};

const Updatedulieuhoctap = async (hocvienId, updateBody) => {
  const hocvien = await getHocvienById(hocvienId);
  if (!hocvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hoc vien not found');
  }

  const currentTimestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    timeZoneName: 'short',
  });

  const { error } = await supabase
    .from('hoc_vien')
    .update({
      du_lieu: updateBody.dulieuhoctap,
      ngay_gio_cap_nhat: currentTimestamp,
    })
    .eq('id', hocvienId)
    .select();

  if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid id or data, ${error.message}`);
  return 'Cap Nhat Thanh Cong';
};

const AuthHocvien = async (Mahocvien) => {
  const { data, error } = await supabase.from('hoc_vien').select().eq('ma_hoc_vien', Mahocvien);
  if (error != null) throw new ApiError(httpStatus.NOT_FOUND, `Invalid ma hoc vien, ${error.message}`);
  return data;
};

const createFakedata = async () => {
  for (let i = 0; i < 100; i += 1) {
    const tam = faker.number.int({ min: 0, max: 9 });
    const maHocVien = `HV${i}`;
    const maTrungTam = `TT00${tam}`;
    const maGiaoVienQuanLy = `GV00${tam}`;
    const tenHocVien = faker.internet.userName();
    const soDienThoai = faker.phone.number();
    const Email = faker.internet.email();
    const kichHoat = faker.datatype.boolean();
    const daTotNghiep = faker.datatype.boolean();
    const currentTimestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      timeZoneName: 'short',
    });

    const studydata = readFileSync(`/Users/toannguyen/backend_HandT/HocVien_Data/statistical_data_${i}.json`, null);
    // eslint-disable-next-line no-await-in-loop
    console.log(studydata);
    const { data, error } = await supabase
      .from('hoc_vien')
      .insert({
        id: uuidv4(),
        ma_hoc_vien: maHocVien,
        ma_trung_tam: maTrungTam,
        ma_giao_vien_quan_ly: maGiaoVienQuanLy,
        ten_hoc_vien: tenHocVien,
        so_dien_thoai: soDienThoai,
        email: Email,
        kich_hoat: kichHoat,
        du_lieu_hoc_tap: { du_lieu: studydata.toString() },
        ngay_gio_cap_nhat: currentTimestamp,
        da_tot_nghiep: daTotNghiep,
        ngay_tao: currentTimestamp,
      })
      .select();
    console.log(error);
    if (error != null) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid data to insert');
    console.log(data);
  }
  return 'well done';
};

module.exports = {
  queryHocvien,
  createHocvien,
  getHocvienById,
  updateHocvienById,
  deleteHocvienById,
  Updatedulieuhoctap,
  AuthHocvien,
  createFakedata,
};
