export interface RiwayatPenggajianRincian {
    komponen: string;
    tipe: string;
    jumlah: number;
    nilai_a: number;
    nilai_b: number;
    operasi: string;
}

export interface RiwayatPenggajianDetail {
    total_tunjangan: number;
    total_potongan: number;
    gaji: number;
    user_id: string;
    user: string;
    riwayat_penggajian_rincian: RiwayatPenggajianRincian[];
}


export interface RiwayatPenggajian {
    id: string;
    periode_start: string;
    periode_end: string;
    status: string;
    total_karyawan: number;
    total_gaji_keseluruhan: number;
    created_by: string;
    grup_gaji: string;
    riwayat_penggajian_detail: RiwayatPenggajianDetail[];
}

export interface RiwayatPenggajianPaginationItem {
    id: string;
    periode_start: string;
    periode_end: string;
    status: string;
    grup_name: string;
}

export interface RiwayatPenggajianPagination {
    pages: number;
    total: number;
    items: RiwayatPenggajianPaginationItem[];
}

export interface RiwayatPenggajianParams {
    page?: number;
    size?: number;
    "periode-start"?: string;
    "periode-end"?: string;
    status?: string;
    "grup-gaji"?: string;
}

