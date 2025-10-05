<template>
    <BasePageNoNav>
        <TopHeader title="Riwayat Absensi" />
        <TopAbsensiNavigation />

        <div class="p-4">
            <div class="flex items-center gap-2 text-blue-400">
                <i class="fa-solid fa-clock"></i>
                <p>Riwayat Absensi</p>
            </div>

            <div class="mt-3">
                <label for="month-picker" class="text-sm font-semibold text-gray-700">Periode Berdasarkan Bulan</label>
                <input type="month" v-model="selectedMonth" id="month-picker"
                    class="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
            </div>

            <div class="mt-4">
                <p class="text-sm font-semibold text-gray-700">Riwayat Absensi</p>

                <DataView 
                    :value="records" 
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
                            <div v-for="(item, index) in slotProps.items" :key="index">
                                <button @click="goToDetail(item)"
                                    class="w-full flex space-x-4 justify-between bg-white p-4 rounded-lg shadow border-l-4 text-left"
                                    :class="getBorderColor(item.status)">
                                    <div class="flex flex-col justify-center text-center">
                                        <p class="text-4xl font-bold text-slate-700">{{ item.tanggal }}</p>
                                        <p class="text-sm text-slate-500">{{ item.bulan }}</p>
                                    </div>
                                    <div class="flex-grow flex flex-col justify-center items-start text-sm text-slate-800">
                                        <p>Lokasi: <span class="font-semibold">{{ item.lokasi }}</span></p>
                                        <p>Metode: <span class="font-semibold">{{ item.metode }}</span></p>
                                        <p>Status Kehadiran: <span class="font-semibold">{{ item.status }}</span></p>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <i class="fa-solid fa-angle-right text-gray-400"></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center p-8 text-gray-500">
                            Tidak ada riwayat absensi untuk periode ini.
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DataView from 'primevue/dataview';
import { Absensi } from '@/models/absensiModel';
import { fetchRiwayatAbsensiPagination } from '@/services/absensiService';


const router = useRouter();
const route = useRoute();

const records = ref<Absensi[]>([]); 
const loading = ref(false);
const totalRecords = ref(0);
const selectedMonth = ref(
    Array.isArray(route.query.bulan)
        ? route.query.bulan[0]
        : route.query.bulan || new Date().toISOString().slice(0, 7)
);
let debounceTimer: any = null;


const lazyParams = ref({
    first: 0,
    rows: 5,
    page: 1,
});


const loadLazyData = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: selectedMonth.value
        };
        const response = await fetchRiwayatAbsensiPagination(params);

        
        records.value = response.items.map(item => ({
            ...item,
            tanggal: new Date(item.date).getDate(),
            bulan: new Date(item.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
        }));
        
        totalRecords.value = Number(response.total);

    } catch (error) {
        console.error("Gagal memuat riwayat absensi:", error);
    } finally {
        loading.value = false;
    }
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1; 
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    loadLazyData();
};


watch(selectedMonth, ([newMonth]) => {

    router.replace({
        query: {
            bulan: newMonth
        }
    });

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        loadLazyData();
    }, 500);
});


const getBorderColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('hadir')) return 'border-green-500';
    if (lowerStatus.includes('terlambat')) return 'border-yellow-500';
    if (lowerStatus.includes('alpha')) return 'border-red-500';
    return 'border-gray-300';
};

const goToDetail = (riwayat: any) => {
    router.push(`/menu/absensi/riwayat/${riwayat.id}`);
};


onMounted(() => {
    loadLazyData();
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
