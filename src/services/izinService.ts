import api from "@/lib/axios";
import {
  ApprovalIzin,
  IzinPagination,
  IzinParams,
  IzinReq,
} from "@/models/izinModel";

export const fetchIzinPagination = async (
  params: IzinParams
): Promise<IzinPagination> => {
  const response = await api.get<IzinPagination>("/izin", {
    params,
  });
  return response.data;
};

export const fetchDetailIzin = async (id: string): Promise<ApprovalIzin> => {
  const response = await api.get<ApprovalIzin>(`/izin/${id}`);
  return response.data;
};

export const CreateIzinApi = async (request: IzinReq) => {
  const response = await api.post(`/izin`, request);
  return response;
};

export const cancelIzinApi = async (aprovalId: string) => {
  const response = await api.delete(`/izin/${aprovalId}`);
  return response;
};

export const fetchIzinPaginationAdmin = async (
  params: IzinParams
): Promise<IzinPagination> => {
  const response = await api.get<IzinPagination>(
    "/izin/approval",
    {
      params,
    }
  );
  return response.data;
};

export const fetchDetailIzinPIC = async (id: string): Promise<ApprovalIzin> => {
  const response = await api.get<ApprovalIzin>(`/izin/approval/${id}`);
  return response.data;
};

export const approveIzinApi = async (id: string) => {
  const response = await api.post(`/izin/approval/${id}/approve`);
  return response;
};

export const rejectIzinApi = async (id: string) => {
  const response = await api.post(`/izin/approval/${id}/reject`);
  return response;
};