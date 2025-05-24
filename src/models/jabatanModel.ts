export interface Jabatan {
  id: string;
  nama: string;
  parent_id?: string;
  parent_name?: string;
}

export interface JabatanPagination {
  pages: number;
  total: number;
  items: Jabatan[];
}

export interface JabatanAll {
  items: Jabatan[];
}

export interface JabatanConvert {
  value: string;
  text: string;
}
