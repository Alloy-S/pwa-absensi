import { JenisIzin } from "./jenisIzinModel";

export interface KuotaCuti {
  id: string;
  periode: number;
  kuota_awal: number;
  kuota_terpakai: number;
  sisa_kuota: number;
  user_id: string;
  jenis_izin: JenisIzin;
}

export interface kuotaCutiKaryawanPagination {
  user: UserKuotaCuti;
  pages: number;
  total: number;
  items: KuotaCuti[];
}

export interface UserKuotaCuti {
  id: string;
  fullname: string;
  nip: string;
  jabatan: string;
  lokasi: string;
}

export interface KuotaCutiReq {
  jenis_izin_id: string;
  periode: number;
  kuota_awal: number;
}

export interface KuotaCutiUpdateReq {
  kuota_awal: number;
  kuota_terpakai: number;
}

export function initKuotaCuti(): KuotaCuti {
  return {
    id: "",
    periode: 0,
    kuota_awal: 0,
    kuota_terpakai: 0,
    sisa_kuota: 0,
    user_id: "",
    jenis_izin: {
      id: "",
      nama: "",
      kuota_default: 0,
      periode_reset: "",
      berlaku_setelah_bulan: 0,
    },
  };
}
