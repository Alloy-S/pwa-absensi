export interface JadwalKerja {
    id: string;
    kode: string;
    shift: string;
    is_active: boolean;
    migrate_data: boolean;
    detail_jadwal_kerja: DetailJadwalKerja[];
}

export interface DetailJadwalKerja {
    id: string;
    hari: string;
    time_in: string;
    time_out: string;
    toler_in: number;
    toler_out: number;
    is_active: boolean;
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
    migrate_data: true,
    is_active: true,
    detail_jadwal_kerja: [],
  };
}