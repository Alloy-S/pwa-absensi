import { ApprovalUser } from "./koreksiModel";

  export interface Lembur {
    id: string;
    created_date: string;
    status: string;
    approval_user_id: string;
    user_id: string;
    date_start: string;
    date_end: string;
    keterangan: string;
  }

  export interface LemburParams {
    page?: number;
    size?: number;
    search?: string;
    "filter-status"?: string;
    "filter-month"?: string;
  }


  
  export interface LemburApprovalPagination {
    pages: number;
    total: number;
    items: Lembur[];
  }

  export interface LemburReq {
    date_start: string;
    date_end: string;
    keterangan: string;
  }

  export interface ApprovalLembur {
    id: string;
    created_date: string;
    status: string;
    approval_user: ApprovalUser
    user_id: string;
    lembur: Lembur;
  }

  export interface UserApproval {
    id: string;
    fullname: string;
  }