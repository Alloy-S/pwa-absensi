<template>
    <BasePageNoNav>
        <TopHeader title="Absensi Borongan" />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="tambahAbsensiBorongan">
                Ajukan Absensi Borongan
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
                        <select v-model="selectedStatus" id="status-filter" class="w-full border-slate-300 p-2 rounded-md bg-white">
                            <option value="All">Semua</option>
                            <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
                            <option value="Disetujui">Disetujui</option>
                            <option value="Ditolak">Ditolak</option>
                        </select>
                    </div>
                </div>

                <DataView
                    :value="boronganList"
                    :lazy="true"
                    :paginator="true"
                    :rows="lazyParams.rows"
                    :totalRecords="totalRecords"
                    :loading="loading"
                    @page="onPage"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    class="mt-3"
                >
                    
                    <template #list="slotProps">
                        <div class="grid grid-cols-1 gap-3">
                            <div v-for="(borongan, index) in slotProps.items" :key="index">
                                <button
                                    class="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow border-l-4 text-left"
                                    :class="statusColor(borongan.status)" @click="detailAbsensiBorongan(borongan.id)">
                                    <div class="flex flex-col items-start">
                                        <p class="text-sm font-semibold">Tanggal: {{ formatDate(borongan.created_date) }}</p>
                                        
                                    </div>
                                    <div class="text-sm font-semibold" :class="statusTextColor(borongan.status)">{{ borongan.status }}</div>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center p-8 text-gray-500">
                            Belum ada pengajuan borongan untuk periode ini.
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
import { AbsensiBorongan, AbsensiBoronganParams } from '@/models/absensiBoronganModel';
import { fetchApprovalBoronganPagination } from '@/services/absensiBoronganService';

const router = useRouter();


const loading = ref(true);
const boronganList = ref<AbsensiBorongan[]>([]);
const totalRecords = ref(0);
const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedStatus = ref('Menunggu Persetujuan');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 5,
    page: 1,
});


const getAbsensiBoronganList = async () => {
    loading.value = true;
    try {
        const params: AbsensiBoronganParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            'filter-month': selectedMonth.value,
            'filter-status': selectedStatus.value
        };
        const response = await fetchApprovalBoronganPagination(params);
        boronganList.value = response.items;
        totalRecords.value = Number(response.total);
    } catch (error) {
        console.error("Gagal memuat daftar borongan:", error);
    } finally {
        loading.value = false;
    }
};


const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('Menunggu')) return 'border-yellow-500';
    if (s.includes('Disetujui')) return 'border-green-500';
    if (s.includes('Ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

const statusTextColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('Menunggu')) return 'text-yellow-600';
    if (s.includes('Disetujui')) return 'text-green-600';
    if (s.includes('Ditolak')) return 'text-red-600';
    return 'text-gray-600';
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
};


const tambahAbsensiBorongan = () => {
    router.push('/menu/absensi/borongan/create');
};

const detailAbsensiBorongan = (id: string) => {
    router.push('/menu/absensi/borongan/' + id);
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getAbsensiBoronganList();
};


watch([selectedMonth, selectedStatus], () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getAbsensiBoronganList();
    }, 500);
});


onMounted(() => {
    getAbsensiBoronganList();
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
