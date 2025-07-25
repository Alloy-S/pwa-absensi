import api from "@/lib/axios";
import { KuotaCuti, kuotaCutiKaryawanPagination, KuotaCutiReq, KuotaCutiUpdateReq } from "@/models/kuotaCutiModel";

export const generateKuotaTahunan = async () => {
    const response = await api.post(`/kuota-cuti/generate/tahunan`);
    return response;
}

export const fetchDetailKuotaKaryawan = async (id: string): Promise<kuotaCutiKaryawanPagination> => {
    const response = await api.get<kuotaCutiKaryawanPagination>(`/kuota-cuti/user/${id}`);
    return response.data;
}

export const fetchDetailKuota = async (id: string): Promise<KuotaCuti> => {
    const response = await api.get<KuotaCuti>(`/kuota-cuti/${id}`);
    return response.data;
}

export const addKuotaCuti = async (id: string, request: KuotaCutiReq) => {
    const response = await api.post(`/kuota-cuti/user/${id}`, request);
    return response;
}

export const updateKuotaCuti = async (id: string, request: KuotaCutiUpdateReq) => {
    const response = await api.put(`/kuota-cuti/${id}`, request);
    return response;
}

export const deleteKuotaCuti = async (id: string) => {
    const response = await api.delete(`/kuota-cuti/${id}`);
    return response;
}