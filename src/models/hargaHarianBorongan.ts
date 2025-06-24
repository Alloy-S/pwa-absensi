export interface HargaHarianBorongan {
    id: string;
    nama: string;
    harga_normal: number;
    harga_lembur: number;
    jam_start_normal: string;
    jam_end_normal: string;
    toleransi_waktu: number;
    grup_id: string;
    is_deleted: boolean;
    date: string;
    type: string;
}

export interface HargaPagination {
  pages: number;
  total: number;
  items: HargaHarianBorongan[];
}

export interface HargaGrupList {
  grup: string[];
}


export function initHargaHarianBorongan(): HargaHarianBorongan {
  return {
    id: "",
    nama: "",
    harga_normal: 0,
    harga_lembur: 0,
    jam_start_normal: "00:00",
    jam_end_normal: "00:00",
    toleransi_waktu: 0,
    grup_id: "",
    is_deleted: true,
    date: new Date().toISOString().split('T')[0],
    type: "harian"
  };
}