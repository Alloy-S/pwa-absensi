export interface LatestApprovalUsers {
    approvals: ApprovalItem[];
}

export interface ApprovalItem {
    approval_id: string;
    tanggal_pengajuan: string;
    tipe_approval: string;
    status: string;
}