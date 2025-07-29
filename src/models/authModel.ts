export interface LoginRequest {
  username: string;
  password: string;
  fcm_token?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  fullname: string;
  role: string;
}
