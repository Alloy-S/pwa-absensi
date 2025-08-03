export interface AbsensiBorongan {
  id: string;
  date: string;
  status: string;
  total: number;
  user: User;
  detail_absensi_borongan: DetailBorongan[];
}

export interface User {
  id: string;
  fullname: string;
  jabatan: string;
  lokasi: string;
}

export interface AbsensiBoronganParams {
  page?: number;
  size?: number;
  search?: string;
  "filter-month"?: string;
  "filter-status"?: string;
}

export interface ApprovalAbsensiBoronganPagination {
  pages: number;
  total: number;
  items: AbsensiBorongan[];
}

export interface AbsensiBoronganReq {
  date: string;
  details: ItemBorongan[];
}

export interface ItemBorongan {
  ton_normal: number;
  ton_lembur: number;
  type: string;
  user_id: string;
  harga_id: string;
}

export interface ApprovalBorongan {
  id: string;
  date: string;
  status: string;
  approval_user: UserApproval;
  user: User;
  absensi_borongan: AbsensiBorongan;
}

export interface UserApproval {
  id: string;
  fullname: string;
}

export interface DetailBorongan {
  id: string;
  ton_normal: number;
  ton_lembur: number;
  tipe: string;
  total: number;
  harga: HargaBorongan;
  user_name: string;
}

export interface HargaBorongan {
  id: string;
  name: string;
  harga_normal: number;
  harga_lembur: number;
}
