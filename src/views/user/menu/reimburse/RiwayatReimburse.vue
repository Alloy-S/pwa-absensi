<template>
    <BasePageNoNav>
        <TopHeader title="Reimburse" />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="tambahReimburse">
                Ajukan Reimburse
            </button>

            <div class="mt-4">
                <div class="grid grid-cols-2 gap-3 mt-3">
                    <div>
                        <label for="month-picker" class="text-sm font-semibold text-gray-700">Periode Berdasarkan
                            Bulan</label>
                        <input type="month" v-model="selectedMonth" id="month-picker"
                            class="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                        <label for="status-filter" class="text-sm font-semibold text-gray-700">Filter Status</label>
                        <select v-model="selectedStatus" id="status-filter"
                            class="w-full border-slate-300 p-2 rounded-md bg-white">
                            <option value="all">Semua</option>
                            <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
                            <option value="Disetujui">Disetujui</option>
                            <option value="Ditolak">Ditolak</option>
                        </select>
                    </div>
                </div>

                <DataView :value="reimburseList" :lazy="true" :paginator="true" :rows="lazyParams.rows"
                    :totalRecords="totalRecords" :loading="loading" @page="onPage"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 20, 50]" class="mt-3">

                    <template #list="slotProps">
                        <div class="grid grid-cols-1 gap-4">
                            <div v-for="(reimburse, index) in slotProps.items" :key="index">
                                <div @click="detailReimburse(reimburse.id)"
                                    class="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300 border-l-4"
                                    :class="statusColor(reimburse.status)">
                                    <div class="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <p class="text-xl font-bold text-gray-800">
                                            {{ formatCurrency(reimburse.total) }}
                                        </p>
                                        <span class="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                                            :class="statusBadge(reimburse.status)">
                                            {{ reimburse.status }}
                                        </span>
                                    </div>

                                    <div class="mt-3 space-y-2">
                                        <div class="flex items-center text-gray-600">
                                            <i class="fa-solid fa-calendar-day w-5 text-center text-gray-400"></i>
                                            <p class="text-sm ml-2">
                                                <span class="text-gray-500 text-xs">Diajukan:</span> {{
                                                formatDate(reimburse.created_date) }}
                                            </p>
                                        </div>
                                        <div class="flex items-center text-gray-600">
                                            <i class="fa-solid fa-user-check w-5 text-center text-gray-400"></i>
                                            <p class="text-sm ml-2">
                                                <span class="text-gray-500 text-xs">Approval:</span> {{
                                                reimburse.approval_user || '-' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center p-8 text-gray-500">
                            Belum ada pengajuan reimburse untuk periode ini.
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { useRouter } from 'vue-router';
import DataView from 'primevue/dataview';
import { ReimburseApprovalItem, ReimburseParams } from '@/models/reimburseModel';
import { fetchApprovalReimbursePagination } from '@/services/reimburseService';

const router = useRouter();


const loading = ref(true);
const reimburseList = ref<ReimburseApprovalItem[]>([]);
const totalRecords = ref(0);
const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedStatus = ref('Menunggu Persetujuan');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 5,
    page: 1,
});


const getReimburseList = async () => {
    loading.value = true;
    try {
        const params: ReimburseParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            'filter-month': selectedMonth.value,
            'filter-status': selectedStatus.value
        };
        const response = await fetchApprovalReimbursePagination(params);
        reimburseList.value = response.items;
        totalRecords.value = Number(response.total);
    } catch (error) {
        console.error("Gagal memuat daftar reimburse:", error);
    } finally {
        loading.value = false;
    }
};


const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
};

const statusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);


const tambahReimburse = () => {
    router.push('/menu/reimburse/create');
};

const detailReimburse = (id: string) => {
    router.push('/menu/reimburse/' + id);
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getReimburseList();
};


watch([selectedMonth, selectedStatus], () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getReimburseList();
    }, 500);
});


onMounted(() => {
    getReimburseList();
});
</script>

<style scoped>
:deep(.p-paginator) {
    @apply bg-transparent mt-4 justify-center;
}

:deep(.p-dataview-content) {
    @apply bg-transparent;
}
</style>
