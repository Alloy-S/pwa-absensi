import api from "@/lib/axios";
import {
  ApprovalLembur,
  Lembur,
  LemburApprovalPagination,
  LemburParams,
  LemburReq,
} from "@/models/lemburModel";

export const fetchApprovalLemburPagination = async (
  params: LemburParams
): Promise<LemburApprovalPagination> => {
  const response = await api.get<LemburApprovalPagination>("/lembur", {
    params,
  });
  return response.data;
};

export const fetchDetailLembur = async (
  id: string
): Promise<ApprovalLembur> => {
  const response = await api.get<ApprovalLembur>(`/lembur/${id}`);
  return response.data;
};

export const createLemburApi = async (request: LemburReq) => {
  const response = await api.post(`/lembur`, request);
  return response;
};

export const cancelLemburApi = async (aprovalId: string) => {
  const response = await api.delete(`/lembur/${aprovalId}`);
  return response;
};

export const approveLemburApi = async (id: string) => {
  const response = await api.post(`/lembur/approval/${id}/approve`);
  return response;
};

export const rejectLemburApi = async (id: string) => {
  const response = await api.post(`/lembur/approval/${id}/reject`);
  return response;
};

export const fetchDetailLemburPIC = async (id: string): Promise<ApprovalLembur> => {
  const response = await api.get<ApprovalLembur>(`/lembur/approval/${id}`);
  return response.data;
};

export const fetchLemburPaginationAdmin = async (
  params: LemburParams
): Promise<LemburApprovalPagination> => {
  const response = await api.get<LemburApprovalPagination>(
    "/lembur/approval",
    {
      params,
    }
  );
  return response.data;
};

export const fetchHistoryLemburAdmin = async (
  params: LemburParams
): Promise<LemburApprovalPagination> => {
  const response = await api.get<LemburApprovalPagination>("/lembur/history", {
    params,
  });
  return response.data;
};

export const fetchDetailLemburHistory = async (id: string): Promise<Lembur> => {
  const response = await api.get<Lembur>(`/lembur/history/${id}`);
  return response.data;
};
