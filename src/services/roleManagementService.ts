import api from "@/lib/axios";
import { Role, UserRole, UserRoleReq } from "@/models/roleManagementModel";

export const fetchDetailUserRole = async (id: string): Promise<UserRole[]> => {
  const response = await api.get<UserRole[]>(`/role-management/${id}`);
  return response.data;
};

export const fetchAllRole = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>(`/role-management/roles`);
  return response.data;
};

export const updateUserRole = async (user_id: string, request: UserRoleReq) => {
  const response = await api.put(`/role-management/${user_id}`, request);
  return response;
};
