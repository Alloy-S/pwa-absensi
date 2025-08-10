import api from "@/lib/axios";
import {
  RekapPangination,
  LaporanParams,
  DatangTerlambatPangination,
  LaporanCutiParams,
  KuotaCutiPangination,
  UpahBoronganPangination,
  ExportResponse,
} from "@/models/laporanModel";

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
  const response = await api.get<DatangTerlambatPangination>(
    "/laporan/datang-terlambat",
    {
      params,
    }
  );
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

export const fetchUpahBoronganPagination = async (
  params: LaporanCutiParams
): Promise<UpahBoronganPangination> => {
  const response = await api.get<UpahBoronganPangination>(
    "/laporan/upah-borongan",
    {
      params,
    }
  );
  return response.data;
};

export const ExportUpahBorongan = async (params: {
  "start-date": string;
  "end-date": string;
}): Promise<ExportResponse> => {
  const response = await api.get<ExportResponse>(
    "/laporan/export/upah-borongan",
    {
      params,
    }
  );
  return response.data;
};

export const ExportRekapFull = async (params: {
  "start-date": string;
  "end-date": string;
}): Promise<ExportResponse> => {
  const response = await api.get<ExportResponse>(
    "/laporan/export/rekap-full",
    {
      params,
    }
  );
  return response.data;
};
