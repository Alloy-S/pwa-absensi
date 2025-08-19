export interface BackupLogs {
  id: string;
  date_created: string;
  start_date: string;
  end_date: string;
  status: string;
  filename: string;
  file_path: string;
  error_message: string;
}

export interface BackupJob {
    message: string;
    job_id: string;
    log_id: string;
}

export interface BackupJobReq {
    start_date: string;
    end_date: string;
}

export interface BackupLogsParams {
    page?: number;
    size?: number;
}

export interface BackupLogsPagination {
    total: number;
    pages: number;
    items: BackupLogs[];
}



