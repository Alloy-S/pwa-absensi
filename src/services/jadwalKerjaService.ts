import api from "@/lib/axios";
import { JadwalAll, JadwalKerja, JadwalKerjaPagination } from "@/models/jadwalModel";

export interface jadwalParams {
  page?: number;
  search?: string;
}


export const fetchjadwalPagination = async (
  params: jadwalParams
): Promise<JadwalKerjaPagination> => {
  const response = await api.get<JadwalKerjaPagination>("/jadwal", {
    params,
  });
  return response.data;
};

export const fetchjadwalAll = async (): Promise<JadwalAll> => {
  const response = await api.get<JadwalAll>("/jadwal/all");
  return response.data;
};

export const fetchjadwalById = async (id: string): Promise<JadwalKerja> => {
  const response = await api.get<JadwalKerja>("/jadwal/" + id);
  return response.data;
};

export const addjadwal = async (request: JadwalKerja) => {
  const response = await api.post("/jadwal", request);
  return response;
};

export const createCopyJadwal = async (id: string, request: JadwalKerja) => {
  const response = await api.post("/jadwal/create-copy/" + id, request);
  return response;
};

export const deletejadwal = async (id: string) => {
  const response = await api.delete("/jadwal/" + id);
  return response;
};

export const activateJadwalKerja = async (id: string) => {
  const response = await api.post("/jadwal/activate/" + id);
  return response;
};

