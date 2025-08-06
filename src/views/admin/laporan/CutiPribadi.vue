<template>
    <BasePage>
        <div class="my-5">
             <p class="text-3xl font-semibold text-slate-800">Laporan Kuota Cuti</p>
        </div>

        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row gap-4 items-end">
                <div>
                    <label for="year-picker" class="block mb-2 text-sm font-medium text-gray-700">Filter Tahun Periode</label>
                    <input type="number" id="year-picker" v-model="filters.year"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Contoh: 2025" />
                </div>
                <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium mb-1">Cari Nama / NIP</label>
                    <input type="text" v-model="filters.search" placeholder="Cari nama atau NIP"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button @click="getLaporan"
                    class="flex items-center gap-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800">
                    <i class="fa-solid fa-search"></i>
                    <span>Proses</span>
                </button>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex justify-end mb-4">
                <button @click="exportToExcel" class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm flex items-center">
                    <i class="fa-solid fa-file-excel mr-2"></i>
                    Ekspor ke Excel
                </button>
            </div>

            <div v-if="loading" class="text-center py-10 text-gray-500">
                <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
                <p>Memuat data...</p>
            </div>

            <div v-else-if="laporanList.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500" style="min-width: 800px;">
                    <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                        <tr>
                            <th class="px-4 py-3 border">NIP</th>
                            <th class="px-4 py-3 border text-left">Nama Karyawan</th>
                            <th class="px-4 py-3 border">Periode</th>
                            <th class="px-4 py-3 border">Total Kuota</th>
                            <th class="px-4 py-3 border">Kuota Digunakan</th>
                            <th class="px-4 py-3 border">Sisa Kuota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in laporanList" :key="item.nip + item.periode" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-4 py-2 border">{{ item.nip }}</td>
                            <td class="px-4 py-2 border font-medium text-gray-900 text-left">{{ item.nama }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.periode }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_cuti_tahunan }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.cuti_tahunan_terpakai }}</td>
                            <td class="px-4 py-2 border text-center font-semibold text-blue-600">{{ item.sisa_cuti_tahunan }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div v-else class="text-center py-10 text-gray-500">
                <p>Tidak ada data yang cocok dengan filter yang Anda pilih.</p>
            </div>

            
            <Paginator v-if="totalRecords > 0"
                :rows="lazyParams.rows" 
                :totalRecords="totalRecords" 
                :first="lazyParams.first"
                @page="onPage"
                :rowsPerPageOptions="[10, 25, 50]"
                class="mt-4"
            ></Paginator>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Paginator from 'primevue/paginator';
import { toast } from 'vue3-toastify';
import { KuotaCuti, LaporanCutiParams } from '@/models/laporanModel';
import { fetchLaporanKuotaCutiPagination } from '@/services/laporanService';



const laporanList = ref<KuotaCuti[]>([]);
const loading = ref(false);
const totalRecords = ref(0);

const filters = reactive({
    search: '',
    year: new Date().getFullYear(),
});

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const getLaporan = async () => {
    if (!filters.year) {
        toast.warn("Silakan isi tahun periode terlebih dahulu.");
        return;
    }
    loading.value = true;
    try {
        const params: LaporanCutiParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: filters.search,
            periode: filters.year,
        };
        const response = await fetchLaporanKuotaCutiPagination(params);
        laporanList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat laporan kuota cuti.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getLaporan();
};

const exportToExcel = () => {
    toast.info("Fitur ekspor ke Excel sedang dalam pengembangan.");
};

</script>
