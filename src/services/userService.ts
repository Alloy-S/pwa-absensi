import api from "@/lib/axios";
import { KaryawanPagination, User, UserPosiblePIC } from "@/models/userModel";

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

export const fetchPosiblePIC = async (id: string): Promise<UserPosiblePIC[]> => {
  const response = await api.get<UserPosiblePIC[]>(`/users/posible-pic/${id}`);
  return response.data;
};
