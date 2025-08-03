import api from "@/lib/axios";
import { Absensi, AbsensiByDate, AbsensiParams, RiwayatAbsensiByDateParams, RiwayatAbsensiPagination, RiwayatAbsensiParams } from "@/models/absensiModel";


export const fetchRiwayatAbsensiPagination = async (
    params: RiwayatAbsensiParams
  ): Promise<RiwayatAbsensiPagination> => {
    const response = await api.get<RiwayatAbsensiPagination>("/absensi", {
      params,
    });
    return response.data;
  };

  export const fetchDetailAbsensi = async (id: string): Promise<Absensi> => {
    const response = await api.get<Absensi>(`/absensi/${id}`);
    return response.data;
  };

  export const fetchAbsensiByDate = async (params: RiwayatAbsensiByDateParams): Promise<AbsensiByDate> => {
    const response = await api.get<AbsensiByDate>(`/absensi/by-date`, {params});
    return response.data;
  };

  export const fetchHistoryAbsensiAdmin = async (
    params: AbsensiParams
  ): Promise<RiwayatAbsensiPagination> => {
    const response = await api.get<RiwayatAbsensiPagination>("/absensi/history", {
      params,
    });
    return response.data;
  };

  export const fetchDetailAbsensiHistory = async (id: string): Promise<Absensi> => {
    const response = await api.get<Absensi>(`/absensi/history/${id}`);
    return response.data;
  };
   