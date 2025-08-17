import api from "@/lib/axios";
import { PenggajianReq, ProsesPenggajian } from "@/models/payrollModel";

export const olahPengajian = async (
  request: PenggajianReq
): Promise<ProsesPenggajian> => {
  const response = await api.post<ProsesPenggajian>(`/payroll`, request);
  return response.data;
};
