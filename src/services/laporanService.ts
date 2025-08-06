import api from "@/lib/axios";
import { RekapPangination, LaporanParams, DatangTerlambatPangination, LaporanCutiParams, KuotaCutiPangination } from "@/models/laporanModel";


export const fetchRekapPeriodePagination = async (
  params: LaporanParams
): Promise<RekapPangination> => {
  const response = await api.get<RekapPangination>("/laporan/rekap-periode", {
    params,
  });
  return response.data;
};

export const fetchDatangTerlambatPagination = async (
  params: LaporanParams
): Promise<DatangTerlambatPangination> => {
  const response = await api.get<DatangTerlambatPangination>("/laporan/datang-terlambat", {
    params,
  });
  return response.data;
};

export const fetchLaporanKuotaCutiPagination = async (
  params: LaporanCutiParams
): Promise<KuotaCutiPangination> => {
  const response = await api.get<KuotaCutiPangination>("/laporan/kuota-cuti", {
    params,
  });
  return response.data;
};