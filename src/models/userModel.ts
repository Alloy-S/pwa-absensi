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
  pic_user_id: string;
  pic: string;
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
  kota_kabupaten: string;
  provinsi: string;
  negara: string;
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
      pic_user_id: "",
      pic: "",
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
      kota_kabupaten: "",
      provinsi: "",
      negara: "",
      no_telepon: "",
      nama_darurat: "",
      no_telepon_darurat: "",
      relasi_darurat: "",
    },
  };
}
