import api from "@/lib/axios";
import {
  BackupJob,
  BackupJobReq,
  BackupLogs,
  BackupLogsPagination,
  BackupLogsParams,
} from "@/models/backupModel";

export const createBackupJob = async (
  request: BackupJobReq
): Promise<BackupJob> => {
  const response = await api.post<BackupJob>("/backup", request);
  return response.data;
};

export const fetchBackupPagiantion = async (
  params: BackupLogsParams
): Promise<BackupLogsPagination> => {
  const response = await api.get<BackupLogsPagination>("/backup", { params });
  return response.data;
};

export const fetchBackupLogById = async (id: string): Promise<BackupLogs> => {
  const response = await api.get<BackupLogs>(`/backup/${id}`);
  return response.data;
};

export const downloadFileBackup = async (id: string) => {
  const response = await api.get(`/backup/${id}/download`, {
    responseType: 'blob',
  });
  return response;
};

export const finalisasiBackupLog = async (id: string) => {
  const response = await api.post(`/backup/${id}/finalisasi`);
  return response;
};
