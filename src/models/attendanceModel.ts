export interface CheckTodayAttendanceRes {
  status: string;
  required_attendance_type: string;
  time_clock_in: string;
  time_clock_out: string;
  today: string;
  shift: string;
}

export interface AttedanceReq {
  latitude: number;
  longitude: number;
  description: string;
  type: string;
  image: string;
}
