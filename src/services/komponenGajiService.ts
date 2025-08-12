import api from "@/lib/axios";
import {
  KomGajiPagination,
  KomGajiParams,
  KomponenGaji,
} from "@/models/komponenGajiModel";

export const fetchKomponenGajiPagination = async (
  params: KomGajiParams
): Promise<KomGajiPagination> => {
  const response = await api.get<KomGajiPagination>("/kom-gaji", {
    params,
  });
  return response.data;
};

export const deleteKomGaji = async (id: string) => {
  const response = await api.delete(`/kom-gaji/${id}`);
  return response;
};

export const addKomGaji = async (request: KomponenGaji) => {
  const response = await api.post(`/kom-gaji`, request);
  return response;
};

export const fetchKomGajiById = async (id: string): Promise<KomponenGaji> => {
  const response = await api.get<KomponenGaji>(`/kom-gaji/${id}`);
  return response.data;
};

export const updateKomGaji = async (id: string, request: KomponenGaji) => {
  const response = await api.put(`/kom-gaji/${id}`, request);
  return response;
};

export const fetchAllKomponen= async (): Promise<KomponenGaji[]> => {
    const response = await api.get<KomponenGaji[]>(`/kom-gaji/all`);
    return response.data;
  };
