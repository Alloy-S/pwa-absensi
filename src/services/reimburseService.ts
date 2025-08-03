import api from "@/lib/axios";
import {
  ApprovalReimburse,
  Reimburse,
  ReimburseApprovalPagination,
  ReimburseParams,
  ReimburseReq,
} from "@/models/reimburseModel";

export const fetchApprovalReimbursePagination = async (
  params: ReimburseParams
): Promise<ReimburseApprovalPagination> => {
  const response = await api.get<ReimburseApprovalPagination>("/reimburse", {
    params,
  });
  return response.data;
};

export const fetchDetailReimburse = async (
  id: string
): Promise<ApprovalReimburse> => {
  const response = await api.get<ApprovalReimburse>(`/reimburse/${id}`);
  return response.data;
};

export const createReimburseApi = async (request: ReimburseReq) => {
  const response = await api.post(`/reimburse`, request);
  return response;
};

export const cancelReimburseApi = async (aprovalId: string) => {
  const response = await api.delete(`/reimburse/${aprovalId}`);
  return response;
};

export const approveReimburseApi = async (id: string) => {
  const response = await api.post(`/reimburse/approval/${id}/approve`);
  return response;
};

export const rejectReimburseApi = async (id: string) => {
  const response = await api.post(`/reimburse/approval/${id}/reject`);
  return response;
};

export const fetchDetailReimbursePIC = async (
  id: string
): Promise<ApprovalReimburse> => {
  const response = await api.get<ApprovalReimburse>(`/reimburse/approval/${id}`);
  return response.data;
};

export const fetchReimburseAdmin = async (
  params: ReimburseParams
): Promise<ReimburseApprovalPagination> => {
  const response = await api.get<ReimburseApprovalPagination>("/reimburse/approval", {
    params,
  });
  return response.data;
};

export const fetchHistoryReimburseAdmin = async (
  params: ReimburseParams
): Promise<ReimburseApprovalPagination> => {
  const response = await api.get<ReimburseApprovalPagination>("/reimburse/history", {
    params,
  });
  return response.data;
};

export const fetchDetailReimburseHistory = async (id: string): Promise<Reimburse> => {
  const response = await api.get<Reimburse>(`/reimburse/history/${id}`);
  return response.data;
};