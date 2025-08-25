import api from "@/lib/axios";
import { PaginationParams } from "@/models/generalModel";
import { HargaAll, HargaHarianBorongan, HargaPagination } from "@/models/hargaHarianBorongan";

export interface HargaHarianBoronganReq {
  nama: string;
  harga_normal: number;
}

export const fetchHargaPagination = async (
    params: PaginationParams
  ): Promise<HargaPagination> => {
    const response = await api.get<HargaPagination>("/harga-harian-borongan", {
      params,
    });
    return response.data;
  };

  export const fetchHargaById = async (id: string): Promise<HargaHarianBorongan> => {
    const response = await api.get<HargaHarianBorongan>("/harga-harian-borongan/" + id);
    return response.data;
  };

  
  export const addHarga = async (request: HargaHarianBoronganReq) => {
    const response = await api.post("/harga-harian-borongan", request);
    return response;
  };
  
  export const updateHarga = async (id: string, request: HargaHarianBoronganReq) => {
    const response = await api.put<HargaHarianBorongan>("/harga-harian-borongan/" + id, request);
    return response;
  };
  
  export const deleteHarga = async (id: string) => {
    const response = await api.delete("/harga-harian-borongan/" + id);
    return response;
  };

  export const fetchAllHarga = async (): Promise<HargaAll> => {
    const response = await api.get<HargaAll>("/harga-harian-borongan/all");
    return response.data;
  };