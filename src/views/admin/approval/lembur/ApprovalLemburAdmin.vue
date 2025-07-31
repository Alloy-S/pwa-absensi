<template>
    <BasePage>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Approval Lembur</p>
        </div>

        
        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label for="month-picker" class="block mb-2 text-sm font-medium text-gray-700">Filter Bulan</label>
                    <input type="month" v-model="selectedMonth" id="month-picker"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div>
                    <label for="status-filter" class="block mb-2 text-sm font-medium text-gray-700">Filter Status</label>
                    <select v-model="selectedStatus" id="status-filter"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="all">Semua</option>
                        <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>
            </div>
        </div>

        
        <div class="bg-white p-4 rounded-lg shadow-md">
            <DataTable :value="lemburList" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

                <Column field="user.fullname" header="Nama Karyawan" style="width: 25%"></Column>
                <Column field="date_start" header="Jam Mulai" style="width: 20%">
                    <template #body="slotProps">
                        {{ formatDateTime(slotProps.data.date_start) }}
                    </template>
                </Column>
                 <Column field="date_end" header="Jam Selesai" style="width: 20%">
                    <template #body="slotProps">
                        {{ formatDateTime(slotProps.data.date_end) }}
                    </template>
                </Column>
                <Column field="status" header="Status" style="width: 20%">
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
                        <p class="text-gray-500">Tidak ada data pengajuan lembur yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { toast } from 'vue3-toastify';
import { Lembur, LemburParams } from '@/models/lemburModel';
import { fetchLemburPaginationAdmin } from '@/services/lemburService';


const router = useRouter();

const lemburList = ref<Lembur[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
let debounceTimer: any = null;


const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
};
const selectedMonth = ref(getCurrentMonth());
const selectedStatus = ref('Menunggu Persetujuan');

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getLembur = async () => {
    loading.value = true;
    try {
        const params: LemburParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            "filter-month": selectedMonth.value,
            "filter-status": selectedStatus.value,
        };
        const response = await fetchLemburPaginationAdmin(params);
        lemburList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat data lembur.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getLembur();
};

const goToDetail = (id: string) => {
    router.push(`/admin/approval/lembur/${id}`);
};

const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const statusBadgeColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

watch([selectedMonth, selectedStatus], () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getLembur();
    }, 300);
});

onMounted(() => {
    getLembur();
});
</script>
