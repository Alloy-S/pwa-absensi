import api from "@/lib/axios";
import {
  ApprovalReimburse,
  ReimburseApprovalPagination,
  ReimburseParams,
  ReimburseReq,
} from "@/models/reimburseModel";

export const fetchApprovalReimbursePagination = async (
  params: ReimburseParams
): Promise<ReimburseApprovalPagination> => {
  const response = await api.get<ReimburseApprovalPagination>("/reimburse/approval", {
    params,
  });
  return response.data;
};

export const fetchDetailReimburse = async (
  id: string
): Promise<ApprovalReimburse> => {
  const response = await api.get<ApprovalReimburse>(`/reimburse/approval/${id}`);
  return response.data;
};

export const createReimburseApi = async (request: ReimburseReq) => {
  const response = await api.post(`/reimburse/approval`, request);
  return response;
};

export const cancelReimburseApi = async (aprovalId: string) => {
  const response = await api.delete(`/reimburse/approval/${aprovalId}`);
  return response;
};
