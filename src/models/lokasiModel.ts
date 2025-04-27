export interface Lokasi {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    toleransi: number
  }

export interface LokasiPagination {
  pages: number;
  total: number;
  items: Lokasi[];
}

export interface LokasiAll {
  items: Lokasi[];
}


export function initLokasi(): Lokasi {
  return {
    id: "",
    name: "",
    longitude: 0,
    latitude: 0,
    toleransi: 0
  };
}