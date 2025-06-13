import api from "@/lib/axios";
import { Libur, LiburPagination } from "@/models/liburModel";

export interface LokasiParams {
    page?: number;
    search?: string;
  }
  
  export interface LiburRequest {
    date: string;
    is_holiday: boolean;
    description: string;
  }

  export const fetchLiburPagination = async (
    params: LokasiParams
  ): Promise<LiburPagination> => {
    const response = await api.get<LiburPagination>("/libur", {
      params,
    });
    return response.data;
  };

  export const fetchLiburById = async (id: string): Promise<Libur> => {
    const response = await api.get<Libur>("/libur/" + id);
    return response.data;
  };
  
  export const addLibur = async (request: LiburRequest) => {
    const response = await api.post("/libur", request);
    return response;
  };
  
  export const updateLibur = async (id: string, request: LiburRequest) => {
    const response = await api.put("/libur/" + id, request);
    return response;
  };
  
  export const deleteLibur = async (id: string) => {
    const response = await api.delete("/libur/" + id);
    return response;
  };