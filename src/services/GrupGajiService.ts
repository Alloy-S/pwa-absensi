import api from "@/lib/axios";
import {
  GrupGaji,
  GrupGajiPagination,
  GrupGajiParams,
  GrupGajiUser,
  KodePerhitungan,
} from "@/models/GrupGajiModel";

export const fetchGrupGajiPagination = async (
  params: GrupGajiParams
): Promise<GrupGajiPagination> => {
  const response = await api.get<GrupGajiPagination>("/grup-gaji", {
    params,
  });
  return response.data;
};

export const deleteGrupGaji = async (id: string) => {
  const response = await api.delete(`/grup-gaji/${id}`);
  return response;
};

export const addGrupGaji = async (request: GrupGaji) => {
  const response = await api.post(`/grup-gaji`, request);
  return response;
};

export const fetchGrupGajiById = async (id: string): Promise<GrupGaji> => {
  const response = await api.get<GrupGaji>(`/grup-gaji/${id}`);
  return response.data;
};

export const updateGrupGaji = async (id: string, request: GrupGaji) => {
  const response = await api.put(`/grup-gaji/${id}`, request);
  return response;
};

export const fetchAllKodePerhitungan = async (): Promise<KodePerhitungan[]> => {
  const response = await api.get<KodePerhitungan[]>(
    `/grup-gaji/kode-perhitungan`
  );
  return response.data;
};

export const fetchAllGrupGaji = async (): Promise<GrupGaji[]> => {
  const response = await api.get<GrupGaji[]>(`/grup-gaji/all`);
  return response.data;
};

export const fetchGrupGajiUsers = async (id: string): Promise<GrupGajiUser> => {
  const response = await api.get<GrupGajiUser>(`/grup-gaji/${id}/users`);
  return response.data;
};
