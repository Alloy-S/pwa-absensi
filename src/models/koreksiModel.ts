import { JadwalKerja } from "./jadwalModel";

export interface Koreksi {
  id: string;
  absensi_date: string;
  status: string;
  metode: string;
  user_id: string;
  user: User;
  absensi_id: string;
  catatan_pengajuan: string;
  detail_approval: DetailKoreksi[];
  approval_user_id: string;
  approval_user: ApprovalUser;
}

export interface ApprovalKoreksi {
  id: string;
  absensi_date: string;
  status: string;
  metode: string;
  user: User;
  absensi_id: string;
  catatan_pengajuan: string;
  detail_approval: DetailKoreksi[];
  approval_user_id: string;
  approval_user: ApprovalUser;
  jadwal_kerja: JadwalKerja;
}

export interface KoreksiPagination {
  pages: number;
  total: number;
  items: Koreksi[];
}

export interface KoreksiParams {
  page?: number;
  size?: number;
  search?: string;
  "filter-status"?: string;
  "filter-month"?: string;
}

export interface DetailKoreksi {
  id: string;
  requested_datetime: string;
  type: string;
}

export interface ApprovalUser {
  id: string;
  fullname: string;
}

export interface User {
  id: string;
  fullname: string;
  jabatan: string;
  lokasi: string;
}

export interface KoreksiReq {
  date: string;
  time_in: string;
  time_out: string;
  absensi_id: string;
  catatan_pengajuan: string;
}

export interface SyncKoreksiItemReq {
  date: string;
  time_in: string;
  time_out: string;
  absensi_id: string;
  catatan_pengajuan: string;
  pengajuan_id: string;
  timestamp: number;
}

export interface SyncKoreksiReq {
  pengajuan: SyncKoreksiItemReq[];
}

export function initKoreksiReq(): KoreksiReq {
  return {
    date: "",
    time_in: "",
    time_out: "",
    absensi_id: "",
    catatan_pengajuan: "",
  };
}
