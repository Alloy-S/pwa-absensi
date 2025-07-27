import { ApprovalUser } from "./koreksiModel";

  export interface Reimburse {
    id: string;
    date: string;
    status: string;
    photo: Photo;
    detail_reimburse: ReimburseDetail[];
  }

  export interface ReimburseApprovalItem {
    id: string;
    created_date: string;
    status: string;
  }


  export interface ReimburseParams {
    page?: number;
    size?: number;
    search?: string;
    "filter-status"?: string;
    "filter-month"?: string;
  }

  export interface Photo {
    id: string;
    filename: string;
    type: string;
    mimetype: string;
    image: string;
  }
  
  export interface ReimburseApprovalPagination {
    pages: number;
    total: number;
    items: ReimburseApprovalItem[];
  }

  export interface ReimburseReq {
    photo: string;
    details: ReimburseDetail[];
  }

  export interface ReimburseDetail {
    nama: string;
    harga: number;
    jumlah: number;
  }

  export interface ApprovalReimburse {
    id: string;
    created_date: string;
    status: string;
    approval_user: ApprovalUser
    reimburse: Reimburse;
  }

  export interface UserApproval {
    id: string;
    fullname: string;
  }