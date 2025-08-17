export interface JenisIzin {
  id: string;
  nama: string;
  kuota_default: number;
  periode_reset: string;
  berlaku_setelah_bulan: number;
  is_paid: boolean;
}

export interface JenisIzinPagination {
  pages: number;
  total: number;
  items: JenisIzin[];
}

export interface JenisIzinParams {
  page?: number;
  size?: number;
  search?: string;
}

export interface JenisIzinReq {
  nama: string;
  kuota_default: number;
  periode_reset: string;
  berlaku_setelah_bulan: number;
}

export interface JenisIzinAll {
    items: JenisIzin[];
}
