import api from "@/lib/axios";
import { RekapPangination, RekapPeriodeParams } from "@/models/rekapPeriodeModel";


export const fetchRekapPeriodePagination = async (
  params: RekapPeriodeParams
): Promise<RekapPangination> => {
  const response = await api.get<RekapPangination>("/rekap-periode", {
    params,
  });
  return response.data;
};