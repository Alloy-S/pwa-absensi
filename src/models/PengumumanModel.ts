export interface Pengumuman {
    id: string;
    judul: string;
    isi: string;
    is_active: boolean;
    date_created: string;
}

export interface PengumumanReq {
    judul: string;
    isi: string;
    is_active: boolean;
}

export interface PengumumanPagination {
  pages: number;
  total: number;
  items: Pengumuman[];
}

export interface PengumumanParams {
    page?: number;
    size?: number;
    search?: string;
}

export interface LatestPengumumanList {
    items: Pengumuman[];
}