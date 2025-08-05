<template>
    <BasePage>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Laporan Rekapitulasi Kehadiran</p>
        </div>

        
        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div class="lg:col-span-2">
                    <label class="block mb-2 text-sm font-medium text-gray-700">Filter Rentang Tanggal</label>
                    <div class="flex space-x-2">
                        <input type="date" v-model="filters.startDate"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <input type="date" v-model="filters.endDate" :min="filters.startDate"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <div>
                    <label for="search-karyawan" class="block mb-2 text-sm font-medium text-gray-700">Cari Nama / NIP</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                        </span>
                        <input type="text" id="search-karyawan" v-model="filters.search"
                            class="w-full pl-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Cari..." />
                    </div>
                </div>
                 <button @click="getRekapData" class="w-full md:w-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                    <i class="fa-solid fa-search mr-2"></i>
                    Tampilkan
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
            
            <div v-else-if="rekapList.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500" style="min-width: 1400px;">
                    <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                        <tr>
                            <th class="px-4 py-3 border" rowspan="2">NIP</th>
                            <th class="px-4 py-3 border" rowspan="2">Nama</th>
                            <th class="px-4 py-3 border" rowspan="2">Tipe Karyawan</th>
                            <th class="px-4 py-3 border" rowspan="2">Jabatan</th>
                            <th class="px-4 py-3 border" rowspan="2">Lokasi</th>
                            <th class="px-4 py-3 border" colspan="2">Kehadiran</th>
                            <th class="px-4 py-3 border" rowspan="2">Izin</th>
                            <th class="px-4 py-3 border" rowspan="2">Alpha</th>
                            <th class="px-4 py-3 border" rowspan="2">Tak Lengkap</th>
                            <th class="px-4 py-3 border" colspan="2">Terlambat</th>
                            <th class="px-4 py-3 border" colspan="2">Pulang Awal</th>
                        </tr>
                        <tr>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in rekapList" :key="item.nip" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-4 py-2 border">{{ item.nip }}</td>
                            <td class="px-4 py-2 border font-medium text-gray-900 whitespace-nowrap">{{ item.nama }}</td>
                            <td class="px-4 py-2 border">{{ item.tipe_karyawan }}</td>
                            <td class="px-4 py-2 border">{{ item.jabatan }}</td>
                            <td class="px-4 py-2 border">{{ item.lokasi }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_kehadiran }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatMinutesToHours(item.total_menit_kehadiran) }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_izin }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_tidak_hadir }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_absen_tidak_lengkap }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_terlambat }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatMinutesToHours(item.total_menit_terlambat) }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_pulang_awal }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatMinutesToHours(item.total_menit_pulang_awal) }}</td>
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
                :rowsPerPageOptions="[2,10, 25, 50]"
                class="mt-4"
            ></Paginator>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Paginator from 'primevue/paginator';
import { toast } from 'vue3-toastify';
import { RekapPeriode, RekapPeriodeParams } from '@/models/rekapPeriodeModel';
import { fetchRekapPeriodePagination } from '@/services/rekapPeriodeService';


const rekapList = ref<RekapPeriode[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
let debounceTimer: any = null;

const filters = reactive({
    search: '',
    startDate: '',
    endDate: '',
});

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const getRekapData = async () => {
    if (!filters.startDate || !filters.endDate) {
        toast.warn("Silakan pilih rentang tanggal terlebih dahulu.");
        return;
    }
    loading.value = true;
    try {
        const params: RekapPeriodeParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: filters.search,
            "start-date": filters.startDate,
            "end-date": filters.endDate,
        };
        const response = await fetchRekapPeriodePagination(params);
        rekapList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat data rekapitulasi.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getRekapData();
};

const exportToExcel = () => {
    toast.info("Fitur ekspor ke Excel sedang dalam pengembangan.");
};

const formatMinutesToHours = (totalMinutes: number): string => {
    if (totalMinutes == null || totalMinutes === 0) return '0 menit';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours} jam ${minutes} menit`;
};

watch(() => filters.search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getRekapData();
    }, 500);
});
</script>
