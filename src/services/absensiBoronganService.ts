import api from "@/lib/axios";
import {
  AbsensiBorongan,
  AbsensiBoronganParams,
  AbsensiBoronganReq,
  ApprovalAbsensiBoronganPagination,
  ApprovalBorongan,
} from "@/models/absensiBoronganModel";

export const fetchApprovalBoronganPagination = async (
  params: AbsensiBoronganParams
): Promise<ApprovalAbsensiBoronganPagination> => {
  const response = await api.get<ApprovalAbsensiBoronganPagination>(
    "/absensi-borongan",
    {
      params,
    }
  );
  return response.data;
};

export const fetchDetailApprovalBorongan = async (
  id: string
): Promise<ApprovalBorongan> => {
  const response = await api.get<ApprovalBorongan>(`/absensi-borongan/${id}`);
  return response.data;
};

export const createApprovalBoronganApi = async (
  request: AbsensiBoronganReq
) => {
  const response = await api.post(`/absensi-borongan`, request);
  return response;
};

export const cancelApprovalBoronganApi = async (aprovalId: string) => {
  const response = await api.delete(`/absensi-borongan/${aprovalId}`);
  return response;
};

export const approveAbsensiBoronganApi = async (id: string) => {
  const response = await api.post(`/absensi-borongan/approval/${id}/approve`);
  return response;
};

export const rejectAbsensiBoronganApi = async (id: string) => {
  const response = await api.post(`/absensi-borongan/approval/${id}/reject`);
  return response;
};

export const fetchDetailAbsensiBoronganPIC = async (
  id: string
): Promise<ApprovalBorongan> => {
  const response = await api.get<ApprovalBorongan>(
    `/absensi-borongan/approval/${id}`
  );
  return response.data;
};

export const fetchAbsensiBoronganAdmin = async (
  params: AbsensiBoronganParams
): Promise<ApprovalAbsensiBoronganPagination> => {
  const response = await api.get<ApprovalAbsensiBoronganPagination>(
    "/absensi-borongan/approval",
    {
      params,
    }
  );
  return response.data;
};


export const fetchHistoryAbsensiBoronganAdmin = async (
  params: AbsensiBoronganParams
): Promise<ApprovalAbsensiBoronganPagination> => {
  const response = await api.get<ApprovalAbsensiBoronganPagination>("/absensi-borongan/history", {
    params,
  });
  return response.data;
};

export const fetchDetailAbsensiBoronganHistory = async (id: string): Promise<AbsensiBorongan> => {
  const response = await api.get<AbsensiBorongan>(`/absensi-borongan/history/${id}`);
  return response.data;
};
