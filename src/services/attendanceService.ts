import api from "@/lib/axios";
import {
  AttedanceReq,
  CheckTodayAttendanceRes,
} from "@/models/attendanceModel";

export const checkAttadanceTodayApi =
  async (): Promise<CheckTodayAttendanceRes> => {
    const response = await api.get<CheckTodayAttendanceRes>(
      `/attendance/today`
    );
    return response.data;
  };

export const submitAttendanceApi = async (request: AttedanceReq) => {
  const response = await api.post("/attendance", request);
  return response;
};
