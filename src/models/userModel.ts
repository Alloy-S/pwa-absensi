export interface DataKaryawan {
  id: string;
  nip: string;
  tgl_gabung: string;
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
  };
}

export function validateUserField(user: User) {
  const errors: String[] = [];

  // Validasi umum
  if (!user.fullname.trim()) errors.push("Nama lengkap tidak boleh kosong");
  // if (!user.username.trim()) errors.push("Username tidak boleh kosong");
  if (!user.phone.trim()) errors.push("Nomor telepon tidak boleh kosong");
  // if (!user.password.trim()) errors.push("Password tidak boleh kosong");
  // if (!user.role_id.trim()) errors.push("Role harus dipilih");

  // Validasi data_karyawan
  const karyawan = user.data_karyawan;
  // if (!karyawan.nip.trim()) errors.push("NIP tidak boleh kosong");
  if (!karyawan.tgl_gabung.trim())
    errors.push("Tanggal gabung tidak boleh kosong");
  // if (!karyawan.lokasi_kerja.trim()) errors.push("Lokasi kerja tidak boleh kosong");
  if (!karyawan.tipe_karyawan.trim())
    errors.push("Tipe karyawan tidak boleh kosong");
  if (!karyawan.jabatan_id.trim()) errors.push("Jabatan harus dipilih");
  if (!karyawan.jadwal_kerja_id.trim())
    errors.push("Jadwal kerja harus dipilih");
  if (!karyawan.lokasi_id.trim()) errors.push("Lokasi harus dipilih");

  // Validasi data_pribadi
  const pribadi = user.data_pribadi;
  if (!pribadi.gender.trim()) errors.push("Jenis kelamin tidak boleh kosong");
  if (!pribadi.tgl_lahir.trim())
    errors.push("Tanggal lahir tidak boleh kosong");
  if (!pribadi.tmpt_lahir.trim())
    errors.push("Tempat lahir tidak boleh kosong");
  if (!pribadi.status_kawin.trim())
    errors.push("Status kawin tidak boleh kosong");
  if (!pribadi.agama.trim()) errors.push("Agama tidak boleh kosong");

  // Validasi data_kontak
  const kontak = user.data_kontak;
  if (!kontak.alamat.trim()) errors.push("Alamat tidak boleh kosong");
  if (!kontak.no_telepon.trim()) errors.push("No telepon tidak boleh kosong");
  // if (!kontak.nama_darurat.trim()) errors.push("Nama darurat tidak boleh kosong");
  // if (!kontak.no_telepon_darurat.trim()) errors.push("No telepon darurat tidak boleh kosong");
  // if (!kontak.relasi_darurat.trim()) errors.push("Relasi darurat tidak boleh kosong");

  return errors;
}
