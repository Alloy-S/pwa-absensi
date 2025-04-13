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

            <div>
                <div class="flex justify-between items-center mt-4">
                    <p class="text-sm font-semibold text-gray-700">Riwayat Absensi</p>
                </div>

                <!-- Daftar Riwayat Absensi -->
                <div class="mt-3">
                    <button v-for="(riwayat, index) in paginatedData" :key="index" @click="goToDetail(riwayat)"
                        class="w-full flex space-x-4 justify-between bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-green-500">
                        <div class="flex flex-col justify-center">
                            <p class="text-5xl">{{ riwayat.tanggal }}</p>
                            <p>{{ riwayat.bulan }}</p>
                        </div>
                        <div class="flex flex-col justify-center items-start text-sm text-slate-800">
                            <p>Shift: <span class="font-semibold">{{ riwayat.shift }}</span></p>
                            <p>Jam Hadir: <span class="font-semibold">{{ riwayat.jamMasuk }}</span></p>
                            <p>Status Kehadiran: <span class="font-semibold">{{ riwayat.status }}</span></p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </button>
                </div>

                <!-- Pagination -->
                <div class="flex justify-center items-center mt-4">
                    <nav aria-label="Riwayat Absensi Pagination">
                        <ul class="flex items-center -space-x-px h-8 text-sm">
                            <!-- Tombol Previous -->
                            <li>
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                                    <span class="sr-only">Previous</span>
                                    <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 1 1 5l4 4" />
                                    </svg>
                                </button>
                            </li>

                            <!-- Nomor Halaman -->
                            <li v-for="page in totalPages" :key="page">
                                <button @click="goToPage(page)" :class="{
                                    'text-blue-600 border-blue-300 bg-blue-50': currentPage === page,
                                    'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700': currentPage !== page
                                }"
                                    class="flex items-center justify-center px-3 h-8 leading-tight border">
                                    {{ page }}
                                </button>
                            </li>

                            <!-- Tombol Next -->
                            <li>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                                    <span class="sr-only">Next</span>
                                    <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="m1 9 4-4-4-4" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectedMonth = ref(null);
const riwayatAbsensi = ref([
    {id: "1", tanggal: "15", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
    {id: "1", tanggal: "14", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
    {id: "1", tanggal: "13", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
    // {id: "1", tanggal: "12", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
    // {id: "1", tanggal: "11", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
    // {id: "1", tanggal: "10", bulan: "Mar 2025", shift: "Normal(08:00-16:00)", jamMasuk: "07:50-16:10 WIB", status: "Hadir" },
]);

const itemsPerPage = 5;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(riwayatAbsensi.value.length / itemsPerPage));

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return riwayatAbsensi.value.slice(start, end);
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToDetail = (riwayat: any) => {
    router.push(`riwayat/${riwayat.id}`);
};
</script>
