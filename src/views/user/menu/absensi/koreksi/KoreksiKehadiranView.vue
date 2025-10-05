<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="tambahKoreksi">
                Ajukan Koreksi
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

                <DataView :value="koreksiList" :lazy="true" :paginator="true" :rows="lazyParams.rows"
                    :totalRecords="totalRecords" :loading="loading" @page="onPage"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 20, 50]" class="mt-3">

                    <template #list="slotProps">
                        <div class="grid grid-cols-1 gap-4">
                            <div v-for="(koreksi, index) in slotProps.items" :key="index">
                                <div @click="detailKoreksi(koreksi.id)"
                                    class="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300 border-l-4"
                                    :class="statusColor(koreksi.status)">
                                    <div class="flex justify-between items-center">
                                        <p class="font-semibold text-gray-800 flex items-center">
                                            <i class="fa-solid fa-calendar-check text-gray-500 mr-2"></i>
                                        <span> {{formatDateWithDay(koreksi.absensi_date) }}</span></p>
                                        <span class="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                                            :class="statusBadge(koreksi.status)">
                                            {{ koreksi.status }}
                                        </span>
                                    </div>

                                    <div class="mt-3 pt-3 border-t border-gray-100 space-y-2">
                                        <div class="flex items-start text-gray-600">
                                            <i class="fa-solid fa-file-lines w-5 text-center text-gray-400 mt-1"></i>
                                            <p class="text-sm ml-2 italic">
                                                "{{ koreksi.catatan_pengajuan || 'Tidak ada catatan.' }}"
                                            </p>
                                        </div>
                                        <div class="flex items-center text-gray-600">
                                            <i class="fa-solid fa-user-check w-5 text-center text-gray-400"></i>
                                            <p class="text-sm ml-2">
                                                <span class="text-gray-500 text-xs">Approval:</span> {{
                                                    koreksi.approval_user || '-' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center p-8 text-gray-500">
                            Belum ada pengajuan koreksi untuk periode ini.
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
import { Koreksi, KoreksiParams } from '@/models/koreksiModel';
import DataView from 'primevue/dataview';
import { fetchKoreksiPagination } from '@/services/koreksiService';
import { useOfflineStore } from '@/stores/offlineStore';
import { db } from '@/services/dbService';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const koreksiList = ref<Partial<Koreksi>[]>([]);
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
const offlineStore = useOfflineStore();
const lazyParams = ref({
    first: 0,
    rows: 5,
    page: 1,
});


const getKoreksiList = async () => {
    loading.value = true;

    let serverItems: Partial<Koreksi>[] = [];
    let serverTotal = 0;

    if (offlineStore.isOnline) {
        try {
            const params: KoreksiParams = {
                page: lazyParams.value.page,
                size: lazyParams.value.rows,
                'filter-month': selectedMonth.value,
                'filter-status': selectedStatus.value
            };
            const response = await fetchKoreksiPagination(params);
            serverItems = response.items;
            serverTotal = Number(response.total);
        } catch (error) {
            console.error("Gagal memuat daftar koreksi dari server:", error);
        }
    }

    const localItems = await db.koreksiQueue.toArray();

    const formattedLocalItems: Partial<Koreksi>[] = localItems.map(item => ({
        id: item.pengajuan_id,
        absensi_date: item.data.date,
        catatan_pengajuan: item.data.catatan_pengajuan,
        status: 'Menunggu Sinkronisasi',
    }));

    koreksiList.value = [...formattedLocalItems, ...serverItems];
    totalRecords.value = serverTotal + formattedLocalItems.length;
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
    if (s.includes('sinkronisasi')) return 'bg-sky-100 text-sky-800';
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const formatDateWithDay = (dateStr: string) => {
    if (!dateStr) return 'Tanggal tidak valid';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
};


const tambahKoreksi = () => {
    router.push('/menu/absensi/koreksi-kehadiran/add');
};

const detailKoreksi = (id: string) => {
    router.push('/menu/absensi/koreksi-kehadiran/' + id);
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getKoreksiList();
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
        getKoreksiList();
    }, 500);
});


onMounted(() => {
    getKoreksiList();
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
