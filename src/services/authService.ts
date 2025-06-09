import api from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/models/authModel";

export const hitLogin = async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", request);
    return response.data;
  };