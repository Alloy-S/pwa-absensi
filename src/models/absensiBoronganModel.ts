export interface AbsensiBorongan {
    id: string;
    created_date: string;
    status: string;
    approval_user_id: string;
    user_id: string;
    date_start: string;
    date_end: string;
    keterangan: string;
  }

  export interface AbsensiBoronganParams {
    page?: number;
    size?: number;
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
    total: number;
    details: Borongan[];
  }

  export interface UserApproval {
    id: string;
    fullname: string;
  }

  export interface Borongan {
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

  