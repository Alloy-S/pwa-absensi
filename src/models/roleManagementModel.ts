export interface UserRole {
  user_id: string;
  role_id: number;
  role_name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface UserRoleReq {
  role_ids: number[];
}

export interface User {
  id: string;
  fullname: string;
  jabatan: string;
  lokasi: string;
}
