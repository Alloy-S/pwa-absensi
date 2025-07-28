import api from "@/lib/axios";
import {
  LatestPengumumanList,
  Pengumuman,
  PengumumanPagination,
  PengumumanParams,
  PengumumanReq,
} from "@/models/PengumumanModel";

export const fetchPengumumanAdmin = async (
  params: PengumumanParams
): Promise<PengumumanPagination> => {
  const response = await api.get<PengumumanPagination>("/pengumuman/admin", {
    params,
  });
  return response.data;
};

export const fetchPengumumanUser = async (): Promise<PengumumanPagination> => {
  const response = await api.get<PengumumanPagination>("/pengumuman");
  return response.data;
};

export const fetchPengumumanById = async (id: string): Promise<Pengumuman> => {
  const response = await api.get<Pengumuman>("/pengumuman/" + id);
  return response.data;
};

export const addPengumuman = async (request: PengumumanReq) => {
  const response = await api.post("/pengumuman/admin", request);
  return response;
};

export const updatePengumuman = async (id: string, request: PengumumanReq) => {
  const response = await api.put<PengumumanReq>(
    "/pengumuman/admin/" + id,
    request
  );
  return response;
};

export const deletePengumuman = async (id: string) => {
  const response = await api.delete("/pengumuman/admin/" + id);
  return response;
};

export const fetchLatestPengumuman = async (): Promise<LatestPengumumanList> => {
  const response = await api.get<LatestPengumumanList>("/pengumuman/latest");
  return response.data;
};
