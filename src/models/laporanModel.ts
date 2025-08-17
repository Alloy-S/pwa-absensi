export interface RekapPeriode {
    nip: string;
    nama: string;
    tipe_karyawan: string;
    jabatan: string;
    lokasi: string;
    total_kehadiran: number;
    total_izin: number;
    total_izin_berbayar: number;
    total_izin_tidak_berbayar: number;
    total_tidak_hadir: number;
    total_absen_tidak_lengkap: number;
    total_terlambat: number;
    total_pulang_awal: number;
    total_menit_kehadiran: number;
    total_menit_terlambat: number;
    total_menit_pulang_awal: number;
    total_jam_lembur: number;
}

export interface DatangTerlambat {
    nip: string;
    nama: string;
    jabatan: string;
    lokasi: string;
    jadwal_kerja: string;
    date_absensi: string;
    waktu_absen: string;
    jadwal_time_in: string;
    menit_terlambat: number;
}

export interface KuotaCuti {
    nip: string;
    nama: string;
    periode: number;
    sisa_cuti_tahunan: number;
    total_cuti_tahunan  : number;
    cuti_tahunan_terpakai: number;
}

export interface UpahItem {
    date: string;
    upah: number;
}

export interface HeaderUpahItem {
    date: string;
    day: string;
}

export interface UpahBorongan {
    nip: string;
    nama: string;
    upah: UpahItem[];
    total_upah: number;
}

export interface LaporanParams {
    page?: number;
    size?: number;
    search?: string;
    "start-date": string;
    "end-date": string;
}

export interface LaporanCutiParams {
    page?: number;
    size?: number;
    search?: string;
    periode?: number;
}

export interface RekapPangination {
    pages: number;
    total: number;
    items: RekapPeriode[];
}

export interface DatangTerlambatPangination {
    pages: number;
    total: number;
    items: DatangTerlambat[];
}

export interface KuotaCutiPangination {
    pages: number;
    total: number;
    items: KuotaCuti[];
}

export interface UpahBoronganPangination {
    pages: number;
    total: number;
    headers: HeaderUpahItem[];
    items: UpahBorongan[];
}

export interface ExportResponse {
    filename: string;
    file: string;
}