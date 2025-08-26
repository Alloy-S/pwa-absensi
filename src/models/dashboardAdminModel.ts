export interface TodayAttendaceSummary {
    libur: boolean;
    hadir: number;
    datang_terlambat: number;
    pulang_cepat: number;
    datang_terlambat_pulang_cepat: number;
    izin: number;
    alpha: number;
}

export interface TotalUsers {
    user_bulanan: number;
    user_harian: number;
}