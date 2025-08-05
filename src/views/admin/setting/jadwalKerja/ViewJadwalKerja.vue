<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Detail Jadwal Kerja Non-Aktif</p>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner animate-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat data jadwal...</p>
            </div>

            <div v-else-if="jadwalKerja" class="flex flex-col lg:flex-row lg:space-x-5">
                
                <div class="flex-[7] space-y-3">
                    <div class="p-5 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Nama Kode</label>
                            <input type="text" :value="jadwalKerja.kode" disabled
                                class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed">
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Nama Shift</label>
                            <input type="text" :value="jadwalKerja.shift" disabled
                                class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed">
                        </div>
                    </div>
                    <div class="p-5 bg-white rounded-md shadow-md">
                        <div class="space-y-4 mb-6">
                            <p class="mb-2 text-sm font-medium text-gray-900">Hari dan Jam Kerja</p>
                            <div v-for="day in days" :key="day.value" class="p-3 border rounded-lg">
                                <label class="flex items-center space-x-3 font-medium">
                                    <Checkbox v-model="dailyTimes[day.value].active" :binary="true" disabled />
                                    <span>{{ day.label }}</span>
                                </label>
                                <div v-if="dailyTimes[day.value].active" class="mt-3 grid grid-cols-2 gap-4 pl-8">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600">Jam Masuk</label>
                                        <input type="time" :value="dailyTimes[day.value].in" disabled
                                            class="mt-1 bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600">Jam Pulang</label>
                                        <input type="time" :value="dailyTimes[day.value].out" disabled
                                            class="mt-1 bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Toleransi Masuk (menit)</label>
                                <input type="text" :value="toleranceIn" disabled
                                    class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Toleransi Pulang (menit)</label>
                                <input type="text" :value="toleranceOut" disabled
                                    class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed">
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="flex-[3] space-y-3 mt-3 lg:mt-0">
                    <div class="bg-white p-5 rounded-md shadow-md">
                        <h3 class="font-semibold text-slate-700 mb-3">Aksi</h3>
                        <div class="flex flex-col space-y-2">
                            <button @click="confirmActivate(jadwalKerja.id)" class="w-full text-white bg-green-500 hover:bg-green-700 rounded-lg px-5 py-2.5 flex items-center justify-center">
                                <i class="fa-solid fa-check mr-2"></i>
                                <span>Aktifkan Kembali</span>
                            </button>
                            <button type="button" @click="goBack"
                                class="w-full text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-5 py-2.5">
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <div v-else class="text-center py-20">
                <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Jadwal kerja tidak ditemukan.</p>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import { useRouter, useRoute } from 'vue-router';
import { JadwalKerja } from '@/models/jadwalModel';
import { fetchjadwalById, activateJadwalKerja } from '@/services/jadwalKerjaService';
import { toast } from 'vue3-toastify';
import Checkbox from 'primevue/checkbox';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const route = useRoute();
const confirm = useConfirm();
const loading = ref(true);

const days = [
    { label: 'Senin', value: 'SENIN' }, { label: 'Selasa', value: 'SELASA' },
    { label: 'Rabu', value: 'RABU' }, { label: 'Kamis', value: 'KAMIS' },
    { label: 'Jumat', value: 'JUMAT' }, { label: 'Sabtu', value: 'SABTU' },
    { label: 'Minggu', value: 'MINGGU' },
];

const jadwalKerja = ref<JadwalKerja | null>(null);
const dailyTimes = ref<Record<string, { in: string; out: string; active: boolean }>>({});
const toleranceIn = ref<number>(0);
const toleranceOut = ref<number>(0);

const initializeDailyTimes = () => {
    days.forEach(day => {
        dailyTimes.value[day.value] = { in: '00:00', out: '00:00', active: false };
    });
};

const getJadwalDetail = async () => {
    loading.value = true;
    try {
        const response = await fetchjadwalById(route.params.id as string);
        jadwalKerja.value = response;

        if (response.detail_jadwal_kerja?.length > 0) {
            response.detail_jadwal_kerja.forEach(detail => {
                const dayKey = detail.hari.toUpperCase();
                if (dailyTimes.value[dayKey]) {
                    dailyTimes.value[dayKey] = {
                        in: detail.time_in.substring(0, 5),
                        out: detail.time_out.substring(0, 5),
                        active: detail.is_active
                    };
                }
            });
            const firstDetail = response.detail_jadwal_kerja[0];
            toleranceIn.value = firstDetail.toler_in;
            toleranceOut.value = firstDetail.toler_out;
        }
    } catch (error) {
        console.error("Gagal memuat data jadwal.");
    } finally {
        loading.value = false;
    }
};

const goBack = () => router.back();

const confirmActivate = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin mengaktifkan kembali jadwal kerja ini?',
        header: 'Konfirmasi Aktivasi',
        icon: 'fa-solid fa-check-circle',
        acceptLabel: 'Ya, Aktifkan',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-success',
        accept: () => submitActivate(id),
    });
};

const submitActivate = async (id: string) => {
    try {
        await activateJadwalKerja(id);
        toast.success("Jadwal kerja berhasil diaktifkan kembali.");
        router.push('/admin/pengaturan/jadwal-kerja');
    } catch (error: any) {
        console.error("Gagal mengaktifkan jadwal kerja.");
    }
};

onMounted(() => {
    initializeDailyTimes();
    getJadwalDetail();
});
</script>
