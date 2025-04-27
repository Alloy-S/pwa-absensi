import api from "@/lib/axios";
import { Lokasi, LokasiAll, LokasiPagination } from "@/models/lokasiModel";

export interface LokasiParams {
  page?: number;
  search?: string;
}

export interface LokasiRequest {
  name: string;
  longitude: number;
  latitude: number;
  toleransi: number;
}

export const fetchLokasiPagination = async (
  params: LokasiParams
): Promise<LokasiPagination> => {
  const response = await api.get<LokasiPagination>("/lokasi", {
    params,
  });
  return response.data;
};

export const fetchLokasiAll = async (): Promise<LokasiAll> => {
  const response = await api.get<LokasiAll>("/lokasi/all");
  return response.data;
};

export const fetchLokasiById = async (id: string): Promise<Lokasi> => {
  const response = await api.get<Lokasi>("/lokasi/" + id);
  return response.data;
};

export const addLokasi = async (request: LokasiRequest) => {
  const response = await api.post("/lokasi", request);
  return response;
};

export const updateLokasi = async (id: string, request: LokasiRequest) => {
  const response = await api.put("/lokasi/" + id, request);
  return response;
};

export const deleteLokasi = async (id: string) => {
  const response = await api.delete("/lokasi/" + id);
  return response;
};
