import api from "@/lib/axios";
import {
  ApprovalKoreksi,
  Koreksi,
  KoreksiPagination,
  KoreksiParams,
  KoreksiReq,
} from "@/models/koreksiModel";

export const fetchKoreksiPagination = async (
  params: KoreksiParams
): Promise<KoreksiPagination> => {
  const response = await api.get<KoreksiPagination>("/koreksi-kehadiran", {
    params,
  });
  return response.data;
};

export const fetchKoreksiPaginationAdmin = async (
  params: KoreksiParams
): Promise<KoreksiPagination> => {
  const response = await api.get<KoreksiPagination>(
    "/koreksi-kehadiran/approval",
    {
      params,
    }
  );
  return response.data;
};

export const fetchDetailKoreksi = async (id: string): Promise<Koreksi> => {
  const response = await api.get<Koreksi>(`/koreksi-kehadiran/${id}`);
  return response.data;
};

export const fetchDetailKoreksiPIC = async (id: string): Promise<ApprovalKoreksi> => {
  const response = await api.get<ApprovalKoreksi>(`/koreksi-kehadiran/approval/${id}`);
  return response.data;
};

export const CreateKoreksiApi = async (request: KoreksiReq) => {
  const response = await api.post(`/koreksi-kehadiran`, request);
  return response;
};

export const cancelKoreksiApi = async (aprovalId: string) => {
  const response = await api.delete(`/koreksi-kehadiran/${aprovalId}`);
  return response;
};

export const approveKoreksiApi = async (id: string) => {
  const response = await api.post(`/koreksi-kehadiran/approval/${id}/approve`);
  return response;
};

export const rejectKoreksiApi = async (id: string) => {
  const response = await api.post(`/koreksi-kehadiran/approval/${id}/reject`);
  return response;
};
