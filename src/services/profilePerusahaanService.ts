import api from "@/lib/axios";
import { Perusahaan } from "@/models/profilePerusahaanModel";

export const fetchProfilePerusahaanById = async (): Promise<Perusahaan> => {
  const response = await api.get<Perusahaan>("/perusahaan");
  return response.data;
};

export const updateProfilePerusahaan = async (request: Perusahaan) => {
    const response = await api.put("/perusahaan", request);
    return response;
};
