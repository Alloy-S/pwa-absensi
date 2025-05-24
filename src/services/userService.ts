import api from "@/lib/axios";
import { User, UserPosiblePIC } from "@/models/userModel";

export const addKaryawan = async (request: User) => {
  const response = await api.post("/users", request);
  return response;
};

export const fetchPosiblePIC = async (id: string): Promise<UserPosiblePIC[]> => {
  const response = await api.get<UserPosiblePIC[]>(`/users/posible-pic/${id}`);
  return response.data;
};
