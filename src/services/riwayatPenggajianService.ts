import api from "@/lib/axios";
import { RiwayatAbsensiParams } from "@/models/absensiModel";
import { ExportResponse } from "@/models/laporanModel";
import {
  RiwayatPenggajian,
  RiwayatPenggajianPagination,
} from "@/models/riwayatPenggajianModel";

export const fetchRiwayatPenggajianPagination = async (
  params: RiwayatAbsensiParams
): Promise<RiwayatPenggajianPagination> => {
  const response = await api.get<RiwayatPenggajianPagination>(
    "/riwayat-penggajian",
    {
      params,
    }
  );
  return response.data;
};

export const fetchRiwayatPenggajianById = async (
  id: string
): Promise<RiwayatPenggajian> => {
  const response = await api.get<RiwayatPenggajian>(
    `/riwayat-penggajian/${id}`
  );
  return response.data;
};

export const FinalisasiRiwayatPenggajianById = async (id: string) => {
  const response = await api.post(`/riwayat-penggajian/${id}/finalisasi`);
  return response.data;
};

export const ExportRiwayatPenggajian = async (
  id: string
): Promise<ExportResponse> => {
  const response = await api.get<ExportResponse>(
    `/riwayat-penggajian/${id}/export`
  );
  return response.data;
};

export const deleteRiwayatPenggajianById = async (id: string) => {
  const response = await api.delete(`/riwayat-penggajian/${id}`);
  return response;
};
