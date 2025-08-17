import api from "@/lib/axios";
import {
  JenisIzin,
  JenisIzinAll,
  JenisIzinPagination,
  JenisIzinParams,
  JenisIzinReq,
} from "@/models/jenisIzinModel";

export const fetchJenisIzinPagination = async (
  params: JenisIzinParams
): Promise<JenisIzinPagination> => {
  const response = await api.get<JenisIzinPagination>("/jenis-izin", {
    params,
  });
  return response.data;
};

export const deleteJenisIzin = async (id: string) => {
  const response = await api.delete(`/jenis-izin/${id}`);
  return response;
};

export const addJenisIzin = async (request: JenisIzinReq) => {
  const response = await api.post(`/jenis-izin`, request);
  return response;
};

export const fetchJenisIzinById = async (id: string): Promise<JenisIzin> => {
  const response = await api.get<JenisIzin>(`/jenis-izin/${id}`);
  return response.data;
};

export const updateJenisIzin = async (id: string, request: JenisIzin) => {
  const response = await api.put(`/jenis-izin/${id}`, request);
  return response;
};

export const fetchJenisAll = async (): Promise<JenisIzinAll> => {
  const response = await api.get<JenisIzinAll>(`/jenis-izin/all`);
  return response.data;
};
