export interface Perusahaan {
    nama: string;
    alamat: string;
    kota_kabupaten: string;
    provinsi: string;
    negara: string;
    no_telepon: string;
    kode_pos: string;
  }

export function initPerusahaan(): Perusahaan {
  return {
    nama: "",
    alamat: "",
    kota_kabupaten: "",
    provinsi: "",
    negara: "",
    no_telepon: "",
    kode_pos: "",
  }
}