export interface KomponenGrupGaji {
  kom_id: string;
  use_kondisi: boolean;
  kode_kondisi: string;
  min_kondisi: number;
  max_kondisi: number;
  use_formula: boolean;
  kode_formula: string;
  operation_sum: string;
  nilai_uang: number;
  hitung: string;
}

export interface GrupGaji {
  id: string;
  grup_kode: string;
  grup_name: string;
  komponen: KomponenGrupGaji[];
}

export interface GrupGajiPagination {
  total: number;
  pages: number;
  items: GrupGaji[];
}

export interface GrupGajiParams {
  page?: number;
  size?: number;
  search?: string;
}

export interface KodePerhitungan {
  kode: string;
  name: string;
}

export interface GrupGajiUserItem {
  nip: string;
  fullname: string;
  jabatan: string;
}

export interface GrupGajiUser {
  grup_gaji: GrupGaji;
  list_karyawan: GrupGajiUserItem[];
}
