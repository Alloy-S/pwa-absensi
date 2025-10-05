<template>
    <BasePage>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Riwayat Absensi Borongan</p>
        </div>

        
        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <div>
                    <label for="search-pic" class="block mb-2 text-sm font-medium text-gray-700">Cari Nama PIC</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                        </span>
                        <input type="text" id="search-pic" v-model="searchQuery"
                            class="w-full pl-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Cari nama..." />
                    </div>
                </div>
                <div>
                    <label for="month-picker" class="block mb-2 text-sm font-medium text-gray-700">Filter Bulan</label>
                    <input type="month" v-model="selectedMonth" id="month-picker"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
            </div>
        </div>

        
        <div class="bg-white p-4 rounded-lg shadow-md">
            <DataTable :value="boronganList" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

                <Column field="user.fullname" header="Nama PIC" style="width: 25%"></Column>
                <Column field="date" header="Tanggal Absensi" style="width: 25%">
                     <template #body="slotProps">
                        {{ formatDate(slotProps.data.date) }}
                    </template>
                </Column>
                <Column field="employee_count" header="Jumlah Karyawan" style="width: 20%" bodyClass="text-center"></Column>
                <Column field="status" header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span class="px-2 py-1 text-xs font-medium rounded-full" :class="statusBadgeColor(slotProps.data.status)">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column header="Action" style="width: 15%">
                    <template #body="slotProps">
                        <button @click="goToDetail(slotProps.data.id)"
                            class="font-medium text-blue-600 hover:underline">
                            Detail
                        </button>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center py-5">
                        <p class="text-gray-500">Tidak ada data riwayat absensi borongan yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { AbsensiBorongan, AbsensiBoronganParams } from '@/models/absensiBoronganModel';
import { fetchHistoryAbsensiBoronganAdmin } from '@/services/absensiBoronganService';

const router = useRouter();
const route = useRoute();

const boronganList = ref<AbsensiBorongan[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
let debounceTimer: any = null;


const searchQuery = ref(
    Array.isArray(route.query.nama) ? route.query.nama[0] : route.query.nama || ''
);

const selectedMonth = ref(
    Array.isArray(route.query.bulan)
        ? route.query.bulan[0]
        : route.query.bulan || new Date().toISOString().slice(0, 7)
);

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getHistory = async () => {
    loading.value = true;
    try {
        const params: AbsensiBoronganParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: searchQuery.value,
            "filter-month": selectedMonth.value,
        };
        const response = await fetchHistoryAbsensiBoronganAdmin (params);
        boronganList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat riwayat absensi borongan.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getHistory();
};

const goToDetail = (id: string) => {
    router.push(`/admin/riwayat/harian-borongan/${id}`);
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const statusBadgeColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

watch([searchQuery, selectedMonth], ([newSearch, newMonth]) => {
    router.replace({ 
        query: { 
            nama: newSearch || undefined,
            bulan: newMonth 
        } 
    });
    
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getHistory();
    }, 500);
});

onMounted(() => {
    getHistory();
});
</script>
