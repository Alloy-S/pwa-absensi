export interface LatestApprovalUsers {
    approvals: ApprovalItem[];
}

export interface ApprovalItem {
    id: string;
    tanggal_pengajuan: string;
    tipe_approval: string;
    status: string;
}