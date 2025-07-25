<template>
    <BasePage>
        <div v-if="loading" class="text-center py-10">
            <i class="fa-solid fa-spinner animate-spin text-4xl text-slate-500"></i>
            <p class="mt-2 text-slate-500">Memuat data...</p>
        </div>

        <div v-else-if="karyawanDetail">
            <div class="mb-5">
                <button @click="goBack" class="flex items-center space-x-2 text-sm text-slate-600 hover:text-blue-700">
                    <i class="fa-solid fa-arrow-left"></i>
                    <span>Kembali ke Daftar</span>
                </button>
            </div>

            <div class="my-5">
                <p class="text-3xl font-semibold text-slate-800">Detail Kuota Cuti Karyawan</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="p-6 bg-white rounded-lg shadow-md col-span-1 md:col-span-2">
                    <h3 class="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">Informasi Karyawan</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-slate-500">Nama Lengkap</p>
                            <p class="font-medium text-slate-800">{{ karyawanDetail.user.fullname }}</p>
                        </div>
                        <div>
                            <p class="text-slate-500">NIP</p>
                            <p class="font-medium text-slate-800">{{ karyawanDetail.user.nip || '-' }}</p>
                        </div>
                        <div>
                            <p class="text-slate-500">Jabatan</p>
                            <p class="font-medium text-slate-800">{{ karyawanDetail.user.jabatan || '-' }}</p>
                        </div>
                        <div>
                            <p class="text-slate-500">Lokasi</p>
                            <p class="font-medium text-slate-800">{{ karyawanDetail.user.lokasi || '-' }}</p>
                        </div>
                    </div>
                </div>
             
            </div>

            <div class="mb-5 flex justift-end">
                <button type="button" @click="router.push(`/admin/pengaturan/kuota-cuti/${karyawanDetail.user.id}/add`)"
                    class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    <i class="fa-solid fa-plus"></i>
                    <span>Tambah Kuota Cuti</span>
                </button>
            </div>
            
            <div class="p-3 bg-white rounded-md shadow-md">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-slate-700">Riwayat Alokasi Kuota Cuti</h3>
                </div>
                <DataTable :value="karyawanDetail.items" tableStyle="min-width: 50rem">
                    <Column field="jenis_izin.nama" header="Jenis Cuti"></Column>
                    <Column field="periode" header="Jenis Cuti"></Column>
                    <Column field="kuota_awal" header="Kuota Diberikan"></Column>
                    <Column field="kuota_terpakai" header="Kuota Digunakan"></Column>
                    <Column field="sisa_kuota" header="Sisa Saat Ini"></Column>
                    <Column header="Action" style="width: 20%">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="editKuota(route.params.id as string, slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="deleteKuota(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>
                </DataTable>
            </div>
        </div>
        
        <div v-else class="text-center py-10">
             <p class="text-2xl font-semibold text-red-600">Gagal memuat data</p>
             <p class="text-slate-500">Karyawan tidak ditemukan atau terjadi kesalahan.</p>
        </div>
    </BasePage>
</template>
<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { fetchDetailKuotaKaryawan, deleteKuotaCuti } from '@/services/kuotaCutiService';
import { kuotaCutiKaryawanPagination } from '@/models/kuotaCutiModel';

const router = useRouter();
const route = useRoute();

const karyawanDetail = ref<kuotaCutiKaryawanPagination | null>(null);
const loading = ref(true);

const getDetailKaryawan = async (id: string) => {
    loading.value = true;
    try {
        const response = await fetchDetailKuotaKaryawan(id);
        karyawanDetail.value = response;
    } catch (error) {
        console.error("Gagal memuat detail data karyawan:", error);
        toast.error('Gagal memuat detail data karyawan.');
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.back();
};

const editKuota = (id: string, kuotaId: string) => {
    router.push(`/admin/pengaturan/kuota-cuti/${id}/${kuotaId}/edit`);
};

const deleteKuota = async (id: string) => {
    const response = await deleteKuotaCuti(id);

    if(response.status === 200) {
        toast.success("Kuota cuti berhasil dihapus.");
        getDetailKaryawan(route.params.id as string);
    } else {
        toast.error("Gagal menghapus kuota cuti.");
    }
};

onMounted(() => {
    const karyawanId = route.params.id as string;
    if (karyawanId) {
        getDetailKaryawan(karyawanId);
    } else {
        loading.value = false;
        toast.error('ID Karyawan tidak valid.');
    }
});
</script>