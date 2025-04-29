export interface JadwalKerja {
    id: string;
    kode: string;
    shift: string;
    is_same_hour: boolean;
    detail_jadwal_kerja: DetailJadwalKerja[];
}

export interface DetailJadwalKerja {
    id: string;
    hari: string;
    time_in: string;
    time_out: string;
    toler_in: number;
    toler_out: number;
}

export interface JadwalKerjaPagination {
  pages: number;
  total: number;
  items: JadwalKerja[];
}

export interface JadwalAll {
  items: JadwalKerja[];
}

export function initJadwalKerja(): JadwalKerja {
  return {
    id: "",
    kode: "",
    shift: "",
    is_same_hour: false,
    detail_jadwal_kerja: [],
  };
}