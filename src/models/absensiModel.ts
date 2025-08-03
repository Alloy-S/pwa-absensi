export interface Absensi {
    id: string;
    date: string;
    lokasi: string;
    metode: string;
    status: string;
    user_id: string;
    tanggal: number;
    bulan: string;
    user: User;
    detail_absensi: DetailAbsensi[];
  }

  export interface User {
    id: string;
    fullname: string;
    jabatan: string;
    lokasi: string;
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

  export interface AbsensiParams {
    page?: number;
    size?: number;
    search?: string;
    "filter-status"?: string;
    "filter-month"?: string;
  }



