import { ApprovalItem } from "./dashboardUserModel";

export interface DataKaryawan {
  id: string;
  nip: string;
  tgl_gabung: string;
  gaji_pokok: number;
  lokasi_kerja: string;
  tipe_karyawan: string;
  jabatan_id: string;
  jabatan: string;
  jadwal_kerja_id: string;
  jadwal_kerja: string;
  lokasi_id: string;
  lokasi: string;
  user_pic_id: string;
  user_pic_name: string;
  grup_gaji_id: string;
}

export interface DataPribadi {
  id: string;
  gender: string;
  tgl_lahir: string;
  tmpt_lahir: string;
  status_kawin: string;
  agama: string;
  gol_darah: string;
}

export interface DataKontak {
  id: string;
  alamat: string;
  no_telepon: string;
  nama_darurat: string;
  no_telepon_darurat: string;
  relasi_darurat: string;
}

export interface User {
  id: string;
  fullname: string;
  username: string;
  phone: string;
  password: string;
  role_id: string;
  role: string;
  data_karyawan: DataKaryawan;
  data_pribadi: DataPribadi;
  data_kontak: DataKontak;
}

export interface UserPosiblePIC {
  id: string;
  fullname: string;
  jabatan: string;
}

export interface KaryawanPagination {
  pages: number;
  total: number;
  items: Karyawan[];
}

export interface KaryawanKuotaCutiPagination {
  pages: number;
  total: number;
  items: KaryawanKuota[];
}

export interface KaryawanKuota {
  id: string;
  fullname: string;
  sisa_cuti_tahunan: number;
  total_cuti_tahunan: number;
}

export interface Karyawan {
  id: string;
  username: string;
  fullname: string;
  lokasi: string;
  jabatan: string;
  status: string;
  role: string;
  sisa_cuti_tahunan: number;
  total_kuota_tahunan: number;
}

export interface ResetPasswordRequest {
  old_pass: string;
  new_pass: string;
  verify_pass: string;
}

export interface UpdateFCMTokenRequest {
  fcm_token: string;
}

export interface registerFaceRequest {
  image: string;
}

export interface CheckFaceStatusResponse {
  username: string;
  face_registration_status: boolean;
}

export interface UserByPic {
  items: UserByPicItem[];
}

export interface UserByPicItem {
  id: string;
  fullname: string;
  nip: string;
  tgl_gabung: string;
}

export interface UserData {
  fullname: string;
  username: string;
  userRole: string;
}

export interface AllApprovalPagination {
  pages: number;
  total: number;
  items: ApprovalPICItem[];
}

export interface ApprovalPICItem extends ApprovalItem {
  user: string;
}

export interface AllApprovalParams {
  page?: number;
  size?: number;
  "filter-tipe-approval": string;
}

export function initUser(): User {
  return {
    id: "",
    fullname: "",
    username: "",
    phone: "",
    password: "",
    role_id: "",
    role: "",
    data_karyawan: {
      id: "",
      nip: "",
      tgl_gabung: "",
      gaji_pokok: null,
      lokasi_kerja: "",
      tipe_karyawan: "",
      jabatan_id: "",
      jabatan: "",
      jadwal_kerja_id: "",
      jadwal_kerja: "",
      lokasi_id: "",
      lokasi: "",
      user_pic_id: "",
      user_pic_name: "",
      grup_gaji_id: "",
    },
    data_pribadi: {
      id: "",
      gender: "",
      tgl_lahir: "",
      tmpt_lahir: "",
      status_kawin: "",
      agama: "",
      gol_darah: "",
    },
    data_kontak: {
      id: "",
      alamat: "",
      no_telepon: "",
      nama_darurat: "",
      no_telepon_darurat: "",
      relasi_darurat: "",
    },
  };
}

export function initDataKontak(): DataKontak {
  return {
    id: "",
    alamat: "",
    no_telepon: "",
    nama_darurat: "",
    no_telepon_darurat: "",
    relasi_darurat: "",
  };
}

export function initDataPribadi(): DataPribadi {
  return {
    id: "",
    gender: "",
    tgl_lahir: "",
    tmpt_lahir: "",
    status_kawin: "",
    agama: "",
    gol_darah: "",
  };
}

export function initDataKaryawan(): DataKaryawan {
  return {
    id: "",
    nip: "",
    tgl_gabung: "",
    gaji_pokok: null,
    lokasi_kerja: "",
    tipe_karyawan: "",
    jabatan_id: "",
    jabatan: "",
    jadwal_kerja_id: "",
    jadwal_kerja: "",
    lokasi_id: "",
    lokasi: "",
    user_pic_id: "",
    user_pic_name: "",
    grup_gaji_id: "",
  };
}

export function validateUserField(user: User) {
  const errors: String[] = [];

  const pribadi = user.data_pribadi;
  if (!pribadi.tgl_lahir) errors.push("Tgl Lahir harus dipilih");

  const karyawan = user.data_karyawan;
  if (!karyawan.tgl_gabung) errors.push("Tgl Gabung harus dipilih");
  if (!karyawan.jabatan_id.trim()) errors.push("Jabatan harus dipilih");
  if (!karyawan.lokasi_id.trim()) errors.push("Lokasi harus dipilih");

  return errors;
}
