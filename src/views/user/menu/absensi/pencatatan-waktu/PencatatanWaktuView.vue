<template>
    <BasePageNoNav>
        <TopHeader title="Pencatatan Waktu" />
        <TopAbsensiNavigation />
        <div class="p-4">
            
            <div v-if="loading" class="text-center py-10">
                <i class="fa-solid fa-spinner fa-spin text-3xl text-gray-500"></i>
                <p class="mt-2 text-gray-500">Memuat status kehadiran...</p>
            </div>

            
            <div v-else>
                <div class="bg-white p-4 rounded-lg shadow">
                    <p class="text-lg font-semibold text-gray-700">{{ formattedDate }}</p>
                    <p class="text-sm text-gray-500">Shift: {{ shiftKerja || '-' }}</p>
                </div>

                <div class="mt-4 bg-white p-4 rounded-lg shadow flex flex-col items-center">
                    
                    <div v-if="isHoliday" class="text-center py-8">
                        <i class="fa-solid fa-mug-saucer text-5xl text-blue-500 mb-4"></i>
                        <p class="text-xl font-semibold text-gray-700">Hari Libur</p>
                        <p class="text-gray-500">Nikmati waktu istirahat Anda.</p>
                    </div>

                    
                    <div v-else class="w-full flex flex-col items-center">
                        <p class="text-lg font-semibold text-gray-700">Status Kehadiran</p>
                        <p class="text-6xl font-mono">{{ lamaKerja }}</p>
                        <p class="text-sm text-gray-500">Waktu Lama Kerja</p>
                        
                        <div class="w-full mt-6 grid grid-cols-2 gap-2">
                            
                            <div class="flex flex-col text-center">
                                <div class="flex-grow">
                                    <p class="text-sm text-gray-600">Jam Masuk</p>
                                    <p class="font-semibold text-lg">{{ formatTimeToDisplay(jamMasuk) || "-" }}</p>
                                    <p class="text-xs text-gray-400 h-4">{{ formatDateToDisplay(jamMasuk) || " " }}</p>
                                </div>
                                <button @click="catatWaktu('IN')" :disabled="isMasukDisabled"
                                    class="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                                    Masuk
                                </button>
                            </div>
                            
                            <div class="flex flex-col text-center">
                                <div class="flex-grow">
                                    <p class="text-sm text-gray-600">Jam Pulang</p>
                                    <p class="font-semibold text-lg">{{ formatTimeToDisplay(jamPulang) || "-" }}</p>
                                    <p class="text-xs text-gray-400 h-4">{{ formatDateToDisplay(jamPulang) || " " }}</p>
                                </div>
                                <button @click="catatWaktu('OUT')" :disabled="isPulangDisabled"
                                    class="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                                    Pulang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { useRouter } from 'vue-router';
import { checkAttadanceTodayApi } from '@/services/attendanceService';

const router = useRouter();


const loading = ref(true);
const shiftKerja = ref("");

const jamMasuk = ref<string | null>(null);
const jamPulang = ref<string | null>(null);
const isHoliday = ref(false);
const requiredAttendanceType = ref<string | null>(null);


const currentTime = ref(new Date());
let timer: any;


const formattedDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});


const formatTimeToDisplay = (dateTimeStr: string | null): string | null => {
    if (!dateTimeStr) return null;
    try {
        const dateObj = new Date(dateTimeStr);
        return dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
        return dateTimeStr.split(' ')[1]?.split('.')[0] || null;
    }
};


const formatDateToDisplay = (dateTimeStr: string | null): string | null => {
    if (!dateTimeStr) return null;
    try {
        const dateObj = new Date(dateTimeStr);
        return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
        return dateTimeStr.split(' ')[0] || null;
    }
};


const isMasukDisabled = computed(() => requiredAttendanceType.value !== 'IN');
const isPulangDisabled = computed(() => requiredAttendanceType.value !== 'OUT');


const lamaKerja = computed(() => {
    if (!jamMasuk.value) {
        return "--:--:--";
    }


    const dateIn = new Date(jamMasuk.value);

    let dateOut: Date;

    if (jamPulang.value) {
        dateOut = new Date(jamPulang.value);
    } else {
        dateOut = currentTime.value;
    }

    let diff = dateOut.getTime() - dateIn.getTime();
    if (diff < 0) return "--:--:--";

    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});


const getAttendanceStatus = async () => {
    try {
        const response = await checkAttadanceTodayApi();
        
        shiftKerja.value = response.shift;
        jamMasuk.value = response.time_clock_in;
        jamPulang.value = response.time_clock_out;
        requiredAttendanceType.value = response.required_attendance_type;
        
        if (response.status === 'HOLIDAY') {
            isHoliday.value = true;
        }

    } catch (error) {
        console.error("Gagal memuat status kehadiran:", error);
    } finally {
        loading.value = false;
    }
};


const catatWaktu = (type: 'IN' | 'OUT') => {
    router.push(`/menu/absensi/pencatatan-waktu/${type.toLowerCase()}`);
};

onMounted(() => {
    getAttendanceStatus();
    timer = setInterval(() => {
        currentTime.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>
