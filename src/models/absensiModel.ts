export interface Absensi {
    id: string;
    date: string;
    lokasi: string;
    metode: string;
    status: string;
    user_id: string;
    tanggal: number;
    bulan: string;
    detail_absensi: DetailAbsensi[];
  }

  export interface DetailAbsensi {
    id: string;
    date: string;
    type: string;
    status_appv: string;
    status_absensi: string;
    longitude: string;
    latitude: number;
    catatan: string;
  }
  
  export interface RiwayatAbsensiPagination {
    pages: number;
    total: number;
    items: Absensi[];
  }

  export interface RiwayatAbsensiParams {
    page?: number;
    size?: number;
    search?: string;
  }

  export interface RiwayatAbsensiByDateParams {
    date?: string;
  }

  export interface AbsensiByDate {
    date: string;
    absensi_id?: string;
    time_in?: string;
    time_out?: string;
  }



