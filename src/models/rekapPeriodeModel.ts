export interface RekapPeriode {
    nip: string;
    nama: string;
    tipe_karyawan: string;
    jabatan: string;
    lokasi: string;
    total_kehadiran: number;
    total_izin: number;
    total_tidak_hadir: number;
    total_absen_tidak_lengkap: number;
    total_terlambat: number;
    total_pulang_awal: number;
    total_menit_kehadiran: number;
    total_menit_terlambat: number;
    total_menit_pulang_awal: number;
}

export interface RekapPeriodeParams {
    page?: number;
    size?: number;
    search?: string;
    "start-date": string;
    "end-date": string;
}

export interface RekapPangination {
    pages: number;
    total: number;
    items: RekapPeriode[];
}