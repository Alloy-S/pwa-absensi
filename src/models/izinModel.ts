import { JenisIzin } from "./jenisIzinModel";

export interface Izin {
  id: string;
  date: string;
  tgl_izin_start: string;
  tgl_izin_end: string;
  keterangan: string;
  status: string;
  jenis_izin_id: string;
  user_id: string;
  jenis_izin: JenisIzin;
  user: User;
}

export interface User {
  id: string;
  fullname: string;
  jabatan: string;
  lokasi: string;
}

export interface IzinPagination {
  pages: number;
  total: number;
  items: Izin[];
}

export interface IzinReq {
  tgl_izin_start: string;
  tgl_izin_end: string;
  keterangan: string;
  jenis_izin_id: string;
}

export interface IzinParams {
  page?: number;
  size?: number;
  search?: string;
  "filter-status"?: string;
  "filter-month"?: string;
}

export interface ApprovalIzin {
  id: string;
  created_date: string;
  status: string;
  approval_user: UserApproval;
  user_id: string;
  izin: Izin;
  user: User;
}

export interface UserApproval {
  id: string;
  fullname: string;
}
