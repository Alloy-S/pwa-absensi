import api from "@/lib/axios";
import { AbsensiBoronganParams, AbsensiBoronganReq, ApprovalAbsensiBoronganPagination, ApprovalBorongan } from "@/models/absensiBoronganModel";

export const fetchApprovalBoronganPagination = async (
    params: AbsensiBoronganParams
  ): Promise<ApprovalAbsensiBoronganPagination> => {
    const response = await api.get<ApprovalAbsensiBoronganPagination>("/approval/absensi-borongan", {
      params,
    });
    return response.data;
  };
  
  export const fetchDetailApprovalBorongan = async (id: string): Promise<ApprovalBorongan> => {
    const response = await api.get<ApprovalBorongan>(`/approval/absensi-borongan/${id}`);
    return response.data;
  };
  
  
  export const createApprovalBoronganApi = async (request: AbsensiBoronganReq) => {
      const response = await api.post(`/approval/absensi-borongan`, request);
      return response;
    };
  
    export const cancelApprovalBoronganApi = async (aprovalId: string) => {
      const response = await api.delete(`/approval/absensi-borongan/${aprovalId}`);
      return response;
    };