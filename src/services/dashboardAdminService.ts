import api from "@/lib/axios";
import {
  TodayAttendaceSummary,
  TotalUsers,
} from "@/models/dashboardAdminModel";

export const fetchTodayAttendaceSummary =
  async (): Promise<TodayAttendaceSummary> => {
    const response = await api.get<TodayAttendaceSummary>(
      "/dashboard/admin/attendance-summary"
    );
    return response.data;
};

export const fetchTotalUsers = async (): Promise<TotalUsers> => {
  const response = await api.get<TotalUsers>("/dashboard/admin/total-users");
  return response.data;
};