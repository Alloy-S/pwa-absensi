<template>
    <BasePageNoNav>
        <TopHeader title="Izin" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="tambahIzin">
                Ajukan Izin
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

                <DataView :value="izinList" :lazy="true" :paginator="true" :rows="lazyParams.rows"
                    :totalRecords="totalRecords" :loading="loading" @page="onPage"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 20, 50]" class="mt-3">

                    <template #list="slotProps">
                        <div class="grid grid-cols-1 gap-4">
                            <div v-for="(izin, index) in slotProps.items" :key="index">
                                <div @click="detailIzin(izin.id)"
                                    class="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300 border-l-4"
                                    :class="statusColor(izin.status)">
                                    <div class="flex justify-between items-start border-gray-100">
                                        <div>
                                            <div class="flex items-center space-x-3">

                                                <p class="font-bold text-gray-800">{{ izin.jenis_izin }}</p>
                                            </div>

                                        </div>

                                        <span class="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                                            :class="statusBadge(izin.status)">
                                            {{ izin.status }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600 mt-2 ml-1 font-medium">
                                            {{ formatDate(izin.tgl_izin_start) }} - {{ formatDate(izin.tgl_izin_end)
                                            }}
                                        </p>
                                    </div>

                                    <div class="mt-3 pt-3 border-t border-gray-100">
                                        <div class="flex items-center text-gray-600">
                                            <i class="fa-solid fa-user-check w-5 text-center text-gray-400"></i>
                                            <p class="text-sm ml-2">
                                                <span class="text-gray-500 text-xs">Approval:</span> {{
                                                    izin.approval_user || '-' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center p-8 text-gray-500">
                            Belum ada pengajuan izin untuk periode ini.
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { useRouter, useRoute } from 'vue-router';
import DataView from 'primevue/dataview';
import { Izin, IzinParams } from '@/models/izinModel';
import { fetchIzinPagination } from '@/services/izinService';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const izinList = ref<Izin[]>([]);
const totalRecords = ref(0);
const selectedMonth = ref(
    Array.isArray(route.query.bulan)
        ? route.query.bulan[0]
        : route.query.bulan || new Date().toISOString().slice(0, 7)
);
const selectedStatus = ref(
    Array.isArray(route.query.status)
        ? route.query.status[0]
        : route.query.status || 'Menunggu Persetujuan'
);
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 5,
    page: 1,
});


const getizinList = async () => {
    loading.value = true;
    try {
        const params: IzinParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            'filter-month': selectedMonth.value,
            'filter-status': selectedStatus.value
        };
        const response = await fetchIzinPagination(params);
        izinList.value = response.items;
        totalRecords.value = Number(response.total);
    } catch (error) {
        console.error("Gagal memuat daftar izin:", error);
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

const statusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
};


const tambahIzin = () => {
    router.push('/menu/absensi/izin/add');
};

const detailIzin = (id: string) => {
    router.push('/menu/absensi/izin/' + id);
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getizinList();
};


watch([selectedMonth, selectedStatus], ([newMonth, newStatus]) => {

    router.replace({
        query: {
            bulan: newMonth,
            status: newStatus
        }
    });

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getizinList();
    }, 500);
});


onMounted(() => {
    getizinList();
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
