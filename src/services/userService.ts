import api from "@/lib/axios";
import { AllApprovalPagination, AllApprovalParams, CheckFaceStatusResponse, DataKaryawan, DataKontak, DataPribadi, Karyawan, KaryawanKuotaCutiPagination, KaryawanPagination, registerFaceRequest, ResetPasswordRequest, UpdateFCMTokenRequest, User, UserByPic, UserPosiblePIC } from "@/models/userModel";

export interface KaryawanParams {
  page?: number;
  search?: string;
}

export const addKaryawan = async (request: User) => {
  const response = await api.post("/users", request);
  return response;
};

export const updateKaryawan = async (id: string, request: User) => {
  const response = await api.put(`/users/${id}`, request);
  return response;
};

export const nonActiveKaryawan = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response;
};

export const fetchDetailKaryawan = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const fetchKaryawanPagination = async (
  params: KaryawanParams
): Promise<KaryawanPagination> => {
  const response = await api.get<KaryawanPagination>("/users", {
    params,
  });
  return response.data;
};

export const fetchKaryawanKuotaPagination = async (
  params: KaryawanParams
): Promise<KaryawanKuotaCutiPagination> => {
  const response = await api.get<KaryawanKuotaCutiPagination>("/users/kuota-cuti", {
    params,
  });
  return response.data;
};

export const fetchPosiblePIC = async (id: string): Promise<UserPosiblePIC[]> => {
  const response = await api.get<UserPosiblePIC[]>(`/users/posible-pic/${id}`);
  return response.data;
};

export const resendLoginData = async (id: string) => {
  const request = {
    user_id: id,
  }

  const response = await api.post(`/users/resend-login-data`, request);
  return response;
}


export const fetchDataKontak = async (): Promise<DataKontak> => {
  const response = await api.get<DataKontak>(`/users/data-kontak`);
  return response.data;
};

export const updateDataKontak = async (request: DataKontak) => {
  const response = await api.put("/users/data-kontak", request);  
  return response;
};

export const fetchDataPribadi = async (): Promise<DataPribadi> => {
  const response = await api.get<DataPribadi>(`/users/data-pribadi`);
  return response.data;
};

export const updateDataPribadi = async (request: DataPribadi) => {
  const response = await api.put("/users/data-pribadi", request);  
  return response;
};

export const fetchDataKaryawan = async (): Promise<DataKaryawan> => {
  const response = await api.get<DataKaryawan>(`/users/data-karyawan`);
  return response.data;
};

export const changePassword = async (request: ResetPasswordRequest) => {
  const response = await api.post("/users/change-password", request);  
  return response;
};

export const checkFaceStatus = async (): Promise<CheckFaceStatusResponse> => {
  const response = await api.get<CheckFaceStatusResponse>("/face-recognition/check-status");  
  return response.data;
};

export const registerFaceApi = async (request: registerFaceRequest) => {
  const response = await api.post("/face-recognition/register", request);
  return response;
};

export const fetchUserbyPic = async (): Promise<UserByPic> => {
  const response = await api.get<UserByPic>(`/users/users-by-pic`);
  return response.data;
};

export const updateFCMToken = async (request: UpdateFCMTokenRequest) => {
  const response = await api.post("/users/update-fcm-token", request);  
  return response;
};

export const fetchAllApprovalWaitingStatus = async (params: AllApprovalParams) : Promise<AllApprovalPagination> => {
  const response = await api.get<AllApprovalPagination>("/users/all-approval-by-approval-user", {params});  
  return response.data;
};

export const fetchfindUser = async (params: {search:string}) : Promise<Karyawan[]> => {
  const response = await api.get<Karyawan[]>("/users/find-user", {params});  
  return response.data;
};
