export interface HargaHarianBorongan {
    id: string;
    nama: string;
    harga_normal: number;
    is_deleted: boolean;
    date: string;
    type: string;
}

export interface HargaPagination {
  pages: number;
  total: number;
  items: HargaHarianBorongan[];
}

export interface HargaAll {
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
    is_deleted: true,
    date: new Date().toISOString().split('T')[0],
    type: "harian"
  };
}