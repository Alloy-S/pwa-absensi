export interface KomponenGaji {
  id: string;
  kom_kode: string;
  kom_name: string;
  no_urut: number;
  tipe: string;
}

export interface KomGajiPagination {
  pages: number;
  total: number;
  items: KomponenGaji[];
}

export interface KomGajiParams {
  page?: number;
  size?: number;
  search?: string;
}
