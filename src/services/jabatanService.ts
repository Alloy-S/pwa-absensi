import api from "@/lib/axios";
import { Jabatan, JabatanAll, JabatanPagination } from "@/models/jabatanModel";

export interface JabatanParams {
  page?: number;
  search?: string;
}

export interface JabatanRequest {
  nama: string;
  parent_id?: string;
}

export const fetchJabatanPagination = async (
  params: JabatanParams
): Promise<JabatanPagination> => {
  const response = await api.get<JabatanPagination>("/jabatan", {
    params,
  });
  return response.data;
};

export const fetchJabatanAll = async (): Promise<JabatanAll> => {
  const response = await api.get<JabatanAll>("/jabatan/all");
  return response.data;
};

export const fetchJabatanById = async (id: string): Promise<Jabatan> => {
  const response = await api.get<Jabatan>("/jabatan/" + id);
  return response.data;
};

export const addJabatan = async (request: JabatanRequest) => {
  const response = await api.post("/jabatan", request);
  return response;
};

export const updateJabatan = async (id: string, request: JabatanRequest) => {
  const response = await api.put("/jabatan/" + id, request);
  return response;
};

export const deleteJabatan = async (id: string) => {
    const response = await api.delete("/jabatan/" + id);
    return response;
  };
